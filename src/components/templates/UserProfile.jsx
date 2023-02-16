import React, { useState, useEffect } from 'react';
import './UserProfile.css'

import { BiCalendar } from "react-icons/bi";

function UserProfile() {
    return (
        <div>
            <img src="https://pbs.twimg.com/profile_banners/1407378109259780099/1650130239/1500x500" alt="" />
            <div className=' flex items-center justify-end w-full h-[70px]'>
                <div className='  border-[1px] border-super-soft-black h-[40px] w-[130px] mr-4 rounded-full text-white flex items-center justify-center font-semibold'><p>Edit profile</p></div>
            </div>
            <div className=' flex justify-between'>
                <div className=' text-white ml-5 mt-6'>
                    <h1 className=' text-[22px] font-bold'>Fangames en español</h1>
                    <p className=' text-super-soft-black'>@FangamesE</p>
                    <br/>
                    <p>Esta es mi bio. me llamo Fangames en español<br/> y esta es mi cuenta.</p>
                    <div className='flex text-mega-soft-black items-center mt-2'><BiCalendar/><p className=' ml-1'>Joined June 2021</p></div>
                    <div className=' flex mt-2'>
                        <p><span>8</span><span className=' text-mega-soft-black'> Following</span></p>
                        <p className=' ml-6'><span>0</span><span className=' text-mega-soft-black'> Followers</span></p>
                    </div>
                </div>
                <div className=' bg-black w-[150px] h-[150px] relative top-[-150px] left-[-530px] rounded-full flex justify-center items-center'>
                    <img src="https://pbs.twimg.com/profile_images/1515382168297615363/AcVdOyML_400x400.jpg" className='rounded-full w-[95%]'/>
                </div>
            </div>
            <div className='w-full h-[60px] border-b-2 border-super-soft-black flex text-white font-semibold justify-evenly mt-4'>
                <div className=' hover:bg-mygray flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[4.5px]'></div>
                        <p className=''>Tweets</p>
                        <div className=' h-[4.5px] bg-twitter rounded-full'></div>
                    </div>
                </div>
                <div className=' hover:bg-mygray flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[4.5px]'></div>
                        <p className=' text-mygray-soft font-normal'>Tweets & replies</p>
                        <div className=' h-[4.5px] rounded-full'></div>
                    </div>
                </div>
                <div className=' hover:bg-mygray flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[4.5px]'></div>
                        <p className=' text-mygray-soft font-normal'>Media</p>
                        <div className=' h-[4.5px] rounded-full'></div>
                    </div>
                </div>
                <div className=' hover:bg-mygray hoverButton transition-all flex justify-center flex-col px-[55px]'>
                    <div className='flex flex-col h-full justify-between'>
                        <div className='h-[4.5px]'></div>
                        <p className=' text-mygray-soft font-medium'>Likes</p>
                        <div className=' h-[4.5px] rounded-full'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile