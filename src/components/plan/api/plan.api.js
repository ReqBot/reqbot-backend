
const express = require('express')
const router = express.Router()
const planController = require('../controller/plan.controller');

// Create a new employee
router.post('/', planController.create);

/*
// Retrieve all employees
router.get('/', employeeController.findAll);


// Retrieve a single employee with id
router.get('/:id', employeeController.findById);

// Update a employee with id
router.put('/:id', employeeController.update);

// Delete a employee with id
router.delete('/:id', employeeController.delete);*/

module.exports = router