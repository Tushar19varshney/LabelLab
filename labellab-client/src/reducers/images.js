const initialState = {
	imageActions:{
		isposting:false,
		error:"",
		isfetching:false,
		isloading:false
	},
	images:{	},
	imageDetails:{	},
	imagePreview:{
		image_id:"",
		image_name:"",
		image_url:"",
		label:""
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
	
	case "SET_IMAGE_REQUEST":
		return {
			...state,
			imageActions:{
				isfetching:true
			},
		}
	case "SET_IMAGE_FAILURE":
		return {
			...state,
			imageActions:{
				isfetching:false,
				error: "Something went wrong!"
			}
		}
	case "SET_IMAGE_SUCCESS":
		return {
			...state,
			imageDetails:action.payload,
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
	case "IMAGE_PREVIEW_REQUEST":
		return {
			...state,
			imageActions:{
				isloading:true
			}
		}
	case "IMAGE_PREVIEW_SUCCESS":
		return {
			...state,
			imageActions:{
				isloading:false
			},
			imagePreview:{
				image_id:action.payload.image_id,
				image_name:action.payload.image_name,
				image_url:action.payload.image_url,
				label:action.payload.label
			}
		}
	default:
		return state
	}
}

export default user