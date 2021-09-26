
const express = require('express')
const router = express.Router()
const proyectoController = require('../controller/proyecto.controller');
const cors = require('cors')
const {
    ensureToken,
    authAdmin,
    authCliente,
    authAnalista
} = require("../../auth/auth");

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


router.get('/inactive/:id',  proyectoController.changeToInactive);

// Delete a proyecto with id
router.delete('/:id', proyectoController.delete);

module.exports = router