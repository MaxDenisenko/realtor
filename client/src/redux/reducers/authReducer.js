import { AUTH_DATA_USER, AUTH_LOGOUT, LOADING } from "../const"

const initialState = {
    isLogin: false,
    isLoading: false
}

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DATA_USER: 
            return {...state, ...action.payload, isLogin: !state.isLogin}
        case AUTH_LOGOUT:
            return {state, isLogin: false, isLoading: false}
        case LOADING:
            return {...state, isLoading: !state.isLoading}
        default:
            return state
    }
}


export default authReducers