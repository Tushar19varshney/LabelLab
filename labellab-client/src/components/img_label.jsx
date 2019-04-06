import React, { Component } from "react"
import ToolIndex from "./tool"
import { connect } from "react-redux"
import { Form,Button, Header , Image} from "semantic-ui-react";
import {submitImage,setImageData} from "../actions/index"
import ImageIndex from "./imageindex"
class ImgLabel extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			image:'',
			file:'',
			image_name:'',
			project_id:'',
			showform:false,
			format:''
		 }
	}
	handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
				file:file,
				format:file.type,
				image_name:file.name,
				showform:true
			})
		}
        reader.readAsDataURL(file)
	}
	handleSubmit=(e)=>{
		e.preventDefault()

		const {image_name,image,project_id,format} = this.state
		let data = {
			image_name:image_name,
			image:image,
			project_id:project_id,
			format:format
		}
		this.props.submitImage(data	,	()=> this.setState({
			showform:false
		}))
	}
	handleChange=(e)=>{
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]:value})
    }
	componentDidMount(){
		if(localStorage.getItem('user')){
			let search = this.props.location.search
			let id = search.substring(search.indexOf("=")+1)
			this.setState
			({
				project_id:id
			})
			if(id){
				this.props.fetchImage({project_id:id})
			}
        }
        else{
            this.props.history.push('/login')
        }
	}
	render() {
		const {showform,image_name} = this.state
		const {imageActions} = this.props
		return ( 
			<div className="img-label-parent">
				<div className="tool-parent">
					<div>
						<input type="file" onChange={this.handleImageChange} className="file-input" id="embedpollfileinput" />
						<label for="embedpollfileinput" className="ui medium primary left floated button">
							Upload image
						</label>
					</div>
					<div>
					{showform ?
                        <Form encType='multiple/form-data' onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Image Name</label>
                                <input name="filename" value={image_name} onChange={this.handleChange} placeholder='First Name' />
                            </Form.Field>
                            <Button loading={imageActions.isposting} type='submit'>Submit</Button>
                        </Form> : null}
					</div>
					<div>
						{this.state.image !== "" && !showform ?
						<ToolIndex project_id={this.state.project_id} image_name={this.state.image_name} image={this.state.image} file={this.state.file} /> 
						: null}
					</div>
				</div>
				<div className="tool-images">
					<div>
						<Header content="Images" as="h3" />
						<ImageIndex/>
					</div>
				</div>
			</div>
			
		)
	}
}
 
const mapStateToProps = (state) => {
	return {
		project:state.user.userProjects,
		imageActions:state.images.imageActions,
		images:state.user.userProjects.images
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchImage: (data)=>{
			return dispatch(setImageData(data))
		},
		submitImage: (data,callback)=>{
			return dispatch(submitImage(data,callback))
		}
	}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ImgLabel)