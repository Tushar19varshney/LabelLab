const initialState = {
	labelActions:{
		isposting:false,
		error:""
	},
	labelDetails:{
		image:"",
		labels:{
       
		}
	}
}

const user = (state=initialState,action)=>{
	switch(action.type){
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
			labelDetails:{
				image:action.payload.image_id,
				labels:action.payload.labels
			},
			labelActions:{
				isposting:false
			}
		}
	default:
		return state
	}
}

export default user