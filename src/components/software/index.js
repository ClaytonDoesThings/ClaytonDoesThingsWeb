import React, { Component } from 'react'
import { Firestore } from '../../api'

const db = Firestore;

export default class Games extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            softwares: []
        }
    }

    componentDidMount () {
        document.title = "Clayton Does Things - Software";
        db.collection('softwares').get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc);
            });
            this.setState({
                softwares: results,
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
                    <h1>Software</h1>
                    <div>
                        {this.state.softwares.map((software) =>
                            <Software key={software.id} software={software}/>
                        )}
                    </div>
                </div>
            );
        }
    }
}

class Software extends Component {
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
            name: this.props.software.data()["name"],
            key: this.props.software.id
        })
        this.props.software.ref.collection('platforms').get().then((querySnapshot) => {
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
                    <li><a className="clickable" href={'/software/'+this.state.key+'/'}>{this.state.name}</a></li>
                    <li><a id="vertical-line">|</a></li>
                    <li><a>platforms:</a></li>
                    {this.state.platforms.map((platform) =>
                        <Platform key={platform.id} software={this.state.key} platform={platform}/>
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
                <a className="clickable" href={'/software/'+this.props.software+'/'+this.state.name+'/'}>{this.state.name}</a>
            </li>
        )
    }
}