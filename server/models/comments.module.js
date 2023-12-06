const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {logging:false})

const Comments = sequelize.define('comments',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type:DataTypes.DATE,
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    realtorFIO: {
        type:DataTypes.STRING,
        allowNull: false
    },
    plusminus: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.STRING,
    }
})

Comments.sync().then(res => console.log('Таблица создана', res)).catch(err => console.log(err))

module.exports = Comments