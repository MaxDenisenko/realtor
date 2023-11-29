import { DATA_ZAPIS } from "../const"

const zapisReducers = (state=[], action) => {
    switch (action.type) {
        case DATA_ZAPIS:
            return {...state, zapis: [...action.payload]}
        default:
            return state
    }
}

export default zapisReducers