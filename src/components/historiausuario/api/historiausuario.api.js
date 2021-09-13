
const express = require('express')
const router = express.Router()
const historiausuarioController = require('../controller/historiausuario.controller');

router.use(cors())

// Create a new historiausuario
router.post('/', historiausuarioController.create);

// Retrieve all historiausuario
router.get('/', historiausuarioController.findAll);

// Retrieve a single historiausuario with id
router.get('/:id', historiausuarioController.findById);

// Retrieve list historiausuario with estado "pendiente"
router.get('/pendientes', historiausuarioController.findByPendientes);

// Retrieve list historiausuario with estado "pendiente"
router.get('/aprobados', historiausuarioController.findByAprobados);

// Update a historiausuario with id
router.put('/:id', historiausuarioController.update);

// Delete a historiausuario with id
router.delete('/:id', historiausuarioController.delete);


module.exports = router