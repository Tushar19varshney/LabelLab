import { combineReducers } from "redux"
import auth from "./authentication"
import register from "./register"
import user from "./user"
import labels from "./labels"
import images from "./images"

const rootReducers = combineReducers({
	auth: auth,
	register: register,
	user: user,
	labels:labels,
	images:images
})

export default rootReducers