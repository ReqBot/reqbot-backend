const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller');
const cors = require('cors')
const {
    ensureToken,
    authAdmin,
    authCliente,
    authAnalista
} = require("../../auth/auth");

router.use(cors())


//login
router.post('/login', usuarioController.login);

//logOut
router.get('/logout', ensureToken, usuarioController.logOut);
// Create a new usuario
router.post('/', usuarioController.create);

// Retrieve all usuario
router.get('/', usuarioController.findAll);

/*
// Retrieve all usuario
router.get('/', usuarioController.findAll);*/

// Retrieve a single usuario with id
router.get('/:id', ensureToken, authAdmin, usuarioController.findById);

// Retrieve list usuarios by Proyecto
router.get('/proyecto/:id', ensureToken,usuarioController.findByUsuarioPorProyecto);

// Retrieve all Usuarios by Organizacion
router.get('/organizacion/:id',ensureToken, usuarioController.findByOrganizacion);

// Update a usuario with id
router.put('/:id', ensureToken,usuarioController.update);

// Delete a usuario with id
router.delete('/:id', ensureToken,usuarioController.delete);

router.get('/inactive/:id', ensureToken,usuarioController.changeToInactive);

router.post('/change-password',ensureToken, usuarioController.changePassword);


module.exports = router