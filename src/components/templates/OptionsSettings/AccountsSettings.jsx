import React, { useState, useEffect, useRef } from 'react';

function AccountsSettings() {
    const [visibleTemplate, setVisibleTemplate] = useState("selector")
    const emailNewEmail = useRef(null);
    const emailCurrentEmail = useRef(null);
    const emailCurrentPassword = useRef(null);
    const passwordNewPassword = useRef(null);
    const passwordCurrentEmail = useRef(null);
    const passwordCurrentPassword = useRef(null);

    const changeEmail = ()=>{
        let account = null;
        fetch("http://localhost:3000/accounts")
        .then(response => response.json())
        .then(info =>{
            for (let i = 0; i < info.length; i++) {
                if (emailCurrentEmail.current.value == info[i].email && emailCurrentPassword.current.value == info[i].password) {
                    account = info[i];
                }
            }
            
            if(account != null){
                account.email = emailNewEmail.current.value;
                fetch(`http://localhost:3000/accounts/${account.id}`,{
                    method:'PUT',
                    body: JSON.stringify(account),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })   
                alert("Email changed")
                window.location.replace('/home');
            }else{
                alert("Wrong password or email.")
            }
        })
    }

    const changePassword = ()=>{
        let account = null;
        fetch("http://localhost:3000/accounts")
        .then(response => response.json())
        .then(info =>{
            for (let i = 0; i < info.length; i++) {
                if (passwordCurrentEmail.current.value == info[i].email && passwordCurrentPassword.current.value == info[i].password) {
                    account = info[i];
                }
            }

            if(account != null){
                account.password = passwordNewPassword.current.value;
                fetch(`http://localhost:3000/accounts/${account.id}`,{
                    method:'PUT',
                    body: JSON.stringify(account),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                alert("Password changed")
                window.location.replace('/home');
            }else{
                alert("Wrong password or email.")
            }
        })
    }

    return (
        <>
        <div className={visibleTemplate == "selector" ? 'text-white mx-4' : 'text-white mx-4 hidden'}>
            <h1 className=' text-2xl font-semibold mt-3'>Account settings</h1>
            <p className=' text-mega-soft-black text-sm mt-3'>Select your preferred language for headlines, buttons, and other text from Twitter.</p>
            <div className=' flex mt-6 mb-2 justify-center'>
                <button onClick={()=>setVisibleTemplate("changeEmail")} className=' border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold mx-2'>Change email</button>
                <button onClick={()=>setVisibleTemplate("changePassword")} className=' border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold mx-2'>Change password</button>
            </div>
        </div>
        <div className={visibleTemplate == "changeEmail" ? 'text-white mx-4' : 'text-white mx-4 hidden'}>
            <h1 className=' text-2xl font-semibold mt-3'>Change e-mail</h1>
            <p className=' text-mega-soft-black text-sm mt-3'>Seleccione un ...</p>
            <div>
               <p className='mt-3 font-semibold'>New e-mail:</p>
                <input ref={emailNewEmail} type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-black rounded-sm border-2 border-mega-soft-black placeholder:text-red pl-4 text-base'/>
               <p className='mt-7 font-semibold'>Current e-mail:</p>
                <input ref={emailCurrentEmail} type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-black rounded-sm border-2 border-mega-soft-black placeholder:text-red pl-4 text-base'/>
                <p className='mt-3 font-semibold'>Current password:</p>
                <input ref={emailCurrentPassword} type="password" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-black rounded-sm border-2 border-mega-soft-black placeholder:text-red pl-4 text-base'/>
            </div>
            <div className=' flex mt-4 mb-2'>
                <button onClick={()=>changeEmail()} className=' border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Change e-mail</button>
                <button onClick={()=>setVisibleTemplate("selector")} className=' ml-2 border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Go back</button>
            </div>
            <p className='text-red text-opacity-50 text-sm mt-3'>The changes doesn't save automatically</p>
        </div>
        <div className={visibleTemplate == "changePassword" ? 'text-white mx-4' : 'text-white mx-4 hidden'}>
            <h1 className=' text-2xl font-semibold mt-3'>Change password</h1>
            <p className=' text-mega-soft-black text-sm mt-3'>Seleccione un ...</p>
            <div>
               <p className='mt-3 font-semibold'>New password:</p>
                <input ref={passwordNewPassword} type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-black rounded-sm border-2 border-mega-soft-black placeholder:text-red pl-4 text-base'/>
               <p className='mt-7 font-semibold'>Current email:</p>
                <input ref={passwordCurrentEmail} type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-black rounded-sm border-2 border-mega-soft-black placeholder:text-red pl-4 text-base'/>
                <p className='mt-3 font-semibold'>Current password:</p>
                <input ref={passwordCurrentPassword} type="password" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-black rounded-sm border-2 border-mega-soft-black placeholder:text-red pl-4 text-base'/>
            </div>
            <div className=' flex mt-4 mb-2'>
                <button onClick={()=>changePassword()} className=' border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Change password</button>
                <button onClick={()=>setVisibleTemplate("selector")} className=' ml-2 border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Go back</button>
            </div>
            <p className='text-red text-opacity-50 text-sm mt-3'>The changes doesn't save automatically</p>
        </div>
        </>
    )
}

export default AccountsSettings