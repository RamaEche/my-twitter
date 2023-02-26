import React, { useState, useEffect, useContext } from 'react';

import Post from '../molecules/Post';
import UserContext from '../../contexts/UserContext'
import { BreakingChangeType } from 'graphql';

function ListsFeed() {
    const [posts, setPosts] = useState([]);
    const [userIsReady, setUserIsReady] = useState(false);

    const {user, setUser} = useContext(UserContext);

    useEffect(()=>{
        const getPosts = async ()=>{
            let userListsPosts = []
            let AllPosts = []
            let currentListsPosts = []
            
            await fetch(`http://localhost:3000/users/${user.id}`)
            .then(response => response.json())
            .then(info=>{
                setUser(info);
                userListsPosts = info.content.lists;
            })
    
            await fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(info=>{
                let currentPosts = []
                for (let i = 0; i < info.length; i++) {
                    for (let j = 0; j < info[i].content.posts.length; j++) {
                        currentPosts.push(info[i].content.posts[j]);
                    }
                }
                AllPosts = currentPosts;
            })
    
            for (let i = 0; i < userListsPosts.length; i++) {
                for (let j = 0; j < AllPosts.length; j++) {
                    console.log(AllPosts)
                    if (AllPosts[userListsPosts[i]].PostId == AllPosts[j].PostId) {
                        currentListsPosts.push(AllPosts[i]);
                        break;
                    }
                }
            }
            setPosts(currentListsPosts);
        }
    
        if(userIsReady){
            getPosts()
        }
    },[userIsReady])

    useEffect(()=>{
        if(user && !userIsReady){
            setUserIsReady(true)
        }
    },[user])

    return (
        <div>
            {posts !== undefined && posts.map((currentArrayData, index) => (
                <div key={index}>
                <Post
                    img={currentArrayData.img}
                    userAllName={currentArrayData.allUserName}
                    tag={"@" + currentArrayData.username}
                    date={currentArrayData.date}
                    content={currentArrayData.content}
                />
                </div>
            ))
            }
        </div>
    )
}

export default ListsFeed