const { where } = require('sequelize')

const User = require('../models/User')

const bcrypt = require('bcryptjs')


// ou module.exports = class AuthController
module.exports = class AuthController{
    
    static login(req, res){
        res.render('auth/login')
    }


    static cadastrar(req, res){
        res.render('auth/cadastrar')
    }

    static sobre(req, res){
        res.render('auth/sobre')
    }
    


    static async cadastrarPost(req, res){

    const { name, email, telefone, password, confirmpassword } = req.body

  
    

    //validação da password
    if (password != confirmpassword) {
        req.flash('message', 'As senhas não conferem, tente novamente!')
       res.render('auth/register')
  
        return
      }

    //check if se o usuario existe
    const checkIfUserExists = await User.findOne({ where: { email: email }})
    
    if(checkIfUserExists) {
    //esse é pra pegar a estelização do css da main
        req.flash('message', 'E-mail já está em uso!')
        res.render('auth/cadastrar')
        
        return
    }
    //check if se o telefone já esta com o outro usuario
    const checkIfUserExiststelefone = await User.findOne({ where: { telefone: telefone }})
    
    if(checkIfUserExiststelefone) {

        req.flash('message', 'Telefone já está em uso!')
        res.render('auth/cadastrar')
        
        return
    }
    // create a password aumentando mais a segurança 

    const salt = bcrypt.genSaltSync(10)
    //gerando hashed da senha
    
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user ={
        name,
        email,
        telefone,
        password: hashedPassword,
    }

    try{
        await User.create(user)

        req.flash('message', 'Cadastro Realizado com Sucesso!')
        res.redirect('/')

    } catch (err) {

        console.log(err)
    }

}

}