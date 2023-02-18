import React, { useState, useContext, useEffect } from 'react';

import TweetAlertContext from '../../contexts/TweetAlertContext'
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
import TweetAlert from "../templates/TweetAlert";

import Title from "../../hocs/Title";
    
function Home({ setTitle }) {
    setTitle("Home / Twitter");
    const {showTweetAlert, setShowTweetAlert, handleStateTweetAlert} = useContext(TweetAlertContext);
    const [newNosts, setNewNosts] = useState();
    const {user, setUser} = useContext(UserContext)
    const [feedState, setFeedState] = useState('forYou');

    useEffect(()=>{
        if(feedState == 'forYou'){
            GetNewForYouPosts();
        }else if(feedState == 'following'){
            GetNewFollowingPosts();
        }else{
            console.log('error, this feed doesnt exist');
        }
    }, [feedState]);

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
            if (newNosts !== currentPosts) {
                setNewNosts(currentPosts);
            }
        })
    }

    const GetNewFollowingPosts= ()=>{ //posts from users that the user follow
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then(info=>{
            let currentPosts = []
            for (let i = 0; i < info.Following.length; i++) {
                fetch(`http://localhost:3000/users/${info.Following[i]}`)
                .then(response => response.json())
                .then(infoFromCurentUser=>{
                    for (let i = 0; i < infoFromCurentUser.content.posts.length; i++) {
                        currentPosts.push(infoFromCurentUser.content.posts[i]);
                    }
                })
            }
            if (newNosts !== currentPosts) {
                setNewNosts(currentPosts);
            }
        })
    }

    return (
        <>
            <TweetAlert className={showTweetAlert ? " visible" : " invisible"} close={()=>handleStateTweetAlert(false)}/>

            <Section elements={[<FeedSelector feedState={feedState} setFeedState={state=>setFeedState(state)} newNosts={newNosts}/>, <><TweetInput/><div className='w-full border-b-2 border-b-super-soft-black'></div></>, <ShowMoreTweets/>, <Feed feedState={feedState} newNosts={newNosts}/>]}/>
            <Article elements={[<SerchBar/>, <Conditions />]}/>
        </>
    )
}

export default Title(Home)