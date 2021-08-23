
const express = require('express')
const router = express.Router()
const planController = require('../controller/plan.controller');

// Create a new plan
router.post('/', planController.create);

// Retrieve all plan
router.get('/', planController.findAll);

// Retrieve a single plan with id
router.get('/:id', planController.findById);

// Update a plan with id
router.put('/:id', planController.update);

// Delete a plan with id
router.delete('/:id', planController.delete);

module.exports = router