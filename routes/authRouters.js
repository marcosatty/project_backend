const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
//colocando o controllers
//criação de uma class
router.get('/login', AuthController.login)

router.get('/cadastrar', AuthController.cadastrar)

router.post('/cadastrar', AuthController.cadastrarPost)

router.get('/sobre', AuthController.sobre)

module.exports = router