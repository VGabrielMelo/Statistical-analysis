const Sequelize = require("sequelize");
const { sequelize } = require("./../database/index")

const Arquivo = sequelize.define(
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