import React, { useState, useEffect } from 'react';

function FeedSelector({ feedState, setFeedState }) {
    const [forYouButtonClass, setForYouButtonClass] = useState('flex w-1/2 text-lg ease-in transition-colors duration-300 hover:bg-super-soft-black text-white font-bold items-end')
    const [followingButtonClass, setFollowingButtonClass] = useState("flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-super-soft-black text-mega-soft-black")
    const [forYouLineClass, setForYouLineClass] = useState('border-b-4 border-b-twitter m-auto my-0 pb-4')
    const [followingLineClass, setFollowingLineClass] = useState("")

    const changeFeed = state=>{
        if (state == 'forYou') {
            setFeedState('forYou');
            setForYouButtonClass('flex w-1/2 text-lg ease-in transition-colors duration-300 hover:bg-super-soft-black text-white font-bold items-end')
            setFollowingButtonClass('flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-super-soft-black text-mega-soft-black')
            setForYouLineClass('border-b-4 border-b-twitter m-auto my-0 pb-4')
            setFollowingLineClass("")
        }else if (state == 'following'){
            setFeedState('following');
            setFollowingButtonClass('flex w-1/2 text-lg ease-in transition-colors duration-300 hover:bg-super-soft-black text-white font-bold items-end')
            setForYouButtonClass('flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-super-soft-black text-mega-soft-black')
            setForYouLineClass("")
            setFollowingLineClass('border-b-4 border-b-twitter m-auto my-0 pb-4')
        }
    }

    return (
         <div className='flex flex-col w-full h-36 border-b-2 border-b-super-soft-black'>
            <div className=' h-1/2 text-white text-2xl font-bold p-4'><h1>Home</h1></div>
            <div className=' flex w-full h-1/2'>
                <div onClick={()=>changeFeed('forYou')} className={forYouButtonClass}><div className={forYouLineClass}>For you</div></div>
                <div onClick={()=>changeFeed('following')}className={followingButtonClass}><div className={followingLineClass}>Following</div></div>
            </div>
         </div>
    );
}

export default FeedSelector