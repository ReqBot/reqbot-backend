
const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuario.controller');
const cors = require('cors')
const {authAdmin} = require("../../auth/auth");

router.use(cors())


//login
router.post('/login',usuarioController.login);
//logOut
router.get('/logout',usuarioController.logOut);
// Create a new usuario
router.post('/', usuarioController.create);

// Retrieve all usuario
router.get('/', usuarioController.findAll);

// Retrieve a single usuario with id
router.get('/:id',authAdmin, usuarioController.findById);

// Retrieve list usuarios by Proyecto
router.get('/proyecto/:id', usuarioController.findByUsuarioPorProyecto);

// Retrieve all Usuarios by Organizacion
router.get('/organizacion/:id', usuarioController.findByOrganizacion);

// Update a usuario with id
router.put('/:id', usuarioController.update);

// Delete a usuario with id
router.delete('/:id', usuarioController.delete);

module.exports = router