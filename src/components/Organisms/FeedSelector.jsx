import React, { useState, useEffect } from 'react';

function FeedSelector({ feedState, setFeedState }) {
    const [forYouButtonClass, setForYouButtonClass] = useState('flex w-1/2 text-lg ease-in transition-colors duration-300 hover:bg-background-2 text-background-1 font-bold items-end')
    const [followingButtonClass, setFollowingButtonClass] = useState("flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-background-2 text-background-3")
    const [forYouLineClass, setForYouLineClass] = useState('border-b-4 border-b-accent m-auto my-0 pb-4')
    const [followingLineClass, setFollowingLineClass] = useState("")

    const changeFeed = state=>{
        if (state == 'forYou') {
            setFeedState('forYou');
            setForYouButtonClass('flex w-1/2 text-lg ease-in transition-colors duration-300 hover:bg-background-2 text-background-1 font-bold items-end')
            setFollowingButtonClass('flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-background-2 text-background-3')
            setForYouLineClass('border-b-4 border-b-accent m-auto my-0 pb-4')
            setFollowingLineClass("")
        }else if (state == 'following'){
            setFeedState('following');
            setFollowingButtonClass('flex w-1/2 text-lg ease-in transition-colors duration-300 hover:bg-background-2 text-background-1 font-bold items-end')
            setForYouButtonClass('flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-background-2 text-background-3')
            setForYouLineClass("")
            setFollowingLineClass('border-b-4 border-b-accent m-auto my-0 pb-4')
        }
    }

    return (
         <div className='flex flex-col w-full h-36 border-b-2 border-b-background-2'>
            <div className=' h-1/2 text-background-1 text-2xl font-bold p-4'><h1>Home</h1></div>
            <div className=' flex w-full h-1/2'>
                <div onClick={()=>changeFeed('forYou')} className={forYouButtonClass}><div className={forYouLineClass}>For you</div></div>
                <div onClick={()=>changeFeed('following')}className={followingButtonClass}><div className={followingLineClass}>Following</div></div>
            </div>
         </div>
    );
}

export default FeedSelector