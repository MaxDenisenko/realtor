import { DATA_ZAPIS, AUTH_LOGOUT, DATA_COMMENTS, SEARCH_PHONE } from "../const"
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
        case SEARCH_PHONE:
            return {...state,
            searchPhone:[...state.zapis].filter(item => item.phone.includes(action.payload))
            }
        default:
            return state
    }
}

export default zapisReducers