import api from "../api";

class  ZapisService {
    static async login(email , password) {
        return api.post('/login',{email, password})
    }
    static async registration(email , password, name, lastname){
        return api.post('/registration',{email, password, name, lastname})
    }
    static async getZapis(){
        return api.get('/zapis')
    }
}

export default ZapisService