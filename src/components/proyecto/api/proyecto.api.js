
const express = require('express')
const router = express.Router()
const proyectoController = require('../controller/proyecto.controller');
const cors = require('cors')

router.use(cors())
// Create a new proyecto
router.post('/', proyectoController.create);

// Retrieve all proyecto
router.get('/', proyectoController.findAll);

// Retrieve a single proyecto with id
router.get('/:id', proyectoController.findById);

// Retrieve list proyectos with Organizacion
router.get('/organizacion/:id', proyectoController.findByOrganizacion);

// Update a proyecto with id
router.put('/:id', proyectoController.update);

// Delete a proyecto with id
router.delete('/:id', proyectoController.delete);

module.exports = router