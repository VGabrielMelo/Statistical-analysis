const { Sequelize } = require('sequelize')
require('dotenv').config()

const db = process.env
const sequelize = new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASS, {
    host: db.DB_HOST,
    dialect: 'postgres'
})

const testConnection = async () =>{
    try {
        await sequelize.authenticate();
        console.info('Conexão com o banco realizada com sucesso.')
    } catch (error) {
        console.error('Erro durante a conexão com o banco de dados:', error.message)
    }
} 


module.exports = { testConnection, sequelize }