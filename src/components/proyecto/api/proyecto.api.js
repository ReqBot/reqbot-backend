
const express = require('express')
const router = express.Router()
const proyectoController = require('../controller/proyecto.controller');

// Create a new proyecto
router.post('/', proyectoController.create);

// Retrieve all proyecto
router.get('/', proyectoController.findAll);

// Retrieve a single proyecto with id
router.get('/:id', proyectoController.findById);

// Update a proyecto with id
router.put('/:id', proyectoController.update);

// Delete a proyecto with id
router.delete('/:id', proyectoController.delete);

module.exports = router