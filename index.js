const express = require('express')
//lembrar de colocar o engine
//subistiu o de baixo por esse const exphbs = require ('express-handlebars')
const {engine} = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

//iniciando o express 
const app = express()
//conexão do banco
const conn = require('./db/conn')


// Models
const biblioteca = require('./models/biblioteca')
const User = require('./models/User')

//IMPORT routers
const bibliotecaRouters = require('./routes/bibliotecaRouters')

//IMPORT CONTROLLER
//IMPORT CONTROLLER troquei o nome e coloquei + 1 S
//const BibliotecaControllers = require ('./controllers/BibliotecaController')

//IMPORT CONTROLLER
//const { DATE } = require('sequelize') COMANDO QUE COMENTEI
const BibliotecaController = require('./controllers/BibliotecaController')

//template do engine
app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.use(express.static('public'));
//receber repsota do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// configuração do session middleware(salvando as seçoes nos locais determinados)
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie:{
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

//conficuração flash messagens
app.use(flash())

//public path
app.use(express.static('public'))


//salvar a sessão na resposta

app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
 
})

//rotas sendo feita ( esta sendo importada no IMPORT routers)
app.use('/biblioteca', bibliotecaRouters )



app.get ('/', BibliotecaController.showBiblioteca) 


//sempre que eu for atulizar algo no banco tenho que 

//tenho que descomentar essa force true para atualizar nos user
conn
//.sync({force: true})
.sync()
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err))
