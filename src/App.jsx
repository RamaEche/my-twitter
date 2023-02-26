import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import LogedContext from './contexts/LogedContext'
import UserContext from './contexts/UserContext'
import TweetAlertContext from './contexts/TweetAlertContext'
import ColorModeContext from './contexts/ColorModeContext'

import Header from './components/templates/Header'
import HeaderLogOut from './components/templates/HeaderLogOut'
import Home from './components/pages/Home'
import ExploreLogOut from './components/templates/ExploreLogOut'
import Notifications from './components/pages/Notifications'
import Lists from './components/pages/Lists'
import User from './components/pages/User'
import Post from './components/pages/Post'
import Settings from './components/pages/Settings'
import ManagerAcountAlert from './components/templates/ManagerAcountAlert'
import TweetAlert from "./components/templates/TweetAlert";

function App() {
    const [colorMode, setColorMode] = useState();
    const [acountOpen, setAcountOpen] = useState();
    const [user, setUser] = useState();
    const location = useLocation();

    const [showTweetAlert, setShowTweetAlert]  = useState(false);
    const handleStateTweetAlert = state => setShowTweetAlert(state);
    
    useLayoutEffect(()=>{
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(info => {
            for (let i = 0; i < info.length; i++) {
                if(Cookies.get('sessionId') == info[i].sessionid){
                    setColorMode({
                        background: info[i].settings.display.background,
                        color: info[i].settings.display.color
                    })

                    const root = document.documentElement;
                    switch (info[i].settings.display.background) {
                        case 'white':
                            root.style.setProperty('--color-background', '#fff');
                            root.style.setProperty('--color-background-1', '#000');
                            root.style.setProperty('--color-background-2', '#ddd');
                            root.style.setProperty('--color-background-3', '#777');
                            root.style.setProperty('--color-background-4', '#f3f3f3');
                            root.style.setProperty('--color-background-5', '#eee');
                            root.style.setProperty('--color-background-6', '#EFF3F4');
                        break;

                        case 'dim':
                            root.style.setProperty('--color-background', '#15202B');
                            root.style.setProperty('--color-background-1', '#F1F4F4');
                            root.style.setProperty('--color-background-2', '#2F3842');
                            root.style.setProperty('--color-background-3', '#75828F');
                            root.style.setProperty('--color-background-4', '#0F1722');
                            root.style.setProperty('--color-background-5', '#182735');
                            root.style.setProperty('--color-background-6', '#EFF3F4');
                        break;
                        case 'dark':
                            root.style.setProperty('--color-background', '#000');
                            root.style.setProperty('--color-background-1', '#fff');
                            root.style.setProperty('--color-background-2', '#222');
                            root.style.setProperty('--color-background-3', '#777');
                            root.style.setProperty('--color-background-4', '#16181C');
                            root.style.setProperty('--color-background-5', '#080808');
                            root.style.setProperty('--color-background-6', '#EFF3F4');
                        break;
                                
                        default:
                        break;
                    }

                    switch (info[i].settings.display.color) {
                        case 'lightBlue':
                            root.style.setProperty('--color-accent', '#1D9BF0');
                            root.style.setProperty('--color-accent-1', '#A0C5DF');
                        break;

                        case 'yellow':
                            root.style.setProperty('--color-accent', '#FFD400');
                            root.style.setProperty('--color-accent-1', '#FBEEAF');
                        break;

                        case 'pink':
                            root.style.setProperty('--color-accent', '#F91880');
                            root.style.setProperty('--color-accent-1', '#F9A1CA');
                        break;

                        case 'greyBlue':
                            root.style.setProperty('--color-accent', '#7856FF');
                            root.style.setProperty('--color-accent-1', '#BAA9FD');
                            
                        break;

                        case 'orange':
                            root.style.setProperty('--color-accent', '#FF7A00');
                            root.style.setProperty('--color-accent-1', '#FEC590');
                        break;

                        case 'green':
                            root.style.setProperty('--color-accent', '#00BA7C');
                            root.style.setProperty('--color-accent-1', '#B2D1C7');
                            root.style.setProperty('--color-accent-2', '#E1EEF6');
                        break;

                        default:
                        break;
                    }
                }
            }
        })
    }, [])
    useLayoutEffect(() => {
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(info=>{
            if(Cookies.get('sessionId')){
                let isCorrect = false;
                for (let i = 0; i < info.length; i++) {
                    if(info[i].sessionid == Cookies.get('sessionId')){
                        setAcountOpen(true);
                        isCorrect = true;

                        fetch('http://localhost:3000/users')
                        .then(response => response.json())
                        .then(data => {
                            for (let j = 0; j < data.length; j++) {
                                if(data[j].id == info[i].userId) {
                                    setUser(data[j]);
                                }
                            }
                        })
                    }
                }
                if (isCorrect == false) {
                    setAcountOpen(false);
                }
            }else{
                setAcountOpen(false);
            }
        })
    }, []);

    useEffect(()=>{
        if (acountOpen == false) {
            if (location.pathname !== "/explore" && location.pathname !== "/settings"){
                window.location.replace('/explore');
            }  
        }else if(acountOpen == true){
            if (location.pathname === "/") {
                window.location.replace('/home');
            } 
        }
    }, [acountOpen])

    return (
        <ColorModeContext.Provider value={{colorMode, setColorMode}}>
            <TweetAlertContext.Provider value={{showTweetAlert, setShowTweetAlert, handleStateTweetAlert}}>
                <UserContext.Provider value={{user, setUser}}>
                    <LogedContext.Provider value={{acountOpen, setAcountOpen}}>
                        <div className=" bg-black flex justify-center h-full m-0 p-0 font-arial">
                            {acountOpen ?(
                                <>
                                    <Header/>
                                    <TweetAlert className={showTweetAlert ? " visible" : " invisible"} close={()=>handleStateTweetAlert(false)}/>
                                </>
                            )
                            :
                            (
                                <>
                                    <HeaderLogOut/>
                                    <ManagerAcountAlert/>
                                </>
                            )}

                            
                            <div className="flex flex-row h-full">
                                <Routes>
                                    {acountOpen ? (
                                        <>
                                            <Route path='/home' element={<Home/>} />
                                            <Route path='/notifications' element={<Notifications/>} />
                                            <Route path='/lists' element={<Lists/>} />
                                            <Route path='/:userName' element={<User/>}/>
                                            <Route path='/:userName/:postId' element={<Post/>}/>
                                            <Route path='/settings' element={<Settings/>} />
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Route path='/explore' element={<ExploreLogOut/>}/>
                                        </>
                                    )}
                                    //crear 404
                                </Routes>
                            </div>
                        </div>
                    </LogedContext.Provider>
                </UserContext.Provider>
            </TweetAlertContext.Provider>
        </ColorModeContext.Provider>
    )
}

export default App