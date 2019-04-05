import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import rootReducers from "./reducers/index"
import "./App.css"
import Login from "./components/login"
import Home from "./components/home"
import Register from "./components/register"
import ImgLabel from "./components/img_label"
import Tool from "./components/img_label"

export default class App extends Component {
	constructor(props){
		super(props)
		this.store = createStore(rootReducers,
			compose(
				applyMiddleware(thunk),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			))
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Provider store={this.store}>
						<Route path="/login" component={Login} />
						<Route path="/home" component={Home} />
						<Route path="/register" component={Register} />
						<Route path="/test" component={ImgLabel} />
						<Route exact path="/tool" component={Tool} />
					</Provider>
				</Switch>
			</BrowserRouter>
		)
	}
}
