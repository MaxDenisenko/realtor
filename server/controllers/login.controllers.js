const loginService = require('../services/login.service')
const tokenService = require('../services/tokens.service')

class LoginControllers {
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await loginService.login(email, password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies
            const userData = await tokenService.refreshToken(refreshToken)
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginControllers()