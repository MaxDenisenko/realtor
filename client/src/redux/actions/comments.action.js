
import CommentsService from "../../service/comments.service";
import { DATA_COMMENTS, HAS_ERROR } from "../const";



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
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)
        }
        finally{
            dispatch(GetComments(phone))
        }
    }
}