import React, { Component } from 'react'
import { Firestore } from '../../api'

const db = Firestore;
export default class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            id: props.match.params.id,
            name: "",
            desc: ""
        }
    }
    
    componentDidMount () {
        db.collection("games").doc(this.state.id).get().then((documentSnapshot) => {
            const data = documentSnapshot.data();
            this.setState({
                name: data["name"],
                desc: data["desc"],
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
                    <h1>{this.state.name}</h1>
                    <p>{this.state.desc}</p>
                    <Downloads id={this.state.id}/>
                </div>
            );
        }
    }
}

class Downloads extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.id,
            name: "",
            platforms: []
        }
    }
    
    componentDidMount () {
        db.collection('games').doc(this.state.id).collection('platforms').get().then((querySnapshot) => {
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
                <div>
                    <h2>Downloads</h2>
                    <ul>
                        {this.state.platforms.map((platform) =>
                            <Platform key={platform.id} game={this.state.id} platform={platform}/>
                        )}
                    </ul>
                </div>
            );
        }
    }
}

class Platform extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            game: this.props.game,
            name: this.props.platform.data()["name"],
            versions: []
        }
    }

    componentDidMount () {
       this.props.platform.ref.collection('versions').get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc);
            });
            this.setState({
                versions: results,
                loading: false
            });
       })
    }

    render () {
        if (this.state.loading) {
            return (
                <a>Loading...</a>
            );
        } else {
            return (
                <li>
                    <h2><a href={this.state.game+"/"+this.state.name} target="_blank">{this.state.name}</a></h2>
                    <ul>
                        {this.state.versions.map((version) =>
                            <Version key={version.id} game={this.state.game} platform={this.state.name} version={version}/>
                        )}
                    </ul>
                </li>
            );
        }
    }
}

class Version extends Component {
    constructor (props) {
        super(props);
        this.state = {
            game: this.props.game,
            platform: this.props.platform,
            name: this.props.version.data()["name"]
        }
    }

    render () {
        return (
            <li>
                <a href={this.state.game+"/"+this.state.platform+"/"+this.state.name} target="_blank">{this.state.name}</a>
            </li>
        )
    }
}