import React, { useState, useEffect } from 'react';

import { MdKeyboardArrowRight } from "react-icons/md";

function SettingsSelector({ title, selected = false, onClick}) {
    return (
        <div onClick={()=>onClick()} className={selected ? ' text-background-1 flex justify-between items-center h-[53px] text-[19px] transition bg-background-4' : ' text-background-1 flex justify-between transition items-center h-[53px] text-[19px] hover:bg-background-4'}>
            <p className=' ml-5 m-auto mx-0'>{title}</p>
            <div className={selected ? ' border-accent border-r-[3px] h-full flex items-center' : ' h-full flex items-center'}>
                <MdKeyboardArrowRight className='text-[30px] mr-2 text-background-3'/>
            </div>
        </div>
    )
}

export default SettingsSelector