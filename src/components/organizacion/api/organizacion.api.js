
const express = require('express')
const router = express.Router()
const organizacionController = require('../controller/organizacion.controller');
const cors = require('cors')

router.use(cors())
// Create a new organizacion
router.post('/', organizacionController.create);

// Retrieve all organizacion
router.get('/', organizacionController.findAll);

// Retrieve a single organizacion with id
router.get('/:id', organizacionController.findById);

// Update a organizacion with id
router.put('/:id', organizacionController.update);

// Delete a organizacion with id
router.delete('/:id', organizacionController.delete);

module.exports = router