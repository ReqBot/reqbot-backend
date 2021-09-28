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

router.post('/change-password', usuarioController.changePassword);

router.post('/recovery-password', usuarioController.recoveryPasswordByAddress);
// Create a new usuario
router.post('/', usuarioController.create);

// Retrieve all usuario
router.get('/', usuarioController.findAll);


// Retrieve a single usuario with id
router.get('/:id',  usuarioController.findById);

// Retrieve list usuarios by Proyecto
router.get('/proyecto/:id', usuarioController.findByUsuarioPorProyecto);

// Retrieve all Usuarios by Organizacion
router.get('/organizacion/:id', usuarioController.findByOrganizacion);

// Update a usuario with id
router.put('/:id', usuarioController.update);

// Update a usuario with id
router.put('/estado/:id', usuarioController.updateEstado);

// Delete a usuario with id
router.delete('/:id', usuarioController.delete);

router.get('/inactive/:id', usuarioController.changeToInactive);


module.exports = router