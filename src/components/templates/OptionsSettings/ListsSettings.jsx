import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../../contexts/UserContext'

function ListsSettings() {
    const {user, setUser} = useContext(UserContext);

    const removeAllItemsInList = async ()=>{
        var answer = confirm("You will remove all items from lists");
        if(answer){
            let newUser = null;
            await fetch(`http://localhost:3000/users/${user.id}`)
            .then(response => response.json())
            .then(info=>{
                newUser = info;
                setUser(info);
            })
    
            newUser.content.lists = [];
    
            await fetch(`http://localhost:3000/users/${user.id}`,{
                method:'PUT',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert("Items Removed");
        } else {
            //if the user clicks "Cancel"
            alert("Action cancelled");
        }
    }
    return (    
        <div className=' text-white mx-4'>
            <h1 className=' text-2xl font-semibold mt-3'>Lists options</h1>
            <p className=' text-mega-soft-black text-sm mt-3'>Select your preferred language for headlines, buttons, and other text from Twitter.</p>
            <div className=' flex mt-6 mb-2 justify-center'>
                <button onClick={()=>removeAllItemsInList()} className=' border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Remove all items</button>
            </div>
         </div>
    )
}

export default ListsSettings