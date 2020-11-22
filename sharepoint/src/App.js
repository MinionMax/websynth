import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
	constructor(props) {
		super();
		this.state = {
			list: true,
			single: false,
			posts: [],
			post: {}
		};
	};

	componentDidMount() {
		fetch("http://localhost:3000/posts")
			.then(response => response.json())
			.then(responseJSON => {
				this.setState({ posts: responseJSON});
			});
	};

	getPost(id){
		fetch(`http://localhost:3000/posts/${id}`)
			.then(response => response.json())
			.then(responseJSON => {
				this.setState({ post: responseJSON});
			});
	};

	getList(){
		this.setState({
			single: false,
			list: true
		});
	};

	render(){
		return(
			<div className="container">
				{this.state.list ? (
					<div className="list-group">
						{this.state.posts.map(post => (
							<li
								onClick={() => this.getPost(post.id)}
								className="list-group-item, list-group-item-action"
							>
								{post.title}
							</li>
						))}
					</div>
				) : null}
				{this.state.single ? (
					<div class="post" style={{ width: "18rem"}}>
						<div class="post-body">
							<h5 class="post-title">{this.state.post.title}</h5>
							<p class="post-content">{this.state.post.content}</p>
							<div onClick={() => this.getList()} class="btn btn-primary">
								back
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	};
};