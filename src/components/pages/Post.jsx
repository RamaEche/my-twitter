import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";
import SectionHeader from "../templates/SectionHeader";

import Title from "../../hocs/Title";
import TweetInput from '../Organisms/TweetInput';
import Feed from '../Organisms/Feed';
import TweetViewer from '../Organisms/TweetViewer';

function Post({ setTitle }) {
    setTitle("Notifications / Twitter");
    return (
        <>
            <Section elements={[<SectionHeader title='Tweet' back={true}/>,
                                <TweetViewer id=""/>,
                                <TweetInput/>,
                                <Feed/>]}/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(Post)