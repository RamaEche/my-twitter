import React, { useState, useEffect } from 'react';

import { MdKeyboardArrowRight } from "react-icons/md";

function SettingsSelector({ title, selected = false}) {
    return (
        <div className={selected ? ' text-white flex justify-between items-center h-[53px] text-[19px] transition bg-mygray' : ' text-white flex justify-between transition items-center h-[53px] text-[19px] hover:bg-mygray'}>
            <p className=' ml-5 m-auto mx-0'>{title}</p>
            <div className={selected ? ' border-twitter border-r-[3px] h-full flex items-center' : ' h-full flex items-center'}>
                <MdKeyboardArrowRight className='text-[30px] mr-2 text-mega-soft-black'/>
            </div>
        </div>
    )
}

export default SettingsSelector