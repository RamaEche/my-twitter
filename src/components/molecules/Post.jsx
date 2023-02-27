import React, { useContext, useEffect, useState } from 'react';

import './Post.css'

import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet, FaRegComment, FaRegTrashAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { RiFileListLine } from "react-icons/ri";

import UserContext from '../../contexts/UserContext'

function Post({img, userAllName, userName, date, content, postId}) {
    const {user, setUser} = useContext(UserContext);
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);

    const [isPostOwner, setIsPostOwner] = useState(false);

    const [commentsCount, setCommentsCount] = useState();
    const [likedCount, setLikedCount] = useState();
    const [retweetedCount, setRetweetedCount] = useState();
    const [viewsCount, setViewsCount] = useState();
    const [inList, setInList] = useState(false);

    useEffect(()=>{
        if (userName != undefined) {
            let postUser;
            fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(info=>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == userName) {
                        postUser = info[i];                    
                        for (let j = 0; j < postUser.content.posts.length; j++) {
                            if (postUser.content.posts[j].PostId == postId) {
                                if(postUser.id == user.id){
                                    setIsPostOwner(true);
                                }

                                if (postUser.content.posts[j].likesUserId.includes(user.id)) {
                                    setLiked(true);
                                }else{
                                    setLiked(false);
                                }

                                if (postUser.content.posts[j].retweetsUsersId.includes(user.id)) {
                                    setRetweeted(true);
                                }else{
                                    setRetweeted(false);
                                }

                                if (user.content.lists.includes(postUser.content.posts[j].PostId)) {
                                    setInList(true);
                                }else{
                                    setInList(false);
                                }

                                if(!postUser.content.posts[j].viewsUserId.includes(user.id)){
                                    postUser.content.posts[j].viewsUserId.push(user.id)
                                    fetch(`http://localhost:3000/users/${postUser.id}`,{
                                        method:'PUT',
                                        body: JSON.stringify(postUser),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                }

                                setCommentsCount(postUser.content.posts[j].comments.length);
                                setLikedCount(postUser.content.posts[j].likesUserId.length);
                                setRetweetedCount(postUser.content.posts[j].retweetsUsersId.length);
                                setViewsCount(postUser.content.posts[j].viewsUserId.length);
                            }
                        }   
                    }
                }
            })
        }
    },[userName])

    const changeLikePost = async()=>{
        if(liked){
            let postUser;
            let currentPost;
            let thisUser = user;
            fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(info=>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == userName) {
                        postUser = info[i];                    
                        for (let j = 0; j < postUser.content.posts.length; j++) {
                            if (postUser.content.posts[j].PostId == postId) {
                                postUser.content.posts[j].likesUserId = postUser.content.posts[j].likesUserId.filter(item => item !== user.id);
                                currentPost = postUser.content.posts[j];
                                if (postUser.id == thisUser.id) {
                                    thisUser = postUser;
                                }
                                thisUser.content.likes = thisUser.content.likes.filter(item => item.userId !== postUser.id && item.PostId !== currentPost.PostId)
                                setUser(thisUser)
                            }
                        }   
                    }
                }
                if(postUser.id !== thisUser.id){
                    fetch(`http://localhost:3000/users/${postUser.id}`,{
                        method:'PUT',
                        body: JSON.stringify(postUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

                fetch(`http://localhost:3000/users/${thisUser.id}`,{
                    method:'PUT',
                    body: JSON.stringify(thisUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setLiked(false);
                setLikedCount(currentPost.likesUserId.length);
            })
        }else{
            let postUser;
            let currentPost;
            let thisUser = user;
            await fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(info=>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == userName) {
                        postUser = info[i];                    
                        for (let j = 0; j < postUser.content.posts.length; j++) {
                            if (postUser.content.posts[j].PostId == postId) {
                                postUser.content.posts[j].likesUserId.push(user.id);
                                currentPost = postUser.content.posts[j];
                                if(postUser.id == thisUser.id){
                                    thisUser = postUser;
                                }
                                thisUser.content.likes.push({
                                    userId: postUser.id,
                                    PostId: currentPost.PostId
                                })
                                setUser(thisUser)
                            }
                        }   
                    }
                }
                if(currentPost.id !== thisUser.id){
                    fetch(`http://localhost:3000/users/${postUser.id}`,{
                        method:'PUT',
                        body: JSON.stringify(postUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

                fetch(`http://localhost:3000/users/${thisUser.id}`,{
                    method:'PUT',
                    body: JSON.stringify(thisUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setLiked(true);
                setLikedCount(currentPost.likesUserId.length);
            })
        }
    }

    const changeRetweetPost = ()=>{
        if(retweeted){
            let postUser;
            let currentPost;
            let thisUser = user;
            fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(info=>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == userName) {
                        postUser = info[i];                    
                        for (let j = 0; j < postUser.content.posts.length; j++) {
                            if (postUser.content.posts[j].PostId == postId) {
                                postUser.content.posts[j].retweetsUsersId = postUser.content.posts[j].retweetsUsersId.filter(item => item !== user.id);
                                currentPost = postUser.content.posts[j];
                                if(postUser.id == thisUser.id){
                                    thisUser = postUser;
                                }
                                thisUser.content.reTweetedPosts = thisUser.content.reTweetedPosts.filter(item => item.userId !== postUser.id && item.PostId !== currentPost.PostId)
                                setUser(thisUser)
                            }
                        }   
                    }
                }
                if(currentPost.id !== thisUser.id){
                    fetch(`http://localhost:3000/users/${postUser.id}`,{
                        method:'PUT',
                        body: JSON.stringify(postUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

                fetch(`http://localhost:3000/users/${thisUser.id}`,{
                    method:'PUT',
                    body: JSON.stringify(thisUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setRetweeted(false);
                setRetweetedCount(currentPost.retweetsUsersId.length);
            })
        }else{
            let postUser;
            let currentPost;
            let thisUser = user;
            fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(info=>{
                for (let i = 0; i < info.length; i++) {
                    if (info[i].username == userName) {
                        postUser = info[i];                    
                        for (let j = 0; j < postUser.content.posts.length; j++) {
                            if (postUser.content.posts[j].PostId == postId) {
                                postUser.content.posts[j].retweetsUsersId.push(user.id);
                                currentPost = postUser.content.posts[j];
                                if(postUser.id == thisUser.id){
                                    thisUser = postUser;
                                }
                                thisUser.content.reTweetedPosts.push({
                                    userId: postUser.id,
                                    PostId: currentPost.PostId
                                })
                                setUser(thisUser)
                            }
                        }   
                    }
                }
                if(currentPost.id !== thisUser.id){
                    fetch(`http://localhost:3000/users/${postUser.id}`,{
                        method:'PUT',
                        body: JSON.stringify(postUser),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

                fetch(`http://localhost:3000/users/${thisUser.id}`,{
                    method:'PUT',
                    body: JSON.stringify(thisUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setRetweeted(true);
                setRetweetedCount(currentPost.retweetsUsersId.length);
            })
        }
    }

    const deletePost = async()=>{
        let postUser;
        let commentFromUser;
        await fetch(`http://localhost:3000/users`)
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < info.length; i++) {
                if (info[i].username == userName) {
                    postUser = info[i];                    
                    for (let j = 0; j < postUser.content.posts.length; j++) {
                        if (postUser.content.posts[j].PostId == postId) {
                            for (let k = 0; k < info.length; k++) {
                                if(postUser.content.posts[j].commentFrom != null){
                                    if (info[k].id == postUser.content.posts[j].commentFrom.userId) {
                                        for (let l = 0; l < info[k].content.posts.length; l++) {
                                            if (info[k].content.posts[l].PostId == postUser.content.posts[j].commentFrom.PostId) {
                                                commentFromUser = info[k]
                                                let index = commentFromUser.content.posts[l].comments.indexOf({ userId:postUser.id, PostId:postUser.content.posts[j].PostId});
                                                commentFromUser.content.posts[l].comments.splice(index, 1);
    
                                                console.log(commentFromUser)
                                                fetch(`http://localhost:3000/users/${commentFromUser.id}`,{
                                                    method:'PUT',
                                                    body: JSON.stringify(commentFromUser),
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    }
                                                })
    
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                            let index = postUser.content.posts.indexOf(postUser.content.posts[j]);
                            postUser.content.posts.splice(index, 1);
                            setUser(postUser)
                            break;
                        }
                    }
                    break;
                }
            }
        })
        await fetch(`http://localhost:3000/users/${postUser.id}`,{
            method:'PUT',
            body: JSON.stringify(postUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        location.reload();
    }

    const changeList = ()=>{
        let postUser;
        let thisUser = user;
        fetch(`http://localhost:3000/users`)
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < info.length; i++) {
                if (info[i].username == userName) {
                    postUser = info[i];                    
                    for (let j = 0; j < postUser.content.posts.length; j++) {
                        if (postUser.content.posts[j].PostId == postId) {
                            if(inList){
                                let index = thisUser.content.lists.indexOf(postUser.content.posts[j].PostId);
                                thisUser.content.lists.splice(index, 1);
                                setInList(false)
                            }else{
                                thisUser.content.lists.push(postUser.content.posts[j].PostId);
                                setInList(true)
                            }
                            setUser(thisUser)
                        }
                    }   
                }
            }

            fetch(`http://localhost:3000/users/${thisUser.id}`,{
                method:'PUT',
                body: JSON.stringify(thisUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
        fetch(`http://localhost:3000/users/${thisUser.id}`)
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < info.content.posts.length; i++) {
                if(info.content.posts[i].id == postId){
                    info.content.lists.push(postId)
                    console.log(info)
                    fetch(`http://localhost:3000/users/${thisUser.id}`,{
                        method: 'PUT',
                        body: JSON.stringify(info),
                        header:{
                            'Content-Type':'application/json'
                        }
                    })
                }
            }
        })
    }

    return (
         <div title='post' className=' hover:bg-accent-2 hover:bg-opacity-10 flex text-lg flex-col w-full border-b-background-2 border-b-2'>
            <div className='flex '>
                <div className=' m-4 mb-1 h-16 w-[10%]'>
                    <img className='rounded-full object-cover ' src={img} alt="" />
                </div>
                <div className=' w-[90%] text-background-1 py-3'>
                    <div><a href={`http://localhost:5173/${userName}`} className=' decoration-2 hover:underline decoration-background-1 font-bold'>{userAllName}</a> <span className=' text-background-3'>{"@" + userName} · {date}</span></div>
                    <div>{content}</div>
                </div>
            </div>
            <div className='cursor-pointer text-background-3 flex pr-36 pl-24 mb-2'>
                <a href={`http://localhost:5173/${userName}/${postId}`} className={'flex items-center mr-9 text-background-3 hover:text-[#1D9BF0] hover-to-child-lightNlue'}>
                    <div className='p-[6px] rounded-full'>
                        <FaRegComment className='cursor-pointer rounded-full text-[20px]'/>
                    </div>
                    <p className='ml-1 text-[15px]'>{commentsCount != 0 && commentsCount}</p>
                </a>
                <div onClick={()=>changeRetweetPost()} className={retweeted ? 'flex items-center mr-9 text-background-3 text-[#00BA7C] hover-child-retweet' :
                                                                              'flex items-center mr-9 text-background-3 hover:text-[#00BA7C] hover-to-child-retweet'}>
                    <div className='p-[6px] rounded-full'>
                        <FaRetweet className='cursor-pointer rounded-full text-[20px]'/>
                    </div>
                    <p className='ml-1 text-[15px]'>{retweetedCount != 0 && retweetedCount}</p>
                </div>
                <div onClick={()=>changeLikePost()} className={liked ? 'flex items-center mr-9 text-background-3 text-[#F91880] hover-to-child-like' :
                                                                       'flex items-center mr-9 text-background-3 hover:text-[#F91880] hover-to-child-like'}>
                    <div className='p-[6px] rounded-full'>
                        <AiOutlineHeart className='cursor-pointer rounded-full text-[20px]'/>
                    </div>
                    <p className='ml-1 text-[15px]'>{likedCount != 0 && likedCount}</p>
                </div>
                <div className='flex items-center mr-9 text-background-3 hover:text-[#1D9BF0] hover-to-child-lightNlue'>
                    <div className='p-[6px] rounded-full'>
                        <IoIosStats className='cursor-pointer rounded-full text-[20px]'/>
                    </div>
                    <p className='ml-1 text-[15px]'>{viewsCount != 0 && viewsCount}</p>
                </div>
                <div onClick={()=>changeList()} className={inList ? 'flex items-center mr-9 text-background-3 text-[#1D9BF0] hover-to-child-lightNlue' :
                                                                    'flex items-center mr-9 text-background-3 hover:text-[#1D9BF0] hover-to-child-lightNlue'}>
                    <div className='p-[6px] rounded-full'>
                        <RiFileListLine className='cursor-pointer rounded-full text-[20px]'/>
                    </div>
                </div>  
                { isPostOwner &&
                    <div onClick={()=>deletePost()} className={'flex items-center mr-9 text-background-3 hover:text-[#F91880] hover-to-child-like'}>
                        <div className='p-[6px] rounded-full'>
                            <FaRegTrashAlt className='cursor-pointer rounded-full text-[20px]'/>
                        </div>
                    </div>
                }               
            </div>
         </div>
    );
}

export default Post