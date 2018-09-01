import React, { Component } from 'react'
import { Firebase as firebase } from '../../api'
var provider = new firebase.auth.GoogleAuthProvider();

export default class SignIn extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: true,
			authError: "",
			email: "",
			emailError: false,
			password: "",
			passwordError: false
		}

		this.signInWithGoogle = this.signInWithGoogle.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
		this.signUpWithEmailAndPassword = this.signUpWithEmailAndPassword.bind(this);
	}

	componentDidMount () {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in");
                this.setState({
                    loading: false
                });
            }
		});
	}

	signInWithGoogle (event) {
		firebase.auth().signInWithPopup(provider).then((result) => {
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
			console.log(errorCode);
			console.log(errorMessage);
			console.log(email);
			console.log(credential);
			this.setState({
				authError: errorMessage
			});
		});
	}

	handleEmail (event) {
		this.setState({email: event.target.value});
	}
	
	handlePassword (event) {
		this.setState({password: event.target.value});
	}
	
	signInWithEmailAndPassword (event) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(this.state.email)) {
			this.setState({
				emailError: false
			});
			if (this.state.password !== "") {
				this.setState({
					passwordError: false
				});
				firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode);
					console.log(errorMessage);
					this.setState({
						authError: errorMessage
					});
				});
			} else {
				this.setState({
					passwordError: true
				});
			}
		} else {
			this.setState({
				emailError: true
			});
		}
	}

	signUpWithEmailAndPassword (event) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(this.state.email)) {
			this.setState({
				emailError: false
			});
			if (this.state.password !== "") {
				this.setState({
					passwordError: false
				});
				firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode);
					console.log(errorMessage);
					this.setState({
						authError: errorMessage
					});
				});
			} else {
				this.setState({
					passwordError: true
				});
			}
		} else {
			this.setState({
				emailError: true
			});
		}
	}

	render () {
		if (this.state.loading) {
			return (
				<div>
					<h1>Sign In</h1>
					<button onClick={this.signInWithGoogle}>Sign In With Google</button>
					<br/>
					<a>{this.state.authError}</a>
					{this.state.authError !== "" ? <br/> : null}
					<a>email: </a><input type="email" value={this.state.email} onChange={this.handleEmail}/>
					<a>{this.state.emailError ? " Email address not valid" : ""}</a>
					<br/>
					<a>password: </a><input type="password" value={this.state.password} onChange={this.handlePassword}/>
					<a>{this.state.passwordError ? " Password cannot be blank" : ""}</a>
					<br/>
					<button onClick={this.signInWithEmailAndPassword}>Sign In</button>
					<button onClick={this.signUpWithEmailAndPassword}> Sign Up</button>
				</div>
			);
		} else {
			return (
				<Redirect url="/"/>
			);
		}
	}
}

class Redirect extends Component {
	constructor (props) {
		super(props);
		this.state = {
			url: this.props.url
		}
	}

	componentDidMount () {
		console.log(this.state.url);
		window.location.replace(this.state.url);
	}

	render () {
		return (
			<a>Redirecting...</a>
		)
	}
}