const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post("/", (req, res) => {
    
    try {
        fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: req.body.q,
                source: "en",
                target: "es"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>  res.json())
        .then(json => res.json(json));
    } catch (err) {
        res.send("There was an error processing your request.");
        console.log(err);
    }
});


module.exports = router;