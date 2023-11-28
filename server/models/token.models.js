const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false})

const Tokens = sequelize.define('tokens',{
    userId: {
        type: DataTypes.INTEGER,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Tokens.sync().then(res => console.log('Таблица создана', res)).catch(err => console.log(err))

module.exports = Tokens