import ZapisService from "../../service/zapis.service";
import { DATA_ZAPIS } from "../const";


export const GetZapis = ()=> {
    return async (dispatch) => {
        try {
            const response = await ZapisService.getZapis()
            dispatch({type: DATA_ZAPIS, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}