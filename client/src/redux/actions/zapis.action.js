import ZapisService from "../../service/zapis.service";
import { DATA_ZAPIS, HAS_ERROR } from "../const";


export const GetZapis = ()=> {
    return async (dispatch) => {
        try {
            const response = await ZapisService.getZapis()
            dispatch({type: DATA_ZAPIS, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)
        }
    }
}

export const CreateZapis = (phone) => {
    return async dispatch => {
        try {
            await ZapisService.createZapis(phone)
        } catch (error) {
            console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)
        }
        finally{
            dispatch(GetZapis())
        }
    }
}