
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

// Retrieve all proyecto
router.get('/ascendente', proyectoController.orderByAsc);

// Retrieve all proyecto
router.get('/ascendente/:id', proyectoController.orderByUserAsc);

// Retrieve all proyecto
router.get('/descendente', proyectoController.orderByDesc);

// Retrieve all proyecto
router.get('/descendente/:id', proyectoController.orderByUserDesc);

// Retrieve a single proyecto with id
router.get('/:id', proyectoController.findById);

// Retrieve list proyectos with Organizacion
router.get('/organizacion/:id', proyectoController.findByOrganizacion);

// Retrieve list proyectos with Organizacion
router.get('/usuarios/:id', proyectoController.getUsers);

// Update a proyecto with id
router.put('/:id', proyectoController.update);

router.get('/inactive/:id',  proyectoController.changeToInactive);

// Delete a proyecto with id
router.delete('/:id', proyectoController.delete);

router.get('/inactive/:id', proyectoController.changeToInactive);

router.get('/delete/:id', proyectoController.changeStateToDelete);

module.exports = router