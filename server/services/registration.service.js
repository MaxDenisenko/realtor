const usersModels = require('../models/users.models')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const mailService = require('./mail.service')
const ApiError = require('../exceptions/apiError')
const UserDto = require('../dto/user.dto')
const TokenService = require('../services/tokens.service')

class RegistrationService {
    async registration (name, lastname, email, password) {
        const findUser = await usersModels.findOne({where: {email}})
        if(findUser) {
            throw ApiError.BadRequest(`Email с таким адресов (${email} уже зарегистрирован)`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activatedLink = uuid.v4()

        const createUser = await usersModels.create({
            name,
            lastname,
            email,
            password: hashPassword,
            activatedLink
        })

        //await mailService.sendMail(email, `${process.env.API_URL}/api/activate/${activatedLink}`)

        const link = `${process.env.API_URL}/api/activate/${activatedLink}`

        const userDto = new UserDto(createUser)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(createUser.id, tokens.refreshToken)

        return {user: userDto, ...tokens, link}
    }
    async activate(activatedLink) {
        const user = await usersModels.findOne({where: {activatedLink}})
        if (!user) {
            throw ApiError.BadRequest('Не корректная ссылка')
        }
        user.update({isActivated: true})
    }
}

module.exports = new RegistrationService()