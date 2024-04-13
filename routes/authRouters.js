const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
//colocando o controllers
//criação de uma class

//LOGIN
router.get('/login', AuthController.login)

router.post('/login', AuthController.loginPost)

//CADASTRAR
router.get('/cadastrar', AuthController.cadastrar)

router.post('/cadastrar', AuthController.cadastrarPost)

// logout do usuario

router.get('/logout', AuthController.logout)


//SOBRE
router.get('/sobre', AuthController.sobre)

module.exports = router