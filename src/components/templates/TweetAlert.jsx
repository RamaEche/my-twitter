import React, { useState, useEffect } from 'react';

import TweetInput from "../Organisms/TweetInput";
import { RiCloseLine } from "react-icons/ri";

function TweetAlert({ className, close }) {
    return (
        <div className={'flex items-center justify-center absolute top-0 left-0 w-full h-full' + className}>
            <div className=' bg-twitter-gray text-white w-full h-full opacity-20 absolute top-0 left-0'>
            </div>
            <div className='absolute top-14 left-0 w-full h-full flex justify-center'>
                <div className='w-[680px] h-[170px] bg-black rounded-2xl'>
                    <RiCloseLine onClick={()=>close()} className=' text-white text-[23px] mx-4 mt-4'/>
                    <TweetInput/>
                </div>
            </div>
        </div>
    )
}

export default TweetAlert