import React, {useContext, useState, useEffect} from 'react';
import Post from '../molecules/Post'
import UserContext from '../../contexts/UserContext'

function Feed() {
    const {user, setUser} = useContext(UserContext)
    const {posts, setPosts} = useState();

    const GetNewPost= ()=>{
     if (user) {
      fetch(`http://localhost:3000/users/${user.id}`)
      .then(response => response.json())
      .then(info=>{
        setPosts(info.content.posts);
      })
     }
    }

    useEffect(()=>{
        GetNewPost();
    }, [user]);

    return (
      <div className=' flex flex-col h-screen overflow-auto scrollbar-none'>
      </div>
    );
}

export default Feed