import { combineReducers } from "redux"
import auth from "./authentication"
import register from "./register"

const rootReducers = combineReducers({
	auth: auth,
	register: register,
})

export default rootReducers