import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import LogedContext from './contexts/LogedContext'
import UserContext from './contexts/UserContext'
import TweetAlertContext from './contexts/TweetAlertContext'

import Header from './components/templates/Header'
import HeaderLogOut from './components/templates/HeaderLogOut'
import Home from './components/pages/Home'
import ExploreLogOut from './components/templates/ExploreLogOut'
import Notifications from './components/pages/Notifications'
import Lists from './components/pages/Lists'
import User from './components/pages/User'
import ManagerAcountAlert from './components/templates/ManagerAcountAlert'

function App() {
    const [acountOpen, setAcountOpen] = useState();
    const [user, setUser] = useState();
    const [shouldRedirect, setShouldRedirect] = useState(true);
    const location = useLocation();

    const [showTweetAlert, setShowTweetAlert]  = useState(false);
    const handleStateTweetAlert = state => setShowTweetAlert(state);

    useEffect(() => {
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
                setShouldRedirect(true);
                window.location.replace('/home');
            } 
        }
    }, [acountOpen])

    return (
        <TweetAlertContext.Provider value={{showTweetAlert, setShowTweetAlert, handleStateTweetAlert}}>
            <UserContext.Provider value={{user, setUser}}>
                <LogedContext.Provider value={{acountOpen, setAcountOpen}}>
                    <div className=" bg-black flex justify-center h-full m-0 p-0 font-arial">
                        {acountOpen ?(
                            <>
                                <Header/>
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
                                        <Route path='/:user/lists' element={<Lists/>} />
                                        <Route path='/:user' element={<User/>} />
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
    )
}

export default App