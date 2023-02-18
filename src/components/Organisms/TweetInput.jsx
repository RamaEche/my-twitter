import React, { useContext } from 'react';
import { useForm } from "react-hook-form";

import UserContext from '../../contexts/UserContext'

import { BiImageAlt } from "react-icons/bi";
import { HiOutlineGif } from "react-icons/hi2";

function TweetInput() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {user, setUser} = useContext(UserContext);

    const onSubmit = async (data) =>{
        let newUser = null;
        await fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then(info=>{
            newUser = info;
            setUser(info);
        })

        newUser.content.posts.push({
            commentsId:[],
            username:"ramiro",
            allUserName: "Ramiro Echevarria",
            retweetsUsersId:[],
            likesUserId:[],
            viewsUserId:[],
            content: data.text,
            date:"xxxx xx xx"
        })
        
        await fetch(`http://localhost:3000/users/${user.id}`,{
            method:'DELETE'
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

        await fetch(`http://localhost:3000/users/`,{
            method:'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
              console.log('Post created'); 
            } else {
              console.error('Failed to create post');
            }
          })
        .catch(error => {
            console.error('Error:', error);
        });

        console.log(data.text);
        console.log(user);
    }

    return (
         <div className='flex w-full'>
            <div className='photo'>
                <img src="https://xsgames.co/randomusers/assets/avatars/male/70.jpg" alt="" className=' h-16 w-16 rounded-full m-4'/>
            </div>
            <div className=' w-full p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text resize-none'>
                        <textarea {...register("text", { required: true })} type='text' placeholder='Whats happening?' className=' w-full resize-y h-12 max-h-[40vh] overflow-hidden bg-black pt-4 pb-3 text-xl placeholder:text-super-soft-black focus:outline-none text-white'></textarea>
                    </div>
                    <div className=' flex'>
                        <div className=' flex w-full items-center'>
                            <BiImageAlt className=' text-twitter w-6 h-6 rounded-full mx-1'/>
                            <HiOutlineGif className=' text-twitter w-6 h-6 rounded-full mx-1'/>
                        </div>
                        <input value='Tweet' type="submit" className=' bg-twitter p-2 px-6 font-semibold text-white rounded-full'></input>
                    </div>
                </form>
            </div>
         </div>
    );
}

export default TweetInput