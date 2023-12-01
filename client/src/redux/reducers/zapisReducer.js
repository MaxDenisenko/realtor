import { DATA_ZAPIS, AUTH_LOGOUT } from "../const"
const initialState = []

const zapisReducers = (state=initialState, action) => {
    switch (action.type) {
        case DATA_ZAPIS:
            return {...state, zapis: [...action.payload]}
        case AUTH_LOGOUT:
            return initialState
        default:
            return state
    }
}

export default zapisReducers