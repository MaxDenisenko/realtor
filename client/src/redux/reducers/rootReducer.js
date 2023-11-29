import { combineReducers } from "redux";
import authReducers from "./authReducer";
import usersReducers from "./usersReducer";
import zapisReducers from "./zapisReducer";


const rootReducer = combineReducers({
    auth: authReducers,
    users: usersReducers,
    zapis: zapisReducers
})

export default rootReducer