class LoginController {
    async login(req, res,next) {
        try {
            const {email, password} = req.body
            // const userData = await 
        } catch (error) {
            console.log(error)
        }
    }

    async refresh(req, res,next) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new LoginController()