import { combineReducers } from "redux"
import auth from "./authentication"
import register from "./register"
import user from "./user"

const rootReducers = combineReducers({
	auth: auth,
	register: register,
	user: user
})

export default rootReducers