import React, { Component } from 'react'
import { Firebase as firebase } from '../../api'

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
        firebase.auth().signOut().then(()=>{
            console.log("Signed Out");
            this.setState({
                loading: false
            });
        }, function (error) {
            console.error("Sign Out Error", error);
        });
    }

    render () {
        if (this.state.loading) {
            return (
                <span>Signing out...</span>
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
            <span>Redirecting...</span>
        )
    }
}