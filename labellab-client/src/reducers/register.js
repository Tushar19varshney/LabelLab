const intialState ={
	isRegistering:false,
	error:false,
	err_field:"",
	statusText:""
}

const register = (state = intialState , action )=>{
	switch(action.type){
	case "REGISTER_USER_REQUEST":
		return {
			...state,
			isRegistering:true,
			error:false
		}
	case "REGISTER_USER_SUCCESS":
		return {
			...state,
			isRegistering:false,
			statusText: action.payload,
			error:false
		}
	case "REGISTER_USER_FAILURE":
		return {
			...state,
			isRegistering:false,
			statusText: action.payload,
			err_field:action.other,
			error:true
		}
	default:
		return state
	}
}

export default register