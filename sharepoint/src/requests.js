const fetch =  require("node-fetch")


async function getPosts(){
    const res = await fetch("http://localhost:3000/posts");
    resJSON = await res.json();
    // console.log(resJSON)
    return resJSON;
};
getPosts();

async function newPost(body){
    const res = await fetch("http://localhost:3000/posts/new",{
        method: "POST",
        body: JSON.stringify(body)
    });
    resJSON = await res.json();
    return resJSON;
};