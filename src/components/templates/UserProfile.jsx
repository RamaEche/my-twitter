import React, { useState, useEffect } from 'react';
import './UserProfile.css'
import Cookies from 'js-cookie';

import { BiCalendar } from "react-icons/bi";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile({buttonSelected, chaneFeed}) {
    const { user } = useParams()

    const [userAccount, setUserAccount] = useState(false);
    const [followingTheAccount, setFollowingTheAccount] = useState(false);
    const [followingButtonText, setFollowingButtonText] = useState("Following");
    const [banerImg, setBanerImg] = useState();
    const [profileImg, setProfileImg] = useState();
    const [allName, setAllName] = useState("This account doesn't exist");
    const [tag, setTag] = useState("");
    const [biography, setBiography] = useState("");
    const [joinded, setJoinded] = useState("Never");
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);

    const followingButtonTextOver = ()=>{
        setFollowingButtonText("Unfollow");
    }

    const followingButtonTextOut = ()=>{
        setFollowingButtonText("Following");
    }


    useEffect(()=>{
        const setProfileValues = async ()=>{
            let userId = null
            
            await fetch(`http://localhost:3000/accounts`)
            .then(response => response.json())
            .then(info =>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == user) {
                        userId = info[i].userId;
                    }                    
                }
            })

            if(userId == null){
                return;
            }

            await fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(info =>{
                setBanerImg(info.banerImg);
                setProfileImg(info.img)
                setAllName(info.userAllName)
                setTag("@" + info.username)
                setBiography(info.biography)
                setJoinded(info.Joinded)
                setFollowing(info.Following.length)
                setFollowers(info.Followers.length)
            })

            //si es o no la cuenta del user y si lo sigue o no
            await fetch(`http://localhost:3000/accounts`)
            .then(response => response.json())
            .then(info =>{
                let isTheAccountOwn = false;
                let ownerId;
                for (let i = 0; i < info.length; i++) {
                    if (info[i].sessionid == Cookies.get('sessionId')) {
                        ownerId = info[i].userId;
                        if (user == info[i].username) {
                            isTheAccountOwn = true;
                        }
                    }
                }
                if (isTheAccountOwn) {
                    setUserAccount(true);
                }else{
                    setUserAccount(false);
                    fetch(`http://localhost:3000/users/${ownerId}`)
                    .then(response => response.json())
                    .then(info =>{
                        let TheUserFollowTheProfile = false;
                        console.log(info)
                        for (let i = 0; i < info.Following.length; i++) {
                            console.log(info.Following[i], " == ", userId)
                            if (info.Following[i] == userId) {
                                TheUserFollowTheProfile = true;
                                console.log("Lo sigue")
                                setFollowingTheAccount(false);
                            }
                        }
                        if (!TheUserFollowTheProfile) {
                            console.log("No lo sigue")
                            setFollowingTheAccount(true);
                        }
                    })
                }
            })
        }
        setProfileValues()
    },[])

    return (
        <div>
            <div className={banerImg == undefined ? " w-[697.78px] h-[232.59px] bg-super-soft-black" : ""}>
                <img src={banerImg} alt=""/>
            </div>
            { userAccount ?(
                <div className='flex items-center justify-end w-full h-[70px]'>
                    <a href='http://localhost:5173/settings' className='border-[1px] border-super-soft-black h-[40px] w-[130px] mr-4 rounded-full text-white flex items-center justify-center font-semibold'><p>Edit profile</p></a>
                </div>
            )
            :
            (
                followingTheAccount ?//follow user
                (
                <div className='flex items-center justify-end w-full h-[70px]'>
                    <div onClick={()=>alert('follow')} className='border-[1px] bg-white h-[40px] w-[130px] mr-4 rounded-full flex items-center justify-center font-semibold'><p>Follow</p></div>
                </div>
                )
                ://unfollow user
                (
                <div className='flex items-center justify-end w-full h-[70px]'>
                    <div onClick={()=>alert('unfollow')} onMouseOver={()=>followingButtonTextOver()} onMouseOut={()=>followingButtonTextOut()} className='border-[1px] border-super-soft-black h-[40px] w-[130px] mr-4 rounded-full text-white hover:text-red hover:border-red hover:bg-red hover:bg-opacity-10 flex items-center justify-center font-semibold'><p>{followingButtonText}</p></div>
                </div>
                )
            )
            }
            <div className=' flex justify-between'>
                <div className=' text-white ml-5 mt-6'>
                    <h1 className=' text-[22px] font-bold'>{allName}</h1>
                    <p className=' text-super-soft-black'>{tag}</p>
                    <br/>
                    <p>{biography}</p>
                    <div className='flex text-mega-soft-black items-center mt-2'><BiCalendar/><p className=' ml-1'>Joined {joinded}</p></div>
                    <div className=' flex mt-2'>
                        <p><span>{following}</span><span className=' text-mega-soft-black'> Following</span></p>
                        <p className=' ml-6'><span>{followers}</span><span className=' text-mega-soft-black'> Followers</span></p>
                    </div>
                </div>
                <div className=' bg-black w-[150px] h-[150px] relative top-[-150px] left-[-530px] rounded-full flex justify-center items-center'>
                    <div className='w-[95%] h-[95%] bg-soft-black rounded-full'>
                        <img src={profileImg} className='rounded-full'/>
                    </div>
                </div>
            </div>
            <div className='w-full h-[60px] border-b-2 border-super-soft-black flex justify-evenly mt-4'>
                <div onClick={()=>chaneFeed("Tweets")} className=' hover:bg-mygray text-mygray-soft font-normal flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Tweets" ? "text-white font-semibold" : ""}>Tweets</p>
                        <div className={buttonSelected == "Tweets" ?  "h-[4.5px] bg-twitter rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
                <div onClick={()=>chaneFeed("Tweets & replies")} className=' hover:bg-mygray text-mygray-soft font-normal flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Tweets & replies" ? "text-white font-semibold" : ""}>Tweets & replies</p>
                        <div className={buttonSelected == "Tweets & replies" ?  "h-[4.5px] bg-twitter rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
                <div onClick={()=>chaneFeed("Media")} className=' hover:bg-mygray text-mygray-soft font-normal flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Media" ? "text-white font-semibold" : ""}>Media</p>
                        <div className={buttonSelected == "Media" ?  "h-[4.5px] bg-twitter rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
                <div onClick={()=>chaneFeed("Likes")} className=' hover:bg-mygray text-mygray-soft font-normal hoverButton transition-all flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Likes" ? "text-white font-semibold" : ""}>Likes</p>
                        <div className={buttonSelected == "Likes" ?  "h-[4.5px] bg-twitter rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile