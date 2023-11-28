const logoutService = require('../services/logout.service')


class LogoutControllers {
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await logoutService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json('Logout success')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LogoutControllers()