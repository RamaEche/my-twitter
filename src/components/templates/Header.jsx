import React, { useState, useContext, useEffect } from 'react'

import { GrTwitter } from "react-icons/gr";
import { AiOutlineHome, AiFillHome, AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { RiNotification2Line, RiNotification2Fill, RiFileListLine, RiFileListFill, RiSettings3Line } from "react-icons/ri";
import { BsBookmarks, BsBookmarksFill, BsPerson } from "react-icons/bs";
import { TbDatabase } from "react-icons/tb";
import Button from '../atoms/Button'

function Header() {
    return (
        <header className="h-full mr-12">
            <nav className=' flex h-full flex-col justify-between'>
                <ul className=' list-none'>
                    <li><Button icon={<GrTwitter/>} href="/home"/></li>
                    <li><Button icon={<AiOutlineHome/>} text="Inicio" href="/home"/></li>
                    <li><Button icon={<RiNotification2Line/>} text="Notificaciones" href="/notifications"/></li>
                    <li><Button icon={<RiFileListLine/>} text="Listas" href="/:user/lists"/></li>
                    <li><Button icon={<BsPerson/>} text="Perfil" href="/:user"/></li>
                    <li><Button icon={<RiSettings3Line/>} text="Mas opciones"/></li>
                    <li><Button text="Twittear" bold={true}/></li>
                </ul>
                <Button icon={<TbDatabase/>} text="Cuentas"/>
            </nav>
        </header>
    );
}

export default Header