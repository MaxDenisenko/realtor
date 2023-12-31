
import CommentsService from "../../service/comments.service";
import { DATA_COMMENTS, HAS_ERROR } from "../const";
import { GetZapis } from "./zapis.action";



export const GetComments = (phone)=> {
    return async (dispatch) => {
        try {
            const response = await CommentsService.getComments(phone)
            if (response.data.message) { return }
            dispatch({type: DATA_COMMENTS, payload: response.data})
        } catch (error) {
            // console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)}

    }
}

export const CreateComment = (date, phone, realtorFIO, plusminus, message) => {
    return async dispatch => {
        try {
            const response = await CommentsService.createComments(date, phone, realtorFIO, plusminus, message)
            return response
        } catch (error) {
            // console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)
        }
        finally{
            dispatch(GetZapis())
            dispatch(GetComments(phone))
        }
    }
}