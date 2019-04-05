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
        db.collection('games').orderBy("name", "desc").get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.unshift(doc);
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
                <div>
                    <span>Loading...</span>
                    <div>
                        <ul class="horizontalbar">
                            <li><a href="/games/2HbTB1akfOrcKvPc3klU/">Arc 2</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/2HbTB1akfOrcKvPc3klU/Web/" target="_blank" rel="noopener noreferrer">Web</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                        <ul class="horizontalbar">
                            <li><a href="/games/Kjwl3N49rt3JHO9wQumj/">The Giver - The Game</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/Kjwl3N49rt3JHO9wQumj/Linux64/" target="_blank" rel="noopener noreferrer">Linux64</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                            <li><a href="/games/Kjwl3N49rt3JHO9wQumj/Web/" target="_blank" rel="noopener noreferrer">Web</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                            <li><a href="/games/Kjwl3N49rt3JHO9wQumj/Windows32/" target="_blank" rel="noopener noreferrer">Windows32</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                            <li><a href="/games/Kjwl3N49rt3JHO9wQumj/Windows64/" target="_blank" rel="noopener noreferrer">Windows64</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                        <ul class="horizontalbar">
                            <li><a href="/games/NoeJACBZ7L6GPyxaiV2o/">Tetris</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/NoeJACBZ7L6GPyxaiV2o/Web/" target="_blank" rel="noopener noreferrer">Web</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                        <ul class="horizontalbar">
                            <li><a href="/games/Zi1l6UGwnqyZhAEKkekH/">Dig It</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/Zi1l6UGwnqyZhAEKkekH/Windows/" target="_blank" rel="noopener noreferrer">Windows</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                        <ul class="horizontalbar">
                            <li><a href="/games/ZmEAX6ahcJmtPne2cJT5/">Russian Roulette</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/ZmEAX6ahcJmtPne2cJT5/Web/" target="_blank" rel="noopener noreferrer">Web</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                        <ul class="horizontalbar">
                            <li><a href="/games/cFCb44HSul7ydovmyqm0/">Demonic Conquest</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/cFCb44HSul7ydovmyqm0/Web/" target="_blank" rel="noopener noreferrer">Web</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                            <li><a href="/games/cFCb44HSul7ydovmyqm0/Windows/" target="_blank" rel="noopener noreferrer">Windows</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                            <li><a href="/games/cFCb44HSul7ydovmyqm0/Mac/" target="_blank" rel="noopener noreferrer">Mac</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                            <li><a href="/games/cFCb44HSul7ydovmyqm0/Linux/" target="_blank" rel="noopener noreferrer">Linux</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                        <ul class="horizontalbar">
                            <li><a href="/games/othcXgpI9PNqBt3aY5AX/">ARC PLAT</a></li>
                            <li><span id="vertical-line">|</span></li>
                            <li><span>platforms:</span></li>
                            <li><a href="/games/othcXgpI9PNqBt3aY5AX/Web/" target="_blank" rel="noopener noreferrer">Web</a></li>
                            <li><span style={{opacity: 0}}>|</span></li>
                        </ul>
                    </div>
                </div>
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
                <span>Loading...</span>
            );
        } else {
            return (
                <ul className="horizontalbar">
                    <li><a href={'/games/'+this.state.key+'/'}>{this.state.name}</a></li>
                    <li><span id="vertical-line">|</span></li>
                    <li><span>platforms:</span></li>
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
        return ([
            <li>
                <a href={"/games/"+this.props.game+"/"+this.state.name+"/"} target="_blank" rel="noopener noreferrer">{this.state.name}</a>
            </li>,
            <li>
                <span style={{opacity: 0}}>|</span>
            </li>
        ])
    }
}