import api from "../api";


class  AuthService {
    static async login(email , password){
        return api.post('/login',{email, password})
    }
    static async registration(email , password, name, lastname) {
        return api.post('/registration',{email, password, name, lastname})
    }
    static async logout() {
        return api.post('/logout')
    }
}

export default AuthService