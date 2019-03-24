const initialState = {
	userActions:{
		isuploading:false,
		isfetching:false,
		errors:""
	},
	userDetails:{
		name:"",
		username:"",
		image:"",
		email:""
	}
}

const user = (state=initialState,action)=>{
	switch(action.type){
	case "UPLOAD_IMAGE_REQUEST":
		return {
			...state,
			userActions:{
				isuploading:true
			}
		}
	case "UPLOAD_IMAGE_FAILURE":
		return {
			...state,
			userActions:{
				isuploading:false,
				error: "Something went wrong!"
			}
		}
	case "UPLOAD_IMAGE_SUCCESS":
		return {
			...state,
			userActions:{
				isuploading:false,
			}
		}
	case "SET_USER_DATA_REQUEST":
		return {
			...state,
			userActions:{
				isfetching:true
			}
		}
	case "SET_USER_DATA_SUCCESS":
		return {
			...state,
			userActions:{
				isfetching:false,
			},
			userDetails:{
				name:action.payload.name,
				email:action.payload.email,
				username:action.payload.username,
				image:action.payload.image
			}
		}
	case "SET_USER_DATA_FAILURE":
		return{
			...state,
			userActions:{
				errors:action.payload
			}
		}
	default:
		return state
	}
}

export default user