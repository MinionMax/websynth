import React, { useEffect, useState } from "react";
import "./App.css";

function Posts(){

	const [list, setList] = useState(true);
	const [single, setSingle] = useState(false);
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({});
	
	useEffect(() => {
		fetch("http://localhost:3000/posts")
		.then(response => response.json())
		.then(responseJSON => setPosts(responseJSON));
	});

	const getPost = ((id) =>{
		fetch(`http://localhost:3000/posts/${id}`)
			.then(response => response.json())
			.then(responseJSON => setPost(responseJSON));
		setSingle(true);
	});

	const getList = (() => {
		setSingle(false);
		setList(true);
	});

	return(
		<div className="container">
			{ list ? (
				<div className="list-group">
					{ posts.map(post => (
						<li
							onClick={() => getPost(post.id)}
							className="list-group-item, list-group-item-action"
						>
							{post.title}
						</li>
					))}
				</div>
			) : null}
			{ single ? (
				<div class="post" style={{ width: "18rem"}}>
					<div class="post-body">
						<h5 class="post-title">{ post.title}</h5>
						<p class="post-content">{ post.content}</p>
						<div onClick={() => getList()} class="btn btn-primary">
							back
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Posts;