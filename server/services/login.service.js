const UsersModels = require('../models/users.models')
const bcrypt = require('bcrypt')


class LoginService {
    async login (email, password) {
        try {
            const findUser = await UsersModels.findOne({where: {email}})
            if (!findUser) {
                console.log(`Пользователь с таким email ${email} не найден`)
            }
            const isPasswordCompare = bcrypt.compare(password,findUser.password)
            if (!isPasswordCompare) {
                throw new Error(`Пароль не верный`)
            }   
            return {...findUser}
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new LoginService()