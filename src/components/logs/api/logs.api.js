
const express = require('express')
const router = express.Router()
const logsController = require('../controller/logs.controller');
const cors = require('cors')

router.use(cors())
// Create a new logs
router.post('/', logsController.create);

// Retrieve all logs
router.get('/', logsController.findAll);

// Retrieve a single logs with id
router.get('/:id', logsController.findById);

// Update a logs with id
router.put('/:id', logsController.update);

// Delete a logs with id
router.delete('/:id', logsController.delete);

module.exports = router