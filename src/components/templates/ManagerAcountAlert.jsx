import React, { useState, useEffect, useRef } from 'react';

import LogIn from './LogIn'
import SingIn from './SingIn'

function ManagerAcountAlert() {
    const [showLogIn, setShowLogIn]  = useState(false);
    const [showSingIn, setShowSingIn]  = useState(false);
    
    const handleCloseLogIn = state => !showSingIn && setShowLogIn(state);
    const handleCloseSingIn = state => !showLogIn && setShowSingIn(state);
    
    return (
        <>
            <div className=' text-white justify-center items-center flex absolute bottom-0 bg-twitter w-[100vw] h-20 shadow-2xl shadow-white'>
                <div className=' h-full w-[300px]'></div>
                <div className=' h-full w-[700px] flex flex-col justify-center'>
                    <div>
                        <h3 className=' text-2xl font-semibold leading-6'>No te pierdas lo que está pasando</h3>
                        <p className=' text-lg leading-6'>Los usuarios de Twitter son los primeros en enterarse.</p>
                    </div>
                </div>
                <div className=' h-full flex items-center w-[470px]'>
                        <button onClick={()=>handleCloseLogIn(true)} className=' h-10 w-36 rounded-full font-semibold border-white border-2'>Iniciar Sesión</button>
                        <button onClick={()=>handleCloseSingIn(true)} className=' h-10 w-36 rounded-full bg-white text-black font-semibold ml-3'>Regístrate</button>
                </div>
            </div>
            <LogIn className={showLogIn ? " visible" : " invisible"} close={()=>handleCloseLogIn(false)}/>
            <SingIn className={showSingIn ? " visible" : " invisible"} close={()=>handleCloseSingIn(false)}/>
        </>
    )
}

export default ManagerAcountAlert