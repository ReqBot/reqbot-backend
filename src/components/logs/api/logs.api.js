const express = require('express')
const router = express.Router()
const logsController = require('../controller/logs.controller');
const cors = require('cors')
const {
    ensureToken,
    authAdmin,
    authCliente,
    authAnalista
} = require("../../auth/auth");
router.use(cors())
// Create a new logs
router.post('/', logsController.create);

// Retrieve all logs
router.get('/', logsController.findAll);

// Retrieve all logs by Organization
router.get('/organizacion/:id', logsController.findByOrganizacion);

// Retrieve all logs by Organization ASC
router.get('/ascendente/:id', logsController.orderByAsc);

// Retrieve all logs by Organization DESC
router.get('/descendente/:id', logsController.orderByDesc);

// Retrieve a single logs with id
router.get('/:id', logsController.findById);

// Update a logs with id
router.put('/:id', logsController.update);

// Delete a logs with id
router.delete('/:id', logsController.delete);

router.get('/delete/:id', logsController.changeStateToDelete);

module.exports = router