import React, { Component } from 'react'
import { Firestore } from '../../api'
import Iframe from 'react-iframe'

const db = Firestore;

export default class GameFrame extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            id: props.match.params.id,
            platform: props.match.params.platform,
            version: props.match.params.version || "-1",
            url: ""
        }
    }

    componentDidMount () {
        console.log(this.state.platform);
        console.log(this.state.version);
        db.collection('games').doc(this.state.id).collection('platforms').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data()["name"] === this.state.platform) {
                    doc.ref.collection("versions").orderBy("name").get().then((querySnapshot) => {
                        var results = [];
                        querySnapshot.forEach((doc) => {
                            if (this.state.version === "-1") {
                                results.push(doc);
                            } else if (doc.data()["name"] === this.state.version) {
                                results.push(doc);
                            }
                        });
                        this.setState({
                            url: results.length > 0 ? results[results.length-1].data()["reference"] : "",
                            loading: false
                        });
                    });
                }
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
                    {this.state.platform === "Web" ? <Iframe url={this.state.url} allowFullScreen/> : <Redirect url={this.state.url}/>}
                </div>
            )
        }
    }
}

class Redirect extends Component {
    constructor (props) {
        super(props);
        this.state = {
            url: this.props.url || ""
        }
    }

    componentDidMount () {
        console.log(this.state.url);
        var blocked = true;
        while (blocked) {
            var newWin = window.open(this.state.url);
            if(!newWin || newWin.closed || typeof newWin.closed==='undefined') { 
                alert("Please unblock popups");
            } else {
                blocked = false;
            }
        }
        window.close();
    }

    render () {
        return (
            <a>Redirecting...</a>
        )
    }
}