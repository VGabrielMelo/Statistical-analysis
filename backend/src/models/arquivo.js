const Sequelize = require("sequelize");
const database = require("../database");

const Arquivo = database.define(
    "arquivo",{
        idArquivo:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true
    }
)

module.exports = Arquivo