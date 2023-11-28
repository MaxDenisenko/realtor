const ApiError = require('../exceptions/apiError')
const usersModel = require('../models/users.models')
const bcrypt = require('bcrypt')
const UserDto = require('../dto/user.dto')
const TokenService = require('./tokens.service')

class LogoutService {
    async logout(refreshToken){
        const token = await TokenService.removeToken(refreshToken)
        return token
    }
}

module.exports = new LogoutService()