const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false})

const Zapisi = sequelize.define('zapis',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type:DataTypes.DATE
    },
    area: {
        type:DataTypes.STRING
    },
    sum: {
        type: DataTypes.INTEGER
    },
    fioClient: {
        type: DataTypes.STRING
    },
    phoneClient: {
        type:DataTypes.STRING
    },
    comment: {
        type: DataTypes.STRING
    }
})

Zapisi.sync().then(res => console.log('Таблица создана', res)).catch(err => console.log(err))

module.exports = Zapisi