import React, { Component } from 'react'
import classNames from 'classnames'
import styles from '../index.css'
import { Router, Route, Link } from 'react-router-dom';
import { Firebase as firebase } from '../api'
import Home from './Home'
import Games from './games/'
import Game from './games/Game'
import GameFrame from './games/GameFrame'
import Softwares from './software/'
import Software from './software/Software'
import SoftwareFrame from './software/SoftwareFrame'
import Shop from './shop'
import Blog from './blog'
import About from './About'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import CreateUserDB from './auth/CreateUserDB'
import Profile from './profile'
import config from '../config'
import ReactGA from 'react-ga';
ReactGA.initialize(config.trackingId);

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentUser: null,
            displayName: ""
        }
    }

    componentDidMount () {
        ReactGA.pageview(window.location.pathname + window.location.search);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in");
                //console.log(user);
                CreateUserDB(user);
                this.setState({
                    currentUser: user
                });
                firebase.firestore().collection("users").doc(user.uid).onSnapshot((doc) => {
                    this.setState({
                        displayName: doc.data().displayName
                    });
                });
            }
        });
    }

    componentDidUpdate () {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render () {
        return (
            <div>
                {this.props.history}
                <ul id="navbar">
                    <li><Link className="clickable" to="/">Home</Link></li>
                    <li><Link className="clickable" to="/games">Games</Link></li>
                    <li><Link className="clickable" to="/software">Software</Link></li>
                    {/* <li><Link className="clickable" to="/shop">Shop</Link></li> */}
                    <li><Link className="clickable" to="/blog">Blog</Link></li>
                    <li><Link className="clickable" to="/about">About</Link></li>
                    <li>{this.state.currentUser != null ? <Link className="clickable" to="/signOut">Sign Out</Link> : <Link className="clickable" to="/signIn">Sign In</Link>}</li>
                    <li>{this.state.currentUser != null ? <Link className="clickable" to="/profile">Signed In as: {this.state.displayName}</Link> : null}</li>
                    <li style={{float: "right"}}><a className={classNames("clickable", "img")} href="https://github.com/ClaytonDoesThings/ClaytonDoesThingsWeb"><img alt="GitHub" src="https://image.flaticon.com/icons/svg/25/25231.svg" height="42" style={{filter: "invert(100%)"}}/></a></li>
                    <li style={{float: "right"}}><a className={classNames("clickable", "img")} href="https://www.patreon.com/ClaytonDoesThings"><img alt="Patreon" src="https://i1.wp.com/www.jcourseywillis.com/wp-content/uploads/2016/10/patreon_logo_black.png?fit=300%2C300&ssl=1" height="42" style={{filter: "invert(100%)"}}/></a></li>
                    <li style={{float: "right"}}><a className={classNames("clickable", "img")} href="https://discordapp.com/invite/nSGT8BJ"><img alt="Discord" src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png" height="42" style={{filter: "invert(100%)"}}/></a></li>
                    <li style={{float: "right"}}><a className={classNames("clickable", "img")} href="https://www.youtube.com/channel/UChXdVQ8mm8UQBir87KaRgTQ"><img alt="YouTube" src="https://image.flaticon.com/icons/png/512/25/25178.png" height="42" style={{filter: "invert(100%)"}}/></a></li>
                </ul>
                <div>
                    <Route path="/" exact component={Home}/>
                    <Route path="/games" exact component={Games}/>
                    <Route path="/games/:id/:platform/:version/" exact component={GameFrame}/>
                    <Route path="/games/:id/:platform/" exact component={GameFrame}/>
                    <Route path="/games/:id/" exact component={Game}/>
                    <Route path="/software" exact component={Softwares}/>
                    <Route path="/software/:id/:platform/:version/" exact component={SoftwareFrame}/>
                    <Route path="/software/:id/:platform/" exact component={SoftwareFrame}/>
                    <Route path="/software/:id/" exact component={Software}/>
                    {/* <Route path="/shop" exact component={Shop}/> */}
                    <Route path="/blog" exact component={Blog}/>
                    <Route path="/blog/:query" exact component={Blog}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/signIn" exact component={SignIn}/>
                    <Route path="/signOut" exact component={SignOut}/>
                    <Route path="/profile" exact component={Profile}/>
                </div>
            </div>
        )
    }
}