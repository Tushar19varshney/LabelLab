import React, { Component } from "react"
import ToolIndex from "./tool"
import {Input} from "semantic-ui-react"

class ImgLabel extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			image:'',
			file:''
		 }
	}
	handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
                file:file
			})
		}
        reader.readAsDataURL(file)
    }
	render() { 
		return ( 
			<div>
				<Input onChange={this.handleImageChange} type="file" />
				{this.state.image !== "" ?
				<ToolIndex image={this.state.image} file={this.state.file} /> 
				: null}
			</div>
			
		)
	}
}
 
export default ImgLabel