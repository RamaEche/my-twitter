import React, { useContext, useEffect, useState } from 'react';

function ShowMoreTweets({ ShowNewPosts }) {
    return (
        <div onClick={()=>ShowNewPosts()} className=' cursor-pointer flex justify-center hover:bg-min-soft-black mt-1 items-center text-twitter  w-full h-14 border-b-2 border-b-soft-black'>
            <p type="button" className=''>Sow more</p>
        </div>
    )
}

export default ShowMoreTweets