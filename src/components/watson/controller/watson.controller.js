'use strict';

const assistant = require('../model/watson.model');

exports.getSession = function(req, res) {
    assistant.findAll(function(err, plan) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', plan);
    res.send(plan);
  });
};


// 3. Route to Handle Session Tokens
// GET /api/watson/session
router.get("/session", async (req, res) => {
    // If successs
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID,
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
        const initialData = {
            q: req.body.q,
            source: "es",
            target: "en"
        };

        const axiosres = await axios.post("https://libretranslate.de/translate", initialData)
        const translatedESEN = axiosres.data?.translatedText ?? '';

        payload = {
            assistantId: process.env.WATSON_ASSISTANT_ID,
            sessionId: req.headers.session_id,
            input: {
                message_type: "text",
                text: translatedESEN,
            },
        };

        // If successs
        const ibmRes = await assistant.message(payload);
        //const ibmMessage = ibmRes["result"].output.generic[0].text;
        const ibmMessage = ibmRes["result"];
        res.status(200).send({
            success: true,
            message: ibmMessage ?? ''
        })
        // Translate for user
        const finalRes = await axios.post("https://libretranslate.de/translate", {
            q: ibmMessage,
            source: "en",
            target: "es"
        });

        res.status(200).send({
            success: true,
            message: finalRes.data.translatedText ?? ''
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "There was an error processing your request."
        });
    }
});

// 5. Export routes
module.exports = router;