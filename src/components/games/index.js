import React, { Component } from 'react'
import { Firestore } from '../../api'

const db = Firestore;

export default class Games extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            games: []
        }
    }

    componentDidMount () {
        document.title = "Clayton Does Things - Games";
        db.collection('games').get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc);
            });
            this.setState({
                games: results,
                loading: false
            });
        });
    }

    render () {
        if (this.state.loading) {
            return (
                <a>Loading...</a>
            );
        } else {
            return (
                <div>
                    <h1>Games</h1>
                    <div>
                        {this.state.games.map((game) =>
                            <Game key={game.id} game={game}/>
                        )}
                    </div>
                </div>
            );
        }
    }
}

class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            name: "",
            key: "",
            platforms: []
        };
    }

    componentDidMount () {
        this.setState({
            name: this.props.game.data()["name"],
            key: this.props.game.id
        })
        this.props.game.ref.collection('platforms').get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc);
            });
            this.setState({
                platforms: results,
                loading: false
            });
        });
    }

    render () {
        if (this.state.loading) {
            return (
                <a>Loading...</a>
            );
        } else {
            return (
                <ul className="horizontalbar">
                    <li><a className="clickable" href={'/games/'+this.state.key+'/'}>{this.state.name}</a></li>
                    <li><a id="vertical-line">|</a></li>
                    <li><a>platforms:</a></li>
                    {this.state.platforms.map((platform) =>
                        <Platform key={platform.id} game={this.state.key} platform={platform}/>
                    )}
                </ul>
            )
        }
    }
}

class Platform extends Component {
    constructor (props) {
       super(props);
       this.state = {
           name: this.props.platform.data()["name"]
       };
    }

    render () {
        return (
            <li>
                <a className="clickable" href={"/games/"+this.props.game+"/"+this.state.name+"/"}>{this.state.name}</a>
            </li>
        )
    }
}