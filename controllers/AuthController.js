const { where } = require('sequelize')

const User = require('../models/User')

const bcrypt = require('bcryptjs')


module.exports = class UserController{
//module.exports = class AuthController{
    
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        // Checagem se o usuario existe

        const user = await User.findOne({ where: { email: email }})
    
        if(!user){

        req.flash('message1', 'Não existe cadastro com esse E-mail, Por favor realizer seu cadastro')
        res.render('auth/login')
            return

        }

        // check Match para senha incorreta apos realizada a busca no banco 

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
        req.flash('message', 'Sua Senha esta incorreta, Tente novamente')
        res.render('auth/login')
            return
        }

    //inicializar a sessão do usurario

        req.session.userid = user.id
        //caso eu queira tirar a mensagem apos realizado o login, so remover o req flash
        req.flash('message1', 'Autenticação Realizada com Exito!')
  
        req.session.save(() => {
            res.redirect('/')
        })
  


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
       res.render('auth/cadastrar')
  
        return
      }

    //check if se o usuario existe
    const checkIfUserExists = await User.findOne({ where: { email: email }})
    
    if(checkIfUserExists) {
    //esse é pra pegar a estelização do css da main
        req.flash('message', 'E-mail já Cadastrado!')
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
        password: hashedPassword
    }

    try{ //CRIANDO CONSTANTE PARA SESSAÃO
        const createdUser = await User.create(user)
        
        //inicializar a sessão do usurario
        req.session.userid = createdUser.id
        //esse message é a estilização do css
        req.flash('message1', 'Cadastro Realizado com Sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })

    
    } catch (err) {

        console.log(err)
    }

}
    //criação do logout

    static logout (req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}