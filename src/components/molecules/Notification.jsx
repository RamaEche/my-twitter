import React from 'react';
import { BsTwitter } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

function Notification({ content, img, fullDate }) {

    return (
        <div className=' flex text-white border-b-[1px] border-super-soft-black'>
            <div className=' text-[30px] my-5 ml-12 mr-5'>{img == 'post' ? <FaComment/> : img == 'like' ? <AiFillHeart/> : <BsTwitter/>}</div>
            <div>
                <div className=' text-lg mr-14 mt-4'>{content}</div>
                <div className=' text-base text-mega-soft-black mb-2'>{fullDate}</div>
            </div>
        </div>
    );
}

export default Notification