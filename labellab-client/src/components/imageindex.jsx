import React, { Component } from "react"
import {connect} from "react-redux"


class ImageIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {  }
	}
	componentDidMount(){
        
	}
	render() { 
		return ( 
			<div></div>
		)
	}
}
 
const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ImageIndex)