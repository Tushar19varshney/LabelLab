const initialState = {
	isAuthenticated: false,
	isAuthenticating:false,
	statusText:"",
	details: {
		email:"",
	},
	error:false,
	err_field:""
}

const auth = ( state = initialState, action) => {
	switch (action.type){
	case "LOGIN_USER_REQUEST":
		return {
			...state,
			isAuthenticating:true
		}
	case "LOGIN_USER_SUCCESS":
		return {
			...state,
			isAuthenticated: true,
			isAuthenticating:false,
			statusText:"You are logged in successfully!",
			details:{
				email: action.payload.email,
			}
		}
	case "LOGIN_USER_FAILURE":
		return {
			...state,
			isAuthenticated:false,
			isAuthenticating:false,
			statusText: action.payload === "Unauthorized" ? "Email is not registered" : null,
			error:true,
			err_field: action.other
		}
	case "LOGOUT_USER":
		return {
			...state,
			isAuthenticated: false,
			isAuthenticating:false,
			statusText:"You have been successfully logged out",
			details:{
				email:""
			}
		}
	default:
		return state
	}
}
export default auth