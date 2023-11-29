import { AUTH_DATA_USER } from "../const"

const initialState = {
    isLogin: false
}

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DATA_USER: 
            return {...state, ...action.payload, isLogin: !state.isLogin}
        default:
            return state
    }
}


export default authReducers