import React, { Component } from "react"
import {withRouter} from "react-router-dom"
import { Card, Header } from "semantic-ui-react"
import { connect } from "react-redux"
import "./css/home.css"
import { setProjectData } from "../actions/index"

class LabelPreview extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		this.props.setProject()
	}
	handleClick = id => {
		// console.log(this.props)
		this.props.history.push({
			pathname:'/tool',
		    search:'?project_id='+id
		})
	}
	render() {
		return (
			<div>
				{!this.props.actions.isfetching ? (
					this.props.projects[0] &&
					this.props.projects.map((project, index) => (
							<Card onClick={() => this.handleClick(project._id)}>
								<Card.Content className="card-headers" header={project.project_name} />
								<Card.Content description="Image Labelling App" />
								<Card.Content extra />
							</Card>
					))
				) : (
					<Header as="h2" content="Loading" />
				)}
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		projects: state.user.allProjects,
		actions: state.user.userActions
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setProject: () => {
			return dispatch(setProjectData())
		}
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(LabelPreview))
