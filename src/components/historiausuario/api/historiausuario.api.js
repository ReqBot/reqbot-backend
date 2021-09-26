const express = require('express')
const router = express.Router()
const historiausuarioController = require('../controller/historiausuario.controller');
const cors = require('cors')
const {
    ensureToken,
    authAdmin,
    authCliente,
    authAnalista
} = require("../../auth/auth");
router.use(cors())

// Create a new historiausuario
router.post('/', historiausuarioController.create);

router.get('/media', historiausuarioController.orderByMedia);

router.get('/bajo', historiausuarioController.orderByBajo);

router.get('/alta', historiausuarioController.orderByAlta);

// Retrieve all historiausuario
router.get('/pendientes', historiausuarioController.findByPendientes);

// Retrieve all historiausuario
router.get('/pendientes/:id', historiausuarioController.findByProyectoPendientes);

// Retrieve all historiausuario
router.get('/aprobados', historiausuarioController.findByAprobados);

// Retrieve all historiausuario
router.get('/aprobados/:id', historiausuarioController.findByProyectoAprobados);

// Retrieve all historiausuario by identifier
router.get('/identificador/:id', historiausuarioController.findByIdentifier);

// Retrieve a single historiausuario with id
router.get('/:id', historiausuarioController.findById);

// Retrieve list historiausuario
router.get('/', historiausuarioController.findAll);

// Update a historiausuario with id
router.put('/:id', historiausuarioController.update);

// Delete a historiausuario with id
router.delete('/:id', historiausuarioController.delete);

router.get('/inactive/:id', historiausuarioController.changeToInactive);




module.exports = router