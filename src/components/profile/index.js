import React, { Component } from 'react'
import { Firebase as firebase } from '../../api'

export default class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            currentUser: null,
            displayName: "",
            displayNameError: ""
        }
        this.handleDisplayName = this.handleDisplayName.bind(this);
        this.setDisplayName = this.setDisplayName.bind(this);
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection("users").doc(user.uid).get().then((doc) => {
                    this.setState({
                        loading: false,
                        displayName: doc.data().displayName,
                        currentUser: user
                    });
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        });
    }

    handleDisplayName (event) {
        this.setState({
            displayName: event.target.value
        });
    }

    setDisplayName (event) {
        if (this.state.displayName !== "") {
            firebase.firestore().collection("users").doc(this.state.currentUser.uid).update({displayName: this.state.displayName});
            this.setState({
                displayNameError: ""
            });
        } else {
            this.setState({
                displayNameError: "Display Name cannot be blank."
            })
        }
    }

    render () {
        if (this.state.loading) {
            return (
                <a>Loading...</a>
            );
        } else if (this.state.currentUser === null) {
            return (
                <Redirect url="/SignIn"/>
            );
        }
        return (
            <div className="centered">
                <h1 style={{fontSize: "48px"}}>Profile</h1>
                <hr/>
                <p style={{width: "60%", margin: "auto"}}>
                    
                </p>
                <a style={{color: "red"}}>{this.state.displayNameError}</a>
                <br/>
                <a>Set Display Name: </a><input type="text" value={this.state.displayName} onChange={this.handleDisplayName}/>
                <br/>
                <button onClick={this.setDisplayName}>Set Display Name</button>
            </div>
        );
    }
}

class Redirect extends Component {
    constructor (props) {
        super(props);
        this.state = {
            url: this.props.url || ""
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