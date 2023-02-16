import React, { useState, useEffect } from 'react';

import Section from "../templates/Section";
import Article from "../templates/Article";
import SerchBar from "../Organisms/SerchBar";
import Conditions from "../Organisms/Conditions";

import Title from "../../hocs/Title";

function Notifications({ setTitle }) {
    setTitle("Notifications / Twitter");
    return (
        <>
            <Section/>
            <Article elements={[<SerchBar />, <Conditions />]}/>
        </>
    )
}

export default Title(Notifications)