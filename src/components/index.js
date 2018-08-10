import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Firebase as firebase } from '../api'
import Games from './games/'
import Game from './games/Game'
import GameFrame from './games/GameFrame'
import Shop from './shop'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'

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
                this.setState({
                    currentUser: user
                });
            }
        });
    }

    render () {
        return (
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <br/>
                    <Link to="/games">Games</Link>
                    <br/>
                    <Link to="/shop">Shop</Link>
                    {this.state.currentUser != null ? <div><Link to="/signOut">Sign Out</Link><br/><a>Signed In as: {this.state.currentUser["displayName"]}</a></div> : <Link to="/signIn">Sign In</Link>}
                </nav>
                <div>
                    <Route path="/games" exact component={Games}/>
                    <Route path="/games/:id/:platform/:version" exact component={GameFrame}/>
                    <Route path="/games/:id/:platform" exact component={GameFrame}/>
                    <Route path="/games/:id" exact component={Game}/>
                    <Route path="/shop" exact component={Shop}/>
                    <Route path="/signIn" exact component={SignIn}/>
                    <Route path="/signOut" exact component={SignOut}/>
                </div>
            </div>
        )
    }
}