import api from "../api";

class  CommentsService {
    static async getComments(){
        return api.get('/comment')
    }
    static async createComments(date, phone, realtorFIO, plusminus, message) {
        return api.post('/comment',{date, phone, realtorFIO, plusminus, message})
    }
}

export default CommentsService