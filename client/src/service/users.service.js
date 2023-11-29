import api from "../api";


class  UsersService {
    static async getUser() {
        return api.get('/user')
    }
}
export default UsersService