import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Media from "../Organisms/Media";
import Conditions from "../Organisms/Conditions";

import Title from "../../hocs/Title";

function User({ setTitle }) {
    const userName = "User";
    const userAllName = "User User";
    setTitle(`${userAllName} (@${userName}) / Twitter`);
    return (
        <>
            <Section />
            <Article elements={[<SerchBar />, <Media/>, <Conditions />]}/>
        </>
    )
}

export default Title(User)