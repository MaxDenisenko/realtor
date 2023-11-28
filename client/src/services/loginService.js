import api from '../api/api'
class LoginService {
    static async login(email, password) {
        return api.post('/login', {email, password})
    }
}

export default LoginService