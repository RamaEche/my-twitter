import React, {useContext} from 'react';


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
    return (
        <>
            <Section elements={[<FeedSelector/>, <TweetInput/>, <ShowMoreTweets/>,<Feed/>]}/>
            <Article elements={[<SerchBar/>, <Conditions />]}/>
        </>
    )
}

export default Title(Home)