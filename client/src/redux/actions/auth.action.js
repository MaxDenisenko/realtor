import axios from "axios";
import AuthService from "../../service/auth.service";
import { AUTH_DATA_USER } from "../const";
import { API_URL } from "../../api/index";


export const AuthLoginAction = (email, password)=> {
    return (async (dispatch) => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: AUTH_DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    })
}
export const AuthRegistrationAction = (email, password, name, lastname)=> {
    return (async (dispatch) => {
        try {
            const response = await AuthService.registration(email, password, name, lastname)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: AUTH_DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    })
}
export const AuthLogoutAction = () => {
    return (async (dispatch) => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            dispatch({type: AUTH_DATA_USER, payload: {}})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    })
}
export const AuthCheckAction = () => {
    return (async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: AUTH_DATA_USER, payload: response.data})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    })
}