import React, { Component } from 'react'
import { Firestore } from '../../api'

const db = Firestore;

export default class Videos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            categories: []
        }
    }

    componentDidMount () {
        db.collection("videos").get().then((querySnapshot) => {
            let categories = {};
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                if (categories[data.category] === undefined) {
                    categories[data.category] = {};
                    categories[data.category].channels = [];
                    categories[data.category].name = data.category;
                }
                categories[data.category].channels.push(data);
            });
            let _categories = [];
            for (var category in categories) {
                _categories.push(categories[category]);
            }
            console.log(_categories);
            this.setState({
                categories: _categories,
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
                    {this.state.categories.map((category) =>
                        <Category key={category.name} category={category}/>
                    )}
                </div>
            );
        }
    }
}

class Category extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount () {
        this.setState({
            loading: false
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
                    <h1>{this.props.category.name}</h1>
                    <ul>
                        {this.props.category.channels.map((channel) =>
                            <Channel key={channel.name} channel={channel}/>
                        )}
                    </ul>
                </div>
            )
        }
    }
}

class Channel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount () {
        this.setState({
            loading: false
        });
    }

    render () {
        let channel = this.props.channel;
        if (this.state.loading) {
            return (
                <span>Loading...</span>
            );
        } else {
            return (
                <div>
                    <a href={channel.url}>{channel.name}</a>
                </div>
            )
        }
    }
}