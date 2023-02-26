import React, { useContext, useEffect, useState } from 'react';

function ShowMoreTweets({ ShowNewPosts }) {
    return (
        <div onClick={()=>ShowNewPosts()} className=' cursor-pointer flex justify-center hover:bg-background-5 mt-1 items-center text-accent  w-full h-14 border-b-2 border-b-background-2'>
            <p type="button" className=''>Sow more</p>
        </div>
    )
}

export default ShowMoreTweets