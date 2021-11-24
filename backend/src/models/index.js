const database = require("../database");
const ArquivoModel = require('./arquivo')
const UsuarioModel = require("./usuario");

database.sync()

module.exports = {
    UsuarioModel,
    ArquivoModel
}