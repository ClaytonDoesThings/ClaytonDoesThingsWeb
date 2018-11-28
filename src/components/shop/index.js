import React, { Component } from 'react'
import { Firestore } from '../../api'

const db = Firestore;

export default class Games extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        db.collection("shop").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data);
            });
            this.setState({
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
                <div>
                    <ul>
                        {}
                    </ul>
                </div>
            );
        }
    }
}