import { DATA_USER } from "../const";
import UsersService from "../../service/users.service";

export const GetDataUsers = ()=> {
    return async (dispatch) => {
        try {
            const response = await UsersService.getUser()
            dispatch({type: DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}