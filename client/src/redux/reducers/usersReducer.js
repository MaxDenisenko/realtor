import { DATA_USER } from "../const"

const usersReducers = (state=[], action) => {
    switch (action.type) {
        case DATA_USER:
            return {...state, users: [...action.payload]}
        default:
            return state
    }
}

export default usersReducers