// 1. Import dependencies
const express = require('express')
const router = express.Router()
const watsonController = require('../controller/watson.controller');

// 2.1 Create session
router.post('/session', watsonController.session);

// 2.2 Retrieve message translated from IBM 
router.post('/message', watsonController.message);

module.exports = router