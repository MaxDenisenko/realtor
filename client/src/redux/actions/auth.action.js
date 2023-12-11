import axios from "axios";
import AuthService from "../../service/auth.service";
import { AUTH_DATA_USER, AUTH_LOGOUT, HAS_ERROR, LOADING } from "../const";
import { API_URL } from "../../api/index";


export const AuthLoginAction = (email, password)=> {
    return (async (dispatch) => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('tokenR', response.data.accessToken)
            dispatch({type: AUTH_DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)
        }
    })
}
export const AuthRegistrationAction = (email, password, name, lastname)=> {
    return (async (dispatch) => {
        try {
            const response = await AuthService.registration(email, password, name, lastname)
            localStorage.setItem('tokenR', response.data.accessToken)
            dispatch({type: AUTH_DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)
        }
    })
}
export const AuthLogoutAction = () => {
    return (async (dispatch) => {
        try {
            await AuthService.logout()
            localStorage.removeItem('tokenR')
            dispatch({type: AUTH_LOGOUT})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    })
}
export const AuthCheckAction = () => {
    return async (dispatch) => {
        dispatch({type: LOADING})
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true})
            localStorage.setItem('tokenR', response.data.accessToken)
            dispatch({type: AUTH_DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
            dispatch({type: HAS_ERROR, payload: error.response?.data?.message})
            setTimeout(()=> {dispatch({type: HAS_ERROR})}, 10000)

        }
        finally { dispatch({type: LOADING})}
    }
}