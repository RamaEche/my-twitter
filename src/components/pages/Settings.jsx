import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import ArticleSelector from "../templates/ArticleSelector";
import NotificationsFeed from "../Organisms/NotificationsFeed";
import SectionHeader from "../templates/SectionHeader";
import SettingsSelector from "../templates/SettingsSelector";

import AccountsSettings from "../templates/OptionsSettings/AccountsSettings";
import DisplaySettings from "../templates/OptionsSettings/DisplaySettings";
import ListsSettings from "../templates/OptionsSettings/ListsSettings";
import UserSettings from "../templates/OptionsSettings/UserSettings";

import Title from "../../hocs/Title";

function Notifications({ setTitle }) {
    setTitle("Settings / Twitter");
    const [settingSelection, setSettingSelection] = useState();

    useEffect(()=>{
        setSettingSelection("Your account");
    }, [])

    return (
        <>
            <ArticleSelector elements={[<SectionHeader title='Settings' border={false}/>, <SettingsSelector setSettingSelection={ setSettingSelection } settingSelection={settingSelection}/>]}/>
            <Section elements={[
            settingSelection == "Your account" ? <AccountsSettings/> :
            settingSelection == "User options" ? <UserSettings/> :
            settingSelection == "Lists options" ? <ListsSettings/> :
            settingSelection == "Display" ? <DisplaySettings/> :
            <></>]}/>
        </>
    )
}

export default Title(Notifications)