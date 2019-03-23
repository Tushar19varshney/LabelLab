const initialState = {
	isAuthenticated: false,
	isAuthenticating:false,
	statusText:"",
	details: {
		name:"",
		username:"",
		email:""
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
				name: action.payload.name,
				username:action.payload.username,
				email: action.payload.email
			}
		}
	case "LOGIN_USER_FAILURE":
		return {
			...state,
			isAuthenticated:false,
			isAuthenticating:false,
			statusText: action.payload,
			error:true,
			err_field: action.other
		}
	case "LOGOUT_USER":
		return {
			...state,
			isAuthenticated: false,
			isAuthenticating:false,
			statusText:"YOu have been successfully logged out",
			details:{
				name:"",
				username:"",
				email:""
			}
		}
	default:
		return state
	}
}
export default auth