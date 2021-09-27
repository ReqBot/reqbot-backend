
const express = require('express')
const router = express.Router()
const usuarioProyectoController = require('../controller/usuarioproyecto.controller');
const cors = require('cors')

router.use(cors())
// Create a new usuarioProyecto
router.post('/', usuarioProyectoController.create);

// Retrieve all usuarioProyecto
router.get('/', usuarioProyectoController.findAll);

// Update a usuarioProyecto with id
router.put('/:id', usuarioProyectoController.update);

// Delete a usuarioProyecto with id
router.delete('/:id', usuarioProyectoController.delete);

module.exports = router