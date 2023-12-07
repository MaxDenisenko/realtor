import { DATA_ZAPIS, AUTH_LOGOUT, DATA_COMMENTS } from "../const"
const initialState = []

const zapisReducers = (state=initialState, action) => {
    switch (action.type) {
        case DATA_ZAPIS:
            return {...state, zapis: [...action.payload]}
        case AUTH_LOGOUT:
            return initialState
        case DATA_COMMENTS:
            return {...state, zapis: state.zapis.map((zapis) => {
                if(zapis.phone === action.payload[0].phone) {
                    return {...zapis, message:[...action.payload]}
                }
                return zapis
            })}
        default:
            return state
    }
}

export default zapisReducers