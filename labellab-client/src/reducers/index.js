import { combineReducers } from "redux"
import auth from "./authentication"
import register from "./register"
import user from "./user"
import labels from "./labels"

const rootReducers = combineReducers({
	auth: auth,
	register: register,
	user: user,
	labels:labels
})

export default rootReducers