import React, { useState, useEffect, useContext } from 'react';

import UserContext from '../../contexts/UserContext'

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";
import SectionHeader from "../templates/SectionHeader";
import Feed from "../Organisms/Feed";

import Title from "../../hocs/Title";

function Lists({ setTitle }) {
    const [posts, setPosts] = useState([]);
    const [userIsReady, setUserIsReady] = useState(false);

    const {user, setUser} = useContext(UserContext);
    setTitle(`Lists / Twitter`);

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
                    if (userListsPosts[i] == AllPosts[j].PostId) {
                        currentListsPosts.push(AllPosts[j]);
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
        <>
            <Section elements={[<SectionHeader title='Lists:'/>, <Feed newPosts={posts} restPxHeight={64}/>]}/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(Lists)