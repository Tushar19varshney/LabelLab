const initialState = {
	userActions:{
		isuploading:false,
		isfetching:false,
		isinitializing:false,
		errors:""
	},
	userProjects:{

	},
	userDetails:{
		name:"",
		username:"",
		image:"",
		email:""
	},
	allProjects:{

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
				errors: "Something went wrong!"
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
				image:action.payload.profile_image
			}
		}
	case "SET_USER_DATA_FAILURE":
		return{
			...state,
			userActions:{
				errors:action.payload
			}
		}
	case "INITIALIZE_PROJECT_REQUEST":
		return {
			...state,
			userActions:{
				isinitializing:true
			}
		}
	case "INITIALIZE_PROJECT_FAILURE":
		return {
			...state,
			userActions:{
				isinitializing:false,
				errors: action.payload
			}
		}
	case "INITIALIZE_PROJECT_SUCCESS":
		return {
			...state,
			userActions:{
				isinitializing:false,
			},
			userProjects:{
				project_name:action.payload.project_name,
				images:action.payload.image
			}
		}
	case "SET_PROJECT_NAME":
		return {
			...state,
			userProjects:{
				project_name:action.payload.project_name,
				images:action.payload.image
			}
		}
	case "SET_PROJECT_REQUEST":
		return {
			...state,
			userActions:{
				isfetching:true
			}
		}
	case "SET_PROJECT_SUCCESS":
		return {
			...state,
			userActions:{
				isfetching:false,
			},
			allProjects:action.payload
		}
	case "SET_PROJECT_FAILURE":
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