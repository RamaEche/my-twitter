import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";
import SectionHeader from "../templates/SectionHeader";
import ListsFeed from "../Organisms/ListsFeed";

import Title from "../../hocs/Title";

function Lists({ setTitle }) {
    const UserName ="user"
    setTitle(`Lists created by @${UserName} / Twitter`);
    return (
        <>
            <Section elements={[<SectionHeader title='Lists:'/>, <ListsFeed/>]}/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(Lists)