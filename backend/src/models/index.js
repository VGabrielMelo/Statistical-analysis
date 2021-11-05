const { sequelize } = require('./../database/index')
const ArquivoModel = require('./arquivo')
const UsuarioModel = require("./usuario");

sequelize.sync()

module.exports = {
    UsuarioModel,
    ArquivoModel
}