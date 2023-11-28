const usersService = require('../services/users.service')

class UsersControllers {
    async getUser(req, res, next) {
        try {

            const user = await usersService.getUser()
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UsersControllers()