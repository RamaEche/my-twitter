import React, { useState, useContext } from 'react';

import TweetAlertContext from '../../contexts/TweetAlertContext'

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

    return (
        <>
            <TweetAlert className={showTweetAlert ? " visible" : " invisible"} close={()=>handleStateTweetAlert(false)}/>


            <Section elements={[<FeedSelector/>, <><TweetInput/><div className='w-full border-b-2 border-b-super-soft-black'></div></>, <ShowMoreTweets/>, <Feed/>]}/>
            <Article elements={[<SerchBar/>, <Conditions />]}/>
        </>
    )
}

export default Title(Home)