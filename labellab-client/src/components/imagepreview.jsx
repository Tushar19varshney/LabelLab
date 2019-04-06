import React, { Component } from "react"
import {connect} from "react-redux"
import {Image} from "semantic-ui-react"
import LabelDraw from "./labeldraw"
import "./css/imagepreview.css"

class ImagePreview extends Component {
	constructor(props) {
		super(props)
		this.state = {  }
	}
	componentDidMount(){

	}
	componentWillMount(){
		let rectangles = document.querySelector("rectangles")
	}
	render() { 
		return ( 
			<div>
				{this.props.image.image_url?
					<div className="preview-image" style={{
						backgroundImage:`url(http://localhost:7000/static/uploads/${this.props.image.image_url}?${Date.now()})`,
					}}>
					</div>
					: null}
				{this.props.image && this.props.image.label && this.props.image.label.map((label,index)=>
					<LabelDraw num={index} label={label} />
				)}
			</div>
		)
	}
}
 
const mapStateToProps = (state) => {
	return {
		image:state.images.imagePreview
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview)