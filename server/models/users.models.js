const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false})

const Users = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type:DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type:DataTypes.STRING,
        defaultValue:'Guest'
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    activatedLink: {
        type: DataTypes.STRING,
    }
})

Users.sync().then(res => console.log('Таблица создана', res)).catch(err => console.log(err))

module.exports = Users