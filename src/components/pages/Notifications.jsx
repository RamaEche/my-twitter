import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";
import NotificationsFeed from "../Organisms/NotificationsFeed";
import SectionHeader from "../templates/SectionHeader";

import Title from "../../hocs/Title";

function Notifications({ setTitle }) {
    setTitle("Notifications / Twitter");
    return (
        <>
            <Section elements={[<SectionHeader title='Notifications'/>, <NotificationsFeed/>]}/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(Notifications)