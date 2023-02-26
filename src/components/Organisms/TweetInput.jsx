import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import createNotificationContext from '../../contexts/NotificationsContext'
import UserContext from '../../contexts/UserContext'

import { BiImageAlt } from "react-icons/bi";
import { HiOutlineGif } from "react-icons/hi2";

function TweetInput() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const createNotification = useContext(createNotificationContext)
    const {user, setUser} = useContext(UserContext);
    const [imageHref, setImageHref] = useState()

    useLayoutEffect(()=>{
        const setImageFromUser = async()=>{
            if(user != undefined){
                await fetch(`http://localhost:3000/users/${user.id}`)
                .then(response => response.json())
                .then(info=>{
                    setImageHref(info.img)
                })
            }
        }
        setImageFromUser()
    },[user])
    const onSubmit = async (data) =>{
        let newUser = null;
        let LastPostId = null;
        await fetch(`http://localhost:3000/posts`)
        .then(response => response.json())
        .then(info=>{
            LastPostId = info;
        })

        await fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then(info=>{
            newUser = info;
            setUser(info);
        })

        let date = new Date()
        let months = [
          "January", "February",
          "March", "April",
          "May", "June",
          "July", "August",
          "September", "October",
          "November", "December"
        ]
        let createdDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getYear() + 1900}`;
        let MiliseconsFromEpoch = date.getTime();

        newUser.content.posts.push({
            PostId: LastPostId + 1,
            comments:[],
            commentFrom: null,                                                           //falta
            username: newUser.username,
            allUserName: newUser.userAllName,
            img: newUser.img,
            retweetsUsersId:[],
            likesUserId:[],
            viewsUserId:[],
            content: data.text,
            contentImage: null,                                                          //falta
            date:createdDate,
            dateInMilliseconds: MiliseconsFromEpoch
        })

        await fetch(`http://localhost:3000/posts`,{
            method:'PUT',
            body: JSON.stringify( LastPostId + 1),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await fetch(`http://localhost:3000/users/${user.id}`,{
            method:'PUT',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
              createNotification(`Tweet created: "${data.text}"`, "Twitter");
            } else {
              console.error('Failed to create post');
            }
          })
        .catch(error => {
            console.error('Error:', error);
        });
        location.reload();
    }

    return (
        <div className='flex w-full'>
            <div className='photo'>
                <img src={imageHref} alt="" className=' h-16 w-16 rounded-full m-4'/>
            </div>
            <div className=' w-full p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text resize-none'>
                        <textarea {...register("text", { required: true })} type='text' placeholder='Whats happening?' className=' w-full resize-y h-12 max-h-[40vh] overflow-hidden bg-background pt-4 pb-3 text-xl placeholder:text-background-2 focus:outline-none text-background-1'></textarea>
                    </div>
                    <div className=' flex'>
                        <div className=' flex w-full items-center'>
                            <BiImageAlt className=' text-accent w-6 h-6 rounded-full mx-1'/>
                            <HiOutlineGif className=' text-accent w-6 h-6 rounded-full mx-1'/>
                        </div>
                        <input value='Tweet' type="submit" className=' text-background-6 bg-accent p-2 px-6 font-semibold rounded-full'></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TweetInput