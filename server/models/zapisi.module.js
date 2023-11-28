const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false})

const Zapisi = sequelize.define('zapis',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    plus: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    minus: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

Zapisi.sync().then(res => console.log('Таблица создана', res)).catch(err => console.log(err))

module.exports = Zapisi