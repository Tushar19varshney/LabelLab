import React, {Component} from "react"
import { connect } from "react-redux"
import { Message, Icon, Button , Form} from 'semantic-ui-react'
import { userlogin ,setData } from "../actions/index"
import jwt_decode from "jwt-decode"
import login from "./css/login.css"

class LoginIndex extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            submitted:false
        }
    }
    componentDidMount(){
        if(localStorage.getItem('user')){
            let data = jwt_decode(localStorage.getItem('user'))
            this.props.setData(data,this.callback)
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()

        let {email,password} = this.state

        this.setState({
            submitted:true
        })        
        if(email && password){
            let data={
                email:email,
                password:password
            }
            this.props.set_profile(data,this.callback)
        }
    }
    callback=(res)=>{
        this.props.history.push('/home')

    }
    render(){
        const {email,password,submitted} = this.state
        return(
            <div styleName='login.parent'>
            <Message
              attached
              header='Login Form'
              content='Fill out the form below to sign-in for a existing account'
            />
            <Form onSubmit={this.handleSubmit} className='attached fluid segment'>
              <Form.Input error={this.props.err_field === "email" || (submitted && email === '') } onChange={this.onChange} name="email" label='Email' placeholder='Email' type='email' />
              {submitted && !email && 
                    <div className='login-error-text'>
                        Email field cannot be empty
                    </div>
                }
                {this.props.statusText && this.props.err_field === 'email' && 
                    <div className='login-error-text'>
                        {this.props.statusText}
                    </div>
                }
              <Form.Input error={this.props.err_field === "password" || (submitted && password === '') } onChange={this.onChange} name="password" label='Password' placeholder='Password' type='password' />
              {submitted && !password && 
                    <div className='login-error-text'>
                        Password field cannot be empty
                    </div>
                }
                {this.props.statusText && this.props.err_field === 'password' && 
                    <div className='login-error-text'>
                        {this.props.statusText}
                    </div>
                }
              <Button loading={this.props.isAuthenticating} color='blue'>Submit</Button>
            </Form>
            <Message attached='bottom' warning>
              <Icon name='help' />
               No account?&nbsp;<a href='/register'>Register here</a>&nbsp;
            </Message>
            </div>
)
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        details:state.auth.details,
        statusText:state.auth.statusText,
        error:state.auth.error,
        err_field:state.auth.err_field
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: (data,callback) => {
            dispatch(setData(data,callback))
        },
        set_profile: (data,callback) => {
            dispatch(userlogin(data,callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginIndex)