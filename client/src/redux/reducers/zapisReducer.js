import { DATA_ZAPIS, AUTH_LOGOUT, DATA_COMMENTS } from "../const"
const initialState = []

const zapisReducers = (state=initialState, action) => {
    switch (action.type) {
        case DATA_ZAPIS:
            return {...state, zapis: [...action.payload]}
        case AUTH_LOGOUT:
            return initialState
        case DATA_COMMENTS:
            return {...state, message: [...action.payload]}
        default:
            return state
    }
}

export default zapisReducers