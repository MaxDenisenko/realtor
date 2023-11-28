const RegistrationService = require('../services/registration.service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')

class RegistrationControllers {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                throw next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            }       

            const {name, lastname, email, password} = req.body
            const userData = await RegistrationService.registration(name, lastname, email, password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activatedLink = req.params.link
            await RegistrationService.activate(activatedLink)
            return res.redirect(process.env.API_URL)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegistrationControllers()