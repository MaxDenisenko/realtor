import api from "../api";

class  CommentsService {
    static async getComments(phone){
        return api.get('/comment',{phone})
    }
    static async createComments(date, phone, realtorFIO, plusminus, message) {
        return api.post('/comment',{date, phone, realtorFIO, plusminus, message})
    }
}

export default CommentsService