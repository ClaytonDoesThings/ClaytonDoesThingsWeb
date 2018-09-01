import React, { Component } from 'react'

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount () {

    }

    render () {
        return (
            <div class="centered">
                <h1 style={{fontSize: "48px"}}>Home</h1>
                <hr/>
                <p style={{width: "60%", margin: "auto"}}>
                    Hello, and welcome to the Clayton Does Things official website. Here, you will find games and software made by both me and some of my firends. In the future, you will be able to purchase 3D prints and merch from the store.
                    <br/><a href="https://www.youtube.com/channel/UChXdVQ8mm8UQBir87KaRgTQ">YouTube</a>
                </p>
            </div>
        );
    }
}