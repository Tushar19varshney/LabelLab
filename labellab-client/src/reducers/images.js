const initialState = {
	imageActions:{
		isposting:false,
		error:"",
		isfetching:false
	},
	images:{
	}
}

const user = (state=initialState,action)=>{
	switch(action.type){

	case "SET_IMAGE_DATA_REQUEST":
		return {
			...state,
			imageActions:{
				isfetching:true
			}
		}
	case "SET_IMAGE_DATA_FAILURE":
		return {
			...state,
			imageActions:{
				isfetching:false,
				error: "Something went wrong!"
			}
		}
	case "SET_IMAGE_DATA_SUCCESS":
		return {
			...state,
			images:action.payload,
			imageActions:{
				isfetching:false
			}
		}

	case "POST_IMAGE_REQUEST":
		return {
			...state,
			imageActions:{
				isposting:true
			}
		}
	case "POST_IMAGE_FAILURE":
		return {
			...state,
			imageActions:{
				isposting:false,
				error: "Something went wrong!"
			}
		}
	case "POST_IMAGE_SUCCESS":
		return {
			...state,
			imageActions:{
				isposting:false,
				error:"Successfully submitted"
			},
			images:action.payload
		}
	default:
		return state
	}
}

export default user