import React, { Component } from 'react';
import {Sidebar,Segment,Button,Icon,Menu,Image,Header, Container,Input} from 'semantic-ui-react'
import { connect } from "react-redux"
import {setData,logout} from "../actions/index"
import jwt_decode from "jwt-decode"
import home from "./css/home.css"

class HomeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible:false
         }
    }
    componentDidMount(){
        if(localStorage.getItem('user')){
            if(!this.props.details.name || !this.props.details.username || !this.props.details.email ){
                let data = jwt_decode(localStorage.getItem('user'))
                this.props.setData(data,this.callback)
            }
        }
        else{
            this.props.history.push('/login')
        }
    }
    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            document.getElementById('file-name-display').innerHTML = "Filename : " + file.name
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
                            <Image centered src="https://react.semantic-ui.com/images/wireframe/square-image.png" size="small" circular />
                        </Menu.Item>
                        <Menu.Item>
                            <Header textAlign="center" as='h3' content={this.props.details.username} />
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
                                    <Image centered src="https://react.semantic-ui.com/images/wireframe/square-image.png" size="mini" circular />
                                </Menu.Item>
                                <Menu.Item >
                                    <Header textAlign="center" as='h5' content={this.props.details.username} />
                                </Menu.Item>
                                <Menu.Item >
                                    <Button onClick={this.handleLogout}>Logout</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        </Segment>
                        <Segment>
                            <Input onChange={this.handleImageChange} type="file" />
                            <div id="file-name-display"></div>
                        </Segment>
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
        details:state.auth.details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (callback) => {
            dispatch(logout(callback))
        },
        setData: (data,callback)=>{
            dispatch(setData(data,callback))
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)