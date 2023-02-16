import React, { useState, useEffect } from 'react';

import Section from "./Section";
import Article from "./Article";
import Conditions from "../Organisms/Conditions";

import Title from "../../hocs/Title";

function Explore({ setTitle }) {
    setTitle("Explore / Twitter");

    return <><Section /><Article elements={[<Conditions/>]} /></>
}

export default Title(Explore)