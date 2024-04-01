const biblioteca = require('../models/biblioteca')
const User = require('../models/User')
const router = require('../routes/bibliotecaRouters')

module.exports = class BibliotecaController {
    static async showBiblioteca(req, res){
        res.render('biblioteca/home')
    }
}