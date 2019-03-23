import axios from "axios"
import jwt_decode from "jwt-decode"


export const setData = (data,callback)=>{
	return dispatch=>{
		dispatch({
			type: "LOGIN_USER_REQUEST"
		})
		dispatch({
			type: "LOGIN_USER_SUCCESS",
			payload: data
		})
		callback()
	}
} 

export const userlogin = (data, callback) =>{
	return dispatch =>{
		dispatch({
			type: "LOGIN_USER_REQUEST"
		})
		axios
		({ method: "POST",
			url: "http://localhost:7000/api/auth/login",
			data:data,
			responseType: "json"})
			.then(res => {
				let data = jwt_decode(res.data.token)
				dispatch({
					type: "LOGIN_USER_SUCCESS",
					payload: data
				})
				localStorage.setItem("user",res.data.token)
				callback(res.data)
			})
			.catch(err => {
				if(err.response){
					dispatch({
						type: "LOGIN_USER_FAILURE",
						payload: err.response.data.msg,
						other:err.response.data.err_field
                
					})
				}
			})
	}
}

export const logout = (callback)=>{
	return dispatch=>{
		localStorage.removeItem("user")

		dispatch({
			type:"LOGOUT_USER"
		})
		if(!localStorage.getItem("user")){
			callback()
		}
	}
}

export const userregister=(data,callback)=>{
	return dispatch =>{
		dispatch({
			type: "REGISTER_USER_REQUEST"
		})
		axios
		({ method: "POST",
			url: "http://localhost:7000/api/auth/register",
			data:data,
			responseType: "json"})
			.then(() => {
				dispatch({
					type: "REGISTER_USER_SUCCESS",
					payload: "Login to continue"
				})
				callback()
			})
			.catch(err => {
				if(err.response){
					dispatch({
						type: "REGISTER_USER_FAILURE",
						payload: err.response.data.msg,
						other:err.response.data.err_field
					})
				}
			})

	}        
}