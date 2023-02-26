import React, { useState, useEffect } from 'react';
import './UserProfile.css'
import Cookies from 'js-cookie';

import UserContext from '../../contexts/UserContext'

import { BiCalendar } from "react-icons/bi";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile({buttonSelected, chaneFeed}) {
    const { userName } = useParams()

    const {user, setUser} = useContext(UserContext);

    const [userIdState, setUserIdState] = useState();
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
                    if (info[i].username == userName) {
                        userId = info[i].userId;
                        setUserIdState(userId);
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
                        if (userName == info[i].username) {
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
                        for (let i = 0; i < info.Following.length; i++) {
                            if (info.Following[i] == userId) {
                                TheUserFollowTheProfile = true;
                                setFollowingTheAccount(true);
                            }
                        }
                        if (!TheUserFollowTheProfile) {
                            setFollowingTheAccount(false);
                        }
                    })
                }
            })
        }
        setProfileValues()
    },[])

    const followAccount = ()=>{
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then(info =>{
            let userData = info;
            userData.Following.push(userIdState);
            setFollowingTheAccount(true)
            fetch(`http://localhost:3000/users/${user.id}`,{
                method: 'PUT',
                body: JSON.stringify(userData),
                headers:{
                    'Content-type':'application/json'
                }
            })
            .catch(error => console.log(error))
        })
    }

    const unfollowAccount = ()=>{
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then(info =>{
            let userData = info;
            userData.Following = userData.Following.filter(item => item !== userIdState);
            setFollowingTheAccount(false)
            fetch(`http://localhost:3000/users/${user.id}`,{
                method: 'PUT',
                body: JSON.stringify(userData),
                headers:{
                    'Content-type':'application/json'
                }
            })
            .catch(error => console.log(error))
        })
    }

    return (
        <div>
            <div className={(banerImg == undefined || banerImg == "") ? " w-[697.78px] h-[232.59px] bg-background-2" : ""}>
                <img src={banerImg} alt=""/>
            </div>
            { userAccount ?(
                <div className='flex items-center justify-end w-full h-[70px]'>
                    <a href='http://localhost:5173/settings' className='border-[1px] border-background-2 h-[40px] w-[130px] mr-4 rounded-full text-background-1 flex items-center justify-center font-semibold'><p>Edit profile</p></a>
                </div>
            )
            :
            (
                !followingTheAccount ?//follow user
                (
                <div className='flex items-center justify-end w-full h-[70px]'>
                    <div onClick={()=>followAccount()} className='border-[1px] bg-background-1 h-[40px] text-background w-[130px] mr-4 rounded-full flex items-center justify-center font-semibold'><p>Follow</p></div>
                </div>
                )
                ://unfollow user
                (
                <div className='flex items-center justify-end w-full h-[70px]'>
                    <div onClick={()=>unfollowAccount()} onMouseOver={()=>followingButtonTextOver()} onMouseOut={()=>followingButtonTextOut()} className='border-[1px] border-background-2 h-[40px] w-[130px] mr-4 rounded-full text-background-1 hover:text-red hover:border-red hover:bg-red hover:bg-opacity-10 flex items-center justify-center font-semibold'><p>{followingButtonText}</p></div>
                </div>
                )
            )
            }
            <div className=' flex justify-between'>
                <div className=' text-background-1 ml-5 mt-6'>
                    <h1 className=' text-[22px] font-bold'>{allName}</h1>
                    <p className=' text-background-3'>{tag}</p>
                    <br/>
                    <p>{biography}</p>
                    <div className='flex text-background-3 items-center mt-2'><BiCalendar/><p className=' ml-1'>Joined {joinded}</p></div>
                    <div className=' flex mt-2'>
                        <p><span>{following}</span><span className=' text-background-3'> Following</span></p>
                        <p className=' ml-6'><span>{followers}</span><span className=' text-background-3'> Followers</span></p>
                    </div>
                </div>
                <div className=' bg-background w-[150px] h-[150px] relative top-[-150px] left-[-530px] rounded-full flex justify-center items-center'>
                    <div className='w-[95%] h-[95%] bg-background-2 rounded-full'>
                        <img src={profileImg} className='rounded-full'/>
                    </div>
                </div>
            </div>
            <div className='w-full h-[60px] border-b-2 border-background-2 flex justify-evenly mt-4'>
                <div onClick={()=>chaneFeed("Tweets")} className=' hover:bg-background-4 text-background-3 font-normal flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Tweets" ? "text-background-1 font-semibold" : ""}>Tweets</p>
                        <div className={buttonSelected == "Tweets" ?  "h-[4.5px] bg-accent rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
                <div onClick={()=>chaneFeed("Tweets & replies")} className=' hover:bg-background-4 text-background-3 font-normal flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Tweets & replies" ? "text-background-1 font-semibold" : ""}>Tweets & replies</p>
                        <div className={buttonSelected == "Tweets & replies" ?  "h-[4.5px] bg-accent rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
                <div onClick={()=>chaneFeed("Media")} className=' hover:bg-background-4 text-background-3 font-normal flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Media" ? "text-background-1 font-semibold" : ""}>Media</p>
                        <div className={buttonSelected == "Media" ?  "h-[4.5px] bg-accent rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
                <div onClick={()=>chaneFeed("Likes")} className=' hover:bg-background-4 text-background-3 font-normal hoverButton transition-all flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[9px]'></div>
                        <p className={buttonSelected == "Likes" ? "text-background-1 font-semibold" : ""}>Likes</p>
                        <div className={buttonSelected == "Likes" ?  "h-[4.5px] bg-accent rounded-full" : 'h-[4.5px]'}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile