const { sequelize } = require('./../database/index')
const ArquivoModel = require('./arquivo')

sequelize.sync()

module.exports = {
    ArquivoModel
}