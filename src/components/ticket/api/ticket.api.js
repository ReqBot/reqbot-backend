
const express = require('express')
const router = express.Router()
const ticketController = require('../controller/ticket.controller');
const cors = require('cors')
const {
    ensureToken,
    authAdmin,
    authCliente,
    authAnalista
} = require("../../auth/auth");

router.use(cors())
// Create a new ticket
router.post('/', ticketController.create);

// Retrieve all ticket
router.get('/', ticketController.findAll);

// Retrieve all ticket
router.get('/ascendente/:id', ticketController.orderByAsc);

// Retrieve all ticket
router.get('/descendente/:id', ticketController.orderByDesc);

// Retrieve a single ticket with id
router.get('/:id',ticketController.findById);

// Retrieve all Tickets by Organizacion
router.get('/organizacion/:id', ticketController.findByOrganizacion);

// Update a ticket with id
router.put('/:id', ticketController.update);

// Delete a ticket with id
router.delete('/:id', ticketController.delete);

module.exports = router