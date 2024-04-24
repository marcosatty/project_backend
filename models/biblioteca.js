const { DataTypes } = require("sequelize")

const db = require("../db/conn")

//User/ modo de usuario 
const User = require("../models/User")

const Biblioteca = db.define("biblioteca",{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
});

Biblioteca.belongsTo(User);
User.hasMany(Biblioteca);

module.exports = Biblioteca