import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";

function Notifications({ title, border = true, back = false }) {
    return (
        <div className={border ? 'border-background-2 border-b-[1px]' : ''}>
            <div className={back ? 'flex items-center': ''}>
                {back && <a href={document.referrer} className='m-3 text-xl hover:bg-background-2 transition-colors hover:bg-opacity-20 p-3 rounded-full'>
                            <FaArrowLeft className=''/>
                        </a>}
            <p className='text-background-1 font-semibold text-2xl p-4 '>{title}</p>
            </div>
        </div>
    )
}

export default Notifications