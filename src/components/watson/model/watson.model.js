const AssistantV2 = require("ibm-watson/assistant/v2");
const {
    IamAuthenticator
} = require("ibm-watson/auth");

// 2.1 First authenticate
const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

// 2.2 Connect to assistant
const assistant = new AssistantV2({
    version: "2021-08-21",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL,
});


module.exports = assistant;