import React, { useState, useContext, useEffect } from 'react';

import UserContext from '../../contexts/UserContext'

import Post from '../molecules/Post'
import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";
import FeedSelector from "../Organisms/FeedSelector";
import TweetInput from "../Organisms/TweetInput";
import ShowMoreTweets from "../Organisms/ShowMoreTweets";
import Feed from "../Organisms/Feed";

import Title from "../../hocs/Title";
    
function Home({ setTitle }) {
    setTitle("Home / Twitter");

    const [newPosts, setNewPosts] = useState();
    const {user, setUser} = useContext(UserContext)
    const [feedState, setFeedState] = useState('forYou');

    useEffect(()=>{
        ShowNewPosts();
    }, [feedState]);

    const ShowNewPosts = ()=>{
        if(feedState == 'forYou'){
            GetNewForYouPosts();
        }else if(feedState == 'following'){
            GetNewFollowingPosts();
        }else{
            console.log('error, this feed doesnt exist');
        }
    }

    const GetNewForYouPosts= ()=>{  //all posts in twitter
        fetch(`http://localhost:3000/users`)
        .then(response => response.json())
        .then(info=>{
            let currentPosts = []
            for (let i = 0; i < info.length; i++) {
                for (let j = 0; j < info[i].content.posts.length; j++) {
                    currentPosts.push(info[i].content.posts[j]);
                }
            }
            if (newPosts !== currentPosts) {
                setNewPosts(currentPosts);
            }
        })
    }

    const GetNewFollowingPosts= async()=>{ //posts from users that the user follow
        let followingIds = []
        await fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then(info=>{
            followingIds = info.Following;
        })
        
        let currentPosts = []
        for (let i = 0; i < followingIds.length; i++) {
            await fetch(`http://localhost:3000/users/${followingIds[i]}`)
            .then(response => response.json())
            .then(infoFromCurentUser=>{
                for (let i = 0; i < infoFromCurentUser.content.posts.length; i++) {
                    currentPosts.push(infoFromCurentUser.content.posts[i]);
                }
            })
        }
        if (newPosts !== currentPosts) {
            setNewPosts(currentPosts);
        }
    }

    return (
        <>
            <Section elements={[
                <FeedSelector feedState={feedState} setFeedState={state=>setFeedState(state)} newPosts={newPosts}/>,
                <TweetInput/>,
                <div className='w-full border-b-2 border-b-super-soft-black'></div>,
                <ShowMoreTweets ShowNewPosts={ShowNewPosts}/>,
                <Feed feedState={feedState} newPosts={newPosts}/>]}/>
            <Article elements={[<SerchBar/>, <Conditions />]}/>
        </>
    )
}

export default Title(Home)