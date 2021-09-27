// 1. Import dependencies
const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const {
  IamAuthenticator
} = require("ibm-watson/auth");
const fetch = require('node-fetch');
const {
  default: axios
} = require('axios');

const cors = require('cors')

router.use(cors())

// 2. Create Instance of Assistant

// 2.1 First authenticate
const authenticator = new IamAuthenticator({
  apikey: "des4SNXs3z2Mx-zIuiYXr-ItPRJX37RDXBwDNT-Y82rV",
});

// 2.2 Connect to assistant
const assistant = new AssistantV2({
  version: "2021-08-21",
  authenticator: authenticator,
  url: "https://api.us-south.assistant.watson.cloud.ibm.com/instances/45405a41-d562-4afe-b9cf-45847ac2193c",
});

// 3. Route to Handle Session Tokens
// GET /api/watson/session
router.get("/session", async (req, res) => {
  // If successs
  try {
    const session = await assistant.createSession({
      assistantId: "58e31aaf-6377-48f2-a014-6ede291c271e",
    });
    res.json(session["result"]);

    // If fail
  } catch (err) {
    res.send("There was an error processing your request.");
    console.log(err);
  }
});


// 4. Handle Messages
// POST /api/watson/message


router.post("/message", async (req, res) => {
  try {

   /* const initialData = {
      q: req.body.q,
      source: "es",
      target: "en"
    };*/

    //const axiosres = await axios.post("https://libretranslate.de/translate", initialData)
    //const translatedESEN = axiosres.data?.translatedText ?? '';

    payload = {
      assistantId: process.env.WATSON_ASSISTANT_ID,
      sessionId: req.headers.session_id,
      input: {
        message_type: "text",
        text: req.body.q,
      },
    };


    const ibmRes = await assistant.message(payload);
    const ibmMessage = ibmRes["result"].output.generic[0].text;

    // Translate for user
    /*const finalRes = await axios.post("https://libretranslate.de/translate", {
      q: ibmMessage,
      source: "en",
      target: "es"
    });*/

    const Data = function (data) {
      this.message = data.message;
      this.intent = data.intent;
      this.entity = data.entity;
      this.value = data.value;
    };
    
    //Data.message = finalRes.data.translatedText ?? '';

    Data.message = ibmMessage ?? '';

    if (ibmRes["result"].output.intents.length != 0) {
      Data.intent = ibmRes["result"].output.intents[0].intent;
    } else {
      Data.intent = '';
    }

    if (ibmRes["result"].output.entities.length != 0) {
      Data.entity = ibmRes["result"].output.entities[0].entity;
    } else {
      Data.entity = '';
    }

    if (ibmRes["result"].output.entities.length != 0) {
      Data.value = ibmRes["result"].output.entities[0].value;
    } else {
      Data.value = '';
    }

    res.status(200).send({
      success: true,
      data: {
        message: Data.message,
        intent: Data.intent,
        entity: Data.entity,
        value: Data.value
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Ocurrió un error."
    });
  }
});


// 5. Export routes
module.exports = router;