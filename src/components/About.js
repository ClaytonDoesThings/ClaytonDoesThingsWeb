import React, { Component } from 'react'

export default class About extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount () {

    }

    render () {
        return (
            <div className="centered">
                <h1 style={{fontSize: "48px"}}>Home</h1>
                <hr/>
                <p style={{width: "60%", margin: "auto"}}>
                    This website was made in a solo endeavor by Clayton Hickey. Clayton Does Things is not a real company, however, we(I) strive to make the best content I can for everyone else's use and enjoyment. I'm currently working getting more people involved. As some of you may've noticed, one of the games is not made by me. It was made by one of my good friends (I won't state his name here as I've not asked permission to do so currently) and is called <a href="/games/othcXgpI9PNqBt3aY5AX/">ARC PLAT</a>. He made this game himself and while it may not be the best game it is probably the best game on this site.
                    <br/><a href="https://www.youtube.com/channel/UChXdVQ8mm8UQBir87KaRgTQ">The main channel: YouTube</a>
                    <br/><a href="https://discordapp.com/invite/nSGT8BJ">Join the talk: Discord</a>
                    <br/><a href="https://www.patreon.com/ClaytonDoesThings">Help support development: Patreon</a>
                    <br/><a href="https://github.com/ClaytonDoesThings/ClaytonDoesThingsWeb">Do the development: GitHub</a>
                </p>
            </div>
        );
    }
}