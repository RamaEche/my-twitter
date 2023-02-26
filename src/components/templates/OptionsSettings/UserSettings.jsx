import React, { useState, useEffect, useRef, useContext } from 'react';

import UserContext from "../../../contexts/UserContext"

function UserSettings() {
    const user = useContext(UserContext);
    const fullName = useRef(null);
    const Biography = useRef(null);
    const profileImage = useRef(null);
    const banerImage = useRef(null);

    const [fullNameValue, setFullNameValue] = useState("");
    const [biographyValue, setBiographyValue] = useState("");
    const [profileImageValue, setBrofileImageValue] = useState("");
    const [banerImageValue, setBanerImageValue] = useState("");

    useEffect(()=>{
        showSavedAttributes()
    }, [])

    const saveChanges = ()=>{
        fetch(`http://localhost:3000/users/${user.user.id}`)
        .then(response => response.json())
        .then(info =>{
            info.userAllName = fullNameValue;
            info.biography = biographyValue;
            info.img = profileImageValue;
            info.banerImg = banerImageValue;

            fetch(`http://localhost:3000/users/${user.user.id}`,{
                method: "PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(info)
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const showSavedAttributes = ()=>{
        fetch(`http://localhost:3000/users/${user.user.id}`)
        .then(response => response.json())
        .then(info =>{
            setFullNameValue(info.userAllName);
            setBiographyValue(info.biography);
            setBrofileImageValue(info.img);
            setBanerImageValue(info.banerImg);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className=' text-background-1 mx-4'>
            <h1 className=' text-2xl font-semibold mt-3'>User options</h1>
            <p className=' text-background-3 text-sm mt-3'>Select your preferred language for headlines, buttons, and other text from Twitter.</p>
            <div>
               <p className='mt-3 font-semibold'>Full Name:</p>
                <input value={fullNameValue} onChange={(event)=>setFullNameValue(event.target.value)}type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-background rounded-sm border-2 border-background-3 placeholder:text-red pl-4 text-base'/>
                <p className='mt-3 font-semibold'>Biography:</p>
                <textarea value={biographyValue} onChange={(event)=>setBiographyValue(event.target.value)} placeholder={"Campo obligatorio"} className=' pt-[10px] w-full h-11 bg-background rounded-sm border-2 border-background-3 placeholder:text-red pl-4 text-base'></textarea>
                <p className='mt-3 font-semibold'>Profile image (url):</p>
                <input value={profileImageValue} onChange={(event)=>setBrofileImageValue(event.target.value)} type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-background rounded-sm border-2 border-background-3 placeholder:text-red pl-4 text-base'/>
                <p className='mt-3 font-semibold'>Baner image (url):</p>
                <input value={banerImageValue} onChange={(event)=>setBanerImageValue(event.target.value)} type="text" placeholder={"Campo obligatorio"} className=' w-full h-11 bg-background rounded-sm border-2 border-background-3 placeholder:text-red pl-4 text-base'/>
            </div>
            <div className=' flex mt-4 mb-2'>
                <button onClick={()=>saveChanges()} className=' border-2 border-background-3 py-2 px-8 rounded-full font-semibold'>Save</button>
                <button onClick={()=>showSavedAttributes()} className=' ml-2 border-2 border-background-3 py-2 px-8 rounded-full font-semibold'>Discart</button>
            </div>
            <p className='text-red text-opacity-50 text-sm mt-3'>The changes doesn't save automatically</p>
        </div>
    )
}

export default UserSettings