import React, { Component } from "react"
import {Image,Header} from "semantic-ui-react"
import {connect} from "react-redux"
import {setlabelData} from "../actions/index"

class LabelPreview extends Component {
	constructor(props) {
		super(props)
		this.state = {  }
	}
	componentDidMount(){
		this.props.setLabel()
	}
	render() { 
		return ( 
			<div>
				{!this.props.actions.isfetching ?
					this.props.labels && this.props.labels.images[0] && this.props.labels.images.map((image,index)=>
						<div>
							<Image size="medium" src={`http://localhost:7000/static/uploads/${image.image}`} />
							<div>
								<Header as='h4' content='Labels' />
								{
									image.labels && image.labels.map((label,i)=>
										<div>
											{label.label_name}
										</div>
									)
								}
							</div>
						</div>
					)
					: <Header as='h2' content='Loading' /> }
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		labels:state.labels,
		actions:state.labels.labelActions
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setLabel : ()=>{
			return dispatch(setlabelData())
		}
	}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LabelPreview)