import React, { Component } from 'react'
import { Firebase as firebase } from '../../api'

const db = firebase.firestore();

export default class Software extends Component {
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
        db.collection("softwares").doc(this.state.id).get().then((documentSnapshot) => {
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
                <div className="centered">
                    <h1 style={{fontSize: '48px', margin: '4px'}}>{this.state.name}</h1>
                    <h2 style={{fontSize: '32px', margin: '4px'}}>Authors</h2>
                    <Authors id={this.state.id}/>
                    <p style={{fontSize: '22px', margin: '4px'}}>{this.state.desc}</p>
                    <Downloads id={this.state.id}/>
                </div>
            );
        }
    }
}

class Authors extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            authors: []
        }
    }

    componentDidMount () {
        db.collection('softwares').doc(this.props.id).collection('authors').get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data()["UID"]);
            })
            this.setState({
                loading: false,
                authors: results
            });
        });
    }

    render () {
        if (this.state.loading) {
            return(
                <a>Loading...</a>
            );
        } else {
            return (
                <ul className="horizontalbar-centered">
                    {this.state.authors.map((author) =>
                        <Author key={author} author={author}/>
                    )}
                </ul>
            );
        }
    }
}

class Author extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            displayName: ""
        }
    }

    componentDidMount () {
        db.collection('users').doc(this.props.author).get().then((documentSnapshot) => {
            this.setState({
                loading: false,
                displayName: documentSnapshot.data()["displayName"]
            })
        })
    }

    render () {
        if (this.state.loading) {
            return (
                <a>Loading...</a>
            );
        } else {
            return (
                <li><a style={{fontSize: '24px', margin: '4px'}}>{this.state.displayName}</a></li>
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
        db.collection('softwares').doc(this.state.id).collection('platforms').get().then((querySnapshot) => {
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
                    <hr/>
                    <h2 style={{fontSize: '32px', margin: '4px'}}>Downloads</h2>
                    <ul className="horizontalbar-centered">
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
                    <h2><a style={{fontSize: '28px', margin: '4px', padding: "0px 0px"}} href={'/software/'+this.state.game+"/"+this.state.name+'/'} target="_blank">{this.state.name}</a></h2>
                    <ul className="horizontalbar-centered">
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
                <a style={{fontSize: '24px', margin: '4px', padding: "0px 0px"}} href={'/software/'+this.state.game+"/"+this.state.platform+"/"+this.state.name+'/'} target="_blank">{this.state.name}</a>
            </li>
        )
    }
}