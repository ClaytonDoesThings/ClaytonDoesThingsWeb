import React, { Component } from 'react'
import { Firestore } from '../../api'

const db = Firestore;

export default class Blog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            posts: []
        }
    }

    componentDidMount () {
        let query = this.props.match.params.query !== undefined ? db.collection("blog").where("title", "==", this.props.match.params.query) : db.collection("blog");
        query.get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc);
            });
            this.setState({
                posts: results,
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
                        {this.state.posts.map((post) =>
                            <Post key={post.id} post={post}/>
                        )}
                    </ul>
                </div>
            );
        }
    }
}

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            contents: []
        };
    }

    componentDidMount () {
        this.props.post.ref.collection('contents').get().then((querySnapshot) => {
            var results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc);
            });
            this.setState({
                contents: results,
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
                    <h1><a style={{color: "#000000"}} href={"/blog/" + this.props.post.data()["title"]}>{this.props.post.data()["title"]}</a></h1>
                    <div>
                        {this.state.contents.map((content) =>
                            <Content key={content.id} content={content}/>
                        )}
                    </div>
                </div>
            );
        }
    }
}

class Content extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            content: <span>Failed to load content</span>
        };
    }

    componentDidMount () {
        let data = this.props.content.data();
        //console.log(data);
        let type = data.type;
        let result = <span>Failed to load content</span>;
        if (type === "text") {
            result = <span>{data.text}</span>;
        } else if (type === "link") {
            result = <a href={data.link}>{data.text}</a>;
        }
        this.setState({
            content: result,
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
                this.state.content
            );
        }
    }
}