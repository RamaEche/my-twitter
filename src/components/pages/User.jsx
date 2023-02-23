import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Section from "../templates/Section";
import Article from "../templates/Article";
import UserProfile from "../templates/UserProfile";
import SectionHeader from "../templates/SectionHeader";
import SerchBar from "../Organisms/SerchBar";
import Feed from "../Organisms/Feed";
import Conditions from "../Organisms/Conditions";

import Title from "../../hocs/Title";

function User({ setTitle }) {
    const { user } = useParams()
    const [userId, setUserId] = useState(null)

    const [currentType, setCurrentType] = useState()
    const [buttonSelected, setButtonSelected] = useState("Tweets")
    const [posts, setPosts] = useState([])
    const [fullName, setFullName] = useState("This account doesn't exist")

    const userName = "User";
    const userAllName = "User User";
    setTitle(`${userAllName} (@${userName}) / Twitter`);

    useEffect(()=>{
        const getUserId = async()=>{
            await fetch(`http://localhost:3000/accounts`)
            .then(response => response.json())
            .then(info=>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == user) {
                        setUserId(info[i].userId)
                    }
                }
            })
        }
        getUserId();
    }, [])

    useEffect(()=>{
        chaneFeed("Tweets");
    }, [userId])

    const chaneFeed = type =>{
        if (currentType == type){
            return null;
        }
        if(userId == null){
            setCurrentType(null);
            setButtonSelected(null)
            return;
        }
        switch (type) {
            case "Tweets":
                setCurrentType("Tweets");
                setButtonSelected("Tweets");
                ShowTweetsFeed();
                break;
            case "Tweets & replies":
                setCurrentType("Tweets & replies");
                setButtonSelected("Tweets & replies");
                ShowTweetsAndRepliesFeed();
                break;
            case "Media":
                setCurrentType("Media");
                setButtonSelected("Media");
                ShowMediaFeed();
                break;
            case "Likes":
                setCurrentType("Likes");
                setButtonSelected("Likes");
                ShowLikesFeed();
                break;
            default:
                console.log("Error");
                break;
        }
    }

    const ShowTweetsFeed = async ()=>{ // Only user tweets
        let currentPosts = [];

        await fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(info=>{
            setFullName(info.userAllName);
            currentPosts = info.content.posts;
        })

        setPosts(currentPosts);
    }
    
    const ShowTweetsAndRepliesFeed = async ()=>{ // User tweets, user comments and retweets
        let currentPosts = [];
        let ReTweetedPosts = [];

        await fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(info=>{
            currentPosts = info.content.posts;
            ReTweetedPosts = info.content.reTweetedPosts;
        })

        await fetch(`http://localhost:3000/users/`)
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < ReTweetedPosts.length; i++) {
                for (let j = 0; j < info.length; j++) {
                    if (info[j].id == ReTweetedPosts[i].userId) {
                        for (let k = 0; k < info[j].content.posts.length; k++) {
                            if (info[j].content.posts[k].PostId == ReTweetedPosts[i].PostId) {
                                currentPosts.push(info[j].content.posts[k]);
                            }
                        }       
                    }
                }
            }
        })

        setPosts(currentPosts);
    }
    
    const ShowMediaFeed = async ()=>{ // All user tweets who have media(images)
        let currentPosts = [];

        await fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < info.content.posts.length; i++) {
                if (info.content.posts[i].contentImage != null) {
                    currentPosts.push(info.content.posts[i]);
                }                
            }
            
        })

        setPosts(currentPosts);
    }

    const ShowLikesFeed = async ()=>{ // All posts that user been liked
        let currentPosts = [];
        let Likes = [];

        await fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(info=>{
            Likes = info.content.likes;
        })

        await fetch(`http://localhost:3000/users/`)
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < Likes.length; i++) {
                for (let j = 0; j < info.length; j++) {
                    if (info[j].id == Likes[i].userId) {
                        for (let k = 0; k < info[j].content.posts.length; k++) {
                            if (info[j].content.posts[k].PostId == Likes[i].PostId) {
                                currentPosts.push(info[j].content.posts[k]);
                            }
                        }       
                    }
                }
            }
        })

        setPosts(currentPosts);
    }

    return (
        <>
            <Section elements={[<SectionHeader title={fullName}/>,
            <UserProfile buttonSelected={buttonSelected} chaneFeed={chaneFeed}/>,
            <Feed newPosts={ posts }/>]}/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(User)