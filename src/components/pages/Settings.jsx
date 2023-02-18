import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import ArticleSelector from "../templates/ArticleSelector";
import NotificationsFeed from "../Organisms/NotificationsFeed";
import SectionHeader from "../templates/SectionHeader";
import SettingsSelector from "../templates/SettingsSelector";

import Title from "../../hocs/Title";

function Notifications({ setTitle }) {
    setTitle("Settings / Twitter");
    return (
        <>
            <ArticleSelector elements={[<SectionHeader title='Settings' border={false}/>, <SettingsSelector/>]}/>
            <Section elements={[<SectionHeader title='Notifications'/>, <NotificationsFeed/>]}/>
        </>
    )
}

export default Title(Notifications)