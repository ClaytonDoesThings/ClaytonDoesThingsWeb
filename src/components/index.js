import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Firebase as firebase } from '../api'
import Games from './games/'
import Game from './games/Game'
import GameFrame from './games/GameFrame'
import Shop from './shop'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import CreateUserDB from './auth/CreateUserDB'

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in");
                console.log(user);
                CreateUserDB(user);
                this.setState({
                    currentUser: user
                });
            }
        });
    }

    render () {
        return (
            <div>
                <ul id="navbar">
                    <li><Link className="clickable" to="/">Home</Link></li>
                    <li><Link className="clickable" to="/games">Games</Link></li>
                    <li><Link className="clickable" to="/shop">Shop</Link></li>
                    <li>{this.state.currentUser != null ? <Link className="clickable" to="/signOut">Sign Out</Link> : <Link className="clickable" to="/signIn">Sign In</Link>}</li>
                    <li>{this.state.currentUser != null ? <a>Signed In as: {this.state.currentUser["displayName"] || this.state.currentUser["email"]}</a> : null}</li>
                </ul>
                <div>
                    <Route path="/games" exact component={Games}/>
                    <Route path="/games/:id/:platform/:version/" exact component={GameFrame}/>
                    <Route path="/games/:id/:platform/" exact component={GameFrame}/>
                    <Route path="/games/:id/" exact component={Game}/>
                    <Route path="/shop" exact component={Shop}/>
                    <Route path="/signIn" exact component={SignIn}/>
                    <Route path="/signOut" exact component={SignOut}/>
                </div>
            </div>
        )
    }
}