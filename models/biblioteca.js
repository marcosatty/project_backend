const { DataTypes } = require('sequelize')

const db = require('../db/conn')

//User/ modo de usuario 
const User = require ('./User')

const biblioteca = db.define('biblioteca',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

biblioteca.belongsTo(User)
User.hasMany(biblioteca)

module.exports = biblioteca