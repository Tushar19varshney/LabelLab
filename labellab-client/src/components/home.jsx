import React, { Component } from 'react';
import { Link } from "react-router-dom"
import {Sidebar,Segment,Button,Icon,Menu,Image,Header, Container,Input} from 'semantic-ui-react'
import { connect } from "react-redux"
import {setData,logout,uploadImage,fetchUser} from "../actions/index"
import LabelPreview from "./labelpreview"
import home from "./css/home.css"

class HomeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible:false,
            file:'',
            image:'',
            max_size_error:''
         }
    }
    componentDidMount(){
        if(localStorage.getItem('user')){
            this.props.fetchUser()
        }
        else{
            this.props.history.push('/login')
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {file,image} = this.state
        if (file && file.size > 101200) {
            this.setState({
                max_size_error:"max sized reached"
            })
        } else {
          let data = {
            image: image,
            format: file.type
          }
          this.props.uploadImage(data,this.imageCallback)
        }
    }
    imageCallback=(msg)=>{
        this.props.fetchUser()
    }
    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            document.getElementById('file-name-display').innerHTML = "Filename : " + file.name
            this.setState({
                image: reader.result,
                file:file
            })
        }
        reader.readAsDataURL(file)
    }
    handleLogout =()=>{
        this.props.logout(this.logoutCallback)
    }
    logoutCallback=()=>{
        this.props.history.push('/login')
    }
    handleSidebarHide=()=>{
        this.setState({
            visible:false
        })
    }
    handleShowClick=()=>{
        this.setState({
            visible:true
        })
    }
    callback(){

    }

    render() { 
        const {visible} = this.state
        return ( 
            <div styleName={{height:'100vh'}}>
                <Sidebar.Pushable as={Container}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={visible}
                        width='3'
                    >
                    <Menu styleName="home.menu-back" vertical>
                        <Menu.Item>
                            <Header textAlign="center" as='h2' content='LabelLab' />
                        </Menu.Item>
                        <Menu.Item>
                        {this.props.isfetching ? <h4>LOADING</h4> :
                                    this.props.user && this.props.user.image ?
                                    <Image centered src={`http://localhost:7000/static/img/${this.props.user.image}`} size="small" />
                                : null
                                }
                        </Menu.Item>
                        <Menu.Item>
                            <Header textAlign="center" as='h3' content={this.props.user.username} />
                        </Menu.Item>
                    </Menu>
                        
                    </Sidebar>

                    <Sidebar.Pusher dimmed={visible}>
                        <Container styleName="home.container">
                        <Segment styleName="home.segment" basic>
                        <Menu styleName="home.menu">
                            <Button onClick={this.handleShowClick}>
                                <Button.Content >
                                    <Icon name='bars' />
                                </Button.Content>
                            </Button>
                            <Menu.Menu position="right">
                                <Menu.Item fitted styleName='home.borderless'>
                                    {this.props.isfetching ? <h4>LOADING</h4> :
                                    this.props.user && this.props.user.image ?
                                    <Image centered src={`http://localhost:7000/static/img/${this.props.user.image}?${Date.now()}`} size="mini" />
                                : null
                                }
                                </Menu.Item>
                                <Menu.Item >
                                    <Header textAlign="center" as='h5' content={this.props.user.username} />
                                </Menu.Item>
                                <Menu.Item >
                                    <Button onClick={this.handleLogout}>Logout</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        </Segment>
                        <div>{this.props.errors}</div>
                        <div>{this.state.max_size_error}</div>
                        <Segment>
                            <Input onChange={this.handleImageChange} type="file" />
                            <div id="file-name-display"></div>
                            <Button onClick={this.onSubmit}>Upload Image</Button>
                        </Segment>
                            <Link to="/test">
                                <Button>
                                    Click to open tool
                                </Button>
                            </Link>
                            <div>
                                <Header textAlign="center" as="h3" content="Previous Works" />
                                <LabelPreview />
                            </div>
                        </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.register.statusText,
        details:state.auth.details,
        user:state.user.userDetails,
        isfetching:state.user.userActions.isfetching,
        errors:state.user.userActions.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (callback) => {
            dispatch(logout(callback))
        },
        setData: (data,callback)=>{
            dispatch(setData(data,callback))
        },
        uploadImage: (data,callback)=>{
            dispatch(uploadImage(data,callback))
        },
        fetchUser:()=>{
            dispatch(fetchUser())
        }

    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)