import React, { useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie';

import TweetAlertContext from '../../contexts/TweetAlertContext'
import UserContext from '../../contexts/UserContext'

import { GrTwitter } from "react-icons/gr";
import { RiMoreFill } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { RiNotification2Line, RiFileListLine, RiSettings3Line } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import Button from '../atoms/Button'
import AccountsButton from '../atoms/AccountsButton'

function Header() {
    const {showTweetAlert, setShowTweetAlert, handleStateTweetAlert} = useContext(TweetAlertContext);
    const {user, setUser} = useContext(UserContext)
    const [allUserName, setAllUserName] = useState("");
    const [userName, setUserName] = useState("");
    const [panelState, setPanelState] = useState(false);
    const changePanel = state=> setPanelState(state);
    const LogOut = ()=>{
        Cookies.remove('sessionId')
        window.location.replace('/home')
    }

    useEffect(()=>{
        if(user != undefined){
            setUserName(user.username);

            let name = user.userAllName.split('');
            if(name.length >= 14){
                name.splice(13, name.length, '');
                name.push("...")
            }
            let fullName = name.join("");
            setAllUserName(fullName)
        }
    },[user])

    return (
        <header className="h-full mr-3">
            <nav className=' flex h-full flex-col justify-between'>
                <ul className=' list-none'>
                    <li><Button icon={<GrTwitter/>} href="/home"  color="twitter"/></li>
                    <li><Button icon={<AiOutlineHome/>} text="Inicio" href="/home"/></li>
                    <li><Button icon={<RiNotification2Line/>} text="Notificaciones" href="/notifications"/></li>
                    <li><Button icon={<RiFileListLine/>} text="Listas" href="/lists"/></li>
                    <li><Button icon={<BsPerson/>} text="Perfil" href={userName}/></li>
                    <li><Button icon={<RiSettings3Line/>} text="Mas opciones" href="/settings"/></li>
                    <li><Button text="Twittear" bold={true} onClick={()=>handleStateTweetAlert(true)}/></li>
                </ul>
                <div className={panelState ? 'visible' : 'invisible'}>
                    <div onClick={()=>changePanel(false)} className='w-full h-full absolute top-0 left-0'></div>
                    <div className=' bg-background flex py-3 flex-col items-center justify-center rounded-2xl absolute w-[280px] bottom-[90px] shadow-background-1 shadow-[0_0px_25px_-15px_rgba(0,0,0,0.3)]'>
                        <div className=' border-2 border-b-background-2 h-[1px] w-full'></div>
                        <AccountsButton title='Log out' onClick={()=>LogOut()}/>
                        <AccountsButton title='Account settings' href="/settings"/>
                    </div>
                </div>
                <button onClick={()=>changePanel(true)} className=' hover:bg-background-4 rounded-full flex items-center py-3 min-w-[270px] justify-center mb-3'>
                    <img src={user != undefined ? user.img : ""} className=' ml-4 rounded-full h-[50px]'/>
                    <div className='flex flex-col ml-4 items-start text-base leading-[22px]'>
                        <p className=' text-background-1 font-semibold'>{allUserName}</p>
                        <p className=' text-background-3'>@{userName}</p>
                    </div>
                    <RiMoreFill className=' text-background-1 mx-4 text-[23px]'/>
                </button>
            </nav>
        </header>
    );
}

export default Header