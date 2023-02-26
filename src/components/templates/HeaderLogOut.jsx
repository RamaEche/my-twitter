import React, { useState, useEffect } from 'react'

import { GrTwitter } from "react-icons/gr";
import { BiHash } from "react-icons/bi";
import { RiSettings3Line } from "react-icons/ri";
import Button from '../atoms/Button'

function Header() {

    return (
        <header className="h-full mr-12">
            <nav className=' flex h-full flex-col justify-between'>
                <ul className=' list-none'>
                    <li><Button icon={<GrTwitter/>} href="/explore" color="twitter"/></li>
                    <li><Button icon={<BiHash/>} text="Explorar" href="/explore"/></li>
                    <li><Button icon={<RiSettings3Line/>} text="Configuracíon"/></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header