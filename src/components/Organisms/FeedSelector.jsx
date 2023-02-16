import React from 'react';

function FeedSelector() {
    return (
         <div className='flex flex-col w-full h-36 border-b-2 border-b-super-soft-black'>
            <div className=' h-1/2 text-white text-2xl font-bold p-4'><h1>Home</h1></div>
            <div className=' flex w-full h-1/2'>
                <div className=' flex w-1/2 text-lg ease-in duration-300 hover:bg-super-soft-black text-white font-bold items-end'><div className=' border-b-4 border-b-twitter m-auto my-0 pb-4'>For you</div></div>
                <div className=' flex justify-center items-center w-1/2 text-lg ease-in duration-100 hover:bg-super-soft-black text-mega-soft-black'>Following</div>
            </div>
         </div>
    );
}

export default FeedSelector