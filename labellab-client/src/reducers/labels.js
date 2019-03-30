const initialState = {
	labelActions:{
		isposting:false,
		error:"",
		isfetching:false
	},
	images:{
	}
}

const user = (state=initialState,action)=>{
	switch(action.type){

	case "SET_LABEL_DATA_REQUEST":
		return {
			...state,
			labelActions:{
				isfetching:true
			}
		}
	case "SET_LABEL_DATA_FAILURE":
		return {
			...state,
			labelActions:{
				isfetching:false,
				error: "Something went wrong!"
			}
		}
	case "SET_LABEL_DATA_SUCCESS":
		return {
			...state,
			images:action.payload,
			labelActions:{
				isfetching:false
			}
		}

	case "POST_LABEL_REQUEST":
		return {
			...state,
			labelActions:{
				isposting:true
			}
		}
	case "POST_LABEL_FAILURE":
		return {
			...state,
			labelActions:{
				isposting:false,
				error: "Something went wrong!"
			}
		}
	case "POST_LABEL_SUCCESS":
		return {
			...state,
			labelActions:{
				isposting:false,
				error:"Successfully submitted"
			}
		}
	default:
		return state
	}
}

export default user