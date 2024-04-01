const express = require('express')
const router = express.Router()
const BibliotecaController = require('../controllers/BibliotecaController')
//colocando o controllers
//criação de uma class
router.get('/', BibliotecaController.showBiblioteca)

module.exports = router