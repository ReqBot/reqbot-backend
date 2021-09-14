
const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller');
const cors = require('cors')

router.use(cors())
// Create a new usuario
router.post('/', usuarioController.create);

// Retrieve all usuario
router.get('/', usuarioController.findAll);

// Retrieve a single usuario with id
router.get('/:id', usuarioController.findById);

// Retrieve all Usuarios by Organizacion
router.get('/organizacion/:id', usuarioController.findByOrganizacion);

// Update a usuario with id
router.put('/:id', usuarioController.update);

// Delete a usuario with id
router.delete('/:id', usuarioController.delete);

module.exports = router