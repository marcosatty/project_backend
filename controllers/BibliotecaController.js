const Biblioteca = require('../models/biblioteca')
const User = require('../models/User')
const router = require('../routes/bibliotecaRouters')

module.exports = class BibliotecaController {
    static async showBiblioteca(req, res){
        res.render('biblioteca/home')
    }

    static async dashboard (req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Biblioteca,
            plain: true,
        })

        

        if (!user) {
            res.redirect('/login')
        }
        
        const bibliotecas = user.bibliotecas.map((result) => result.dataValues)

        console.log(bibliotecas)

        //console.log(user.bibliotecas)

        res.render('biblioteca/dashboard' , {bibliotecas})
    }


    static createBiblioteca (req, res ) {
        res.render('biblioteca/create')
    }

    static async createBibliotecasave (req, res ) {
        try {
        const biblioteca = {
            title: req.body.title,
            UserId: req.session.userid
        }

        
         await Biblioteca.create(biblioteca)


        req.flash('message1', 'Livro Cadastrado com sucesso!')

        req.session.save(() => {
            res.redirect('/biblioteca/dashboard')
        })
        } catch (error) {
            console.log('Aconteceu um erro:' + error)
        }

    }

}