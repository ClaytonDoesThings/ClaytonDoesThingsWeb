import React, { Component } from 'react'
import { Firebase as firebase } from '../../api'
import CreateUserDB from './CreateUserDB'
var provider = new firebase.auth.GoogleAuthProvider();

export default class SignIn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in");
            }
        });
        firebase.auth().signInWithPopup(provider).then((result) => {
            CreateUserDB(result["user"]);
            this.setState({
                loading: false
            });
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
        });
    }

    render () {
        if (this.state.loading) {
            return (
                <a>Signing in...</a>
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