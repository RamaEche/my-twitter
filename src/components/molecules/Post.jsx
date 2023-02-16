import React from 'react';

import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet, FaRegComment } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { GiMoebiusTriangle } from "react-icons/gi";

function Post({img, userAllName, tag, date, content}) {
    return (
         <div title='post' className=' flex text-lg flex-col w-full border-b-super-soft-black border-b-2'>
            <div className='flex'>
                <div className=' m-4 mb-1 w-16 h-16'>
                    <img className=' rounded-full w-full h-full object-cover' src={img} alt="" />
                </div>
                <div className=' text-white py-3'>
                    <div><span className=' font-bold'>{userAllName}</span> <span className=' text-mega-soft-black'>{tag} · {date}</span></div>
                    <div>{content}</div>
                </div>
            </div>
            <div className=' cursor-pointer text-mega-soft-black flex justify-between h-10 pr-36 pl-24'>
                <FaRegComment className=' cursor-pointer text-mega-soft-black rounded-full w-6 h-6'/>
                <FaRetweet className=' cursor-pointer text-mega-soft-black rounded-full w-6 h-6'/>
                <AiOutlineHeart className=' cursor-pointer text-mega-soft-black rounded-full w-6 h-6'/>
                <IoIosStats className=' cursor-pointer text-mega-soft-black rounded-full w-6 h-6'/>
                <HiOutlineUpload className=' cursor-pointer text-mega-soft-black rounded-full w-6 h-6'/>
                <GiMoebiusTriangle className=' cursor-pointer text-mega-soft-black rounded-full w-6 h-6'/>
            </div>
         </div>
    );
}

export default Post