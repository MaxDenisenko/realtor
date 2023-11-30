import api from "../api";

class  ZapisService {
    static async getZapis(){
        return api.get('/zapis')
    }
    static async createZapis(phone) {
        return api.post('/zapis',{phone})
    }
}

export default ZapisService