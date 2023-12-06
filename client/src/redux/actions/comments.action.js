import CommentsService from "../../service/comments.service";
import { DATA_COMMENTS } from "../const";


export const GetComments = (phone)=> {
    return async (dispatch) => {
        try {
            const response = await CommentsService.getComments(phone)
            dispatch({type: DATA_COMMENTS, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}

export const CreateComment = (date, phone, realtorFIO, plusminus, message) => {
    return async dispatch => {
        try {

            await CommentsService.createComments(date, phone, realtorFIO, plusminus, message)
        } catch (error) {
            console.log(error.response?.data?.message);
        }
        finally{
            dispatch(GetComments())
        }
    }
}