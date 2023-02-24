import React, { useState, useEffect } from 'react';

function Notifications({ title, border = true }) {
    return (
        <div className=''>
           <p className={border ? 'text-white font-semibold text-2xl p-4 border-soft-black border-b-[1px]' : 'text-white font-semibold text-2xl p-4 border-soft-black '}>{title}</p>
        </div>
    )
}

export default Notifications