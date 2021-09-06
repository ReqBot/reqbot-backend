
const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller');

// Create a new usuario
router.post('/', usuarioController.create);

// Retrieve all usuario
router.get('/', usuarioController.findAll);

// Retrieve a single usuario with id
router.get('/:id', usuarioController.findById);

// Update a usuario with id
router.put('/:id', usuarioController.update);

// Delete a usuario with id
router.delete('/:id', usuarioController.delete);

module.exports = router