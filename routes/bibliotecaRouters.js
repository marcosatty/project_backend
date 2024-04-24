const express = require('express')
const router = express.Router()
const BibliotecaController = require('../controllers/BibliotecaController')

//declarando helpers
const checkAuth = require('../helpers/auth').checkAuth

//criação das routers de biblioteca


router.get('/add', checkAuth ,BibliotecaController.createBiblioteca)
//criando o post para adicionar livro
router.post('/add', checkAuth ,BibliotecaController.createBibliotecasave)

router.get('/dashboard', checkAuth ,BibliotecaController.dashboard)

router.get('/', BibliotecaController.showBiblioteca)

module.exports = router