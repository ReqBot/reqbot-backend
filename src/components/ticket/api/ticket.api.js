
const express = require('express')
const router = express.Router()
const ticketController = require('../controller/ticket.controller');

// Create a new ticket
router.post('/', ticketController.create);

// Retrieve all ticket
router.get('/', ticketController.findAll);

// Retrieve a single ticket with id
router.get('/:id', ticketController.findById);

// Update a ticket with id
router.put('/:id', ticketController.update);

// Delete a ticket with id
router.delete('/:id', ticketController.delete);

module.exports = router