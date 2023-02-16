import React, { useState, useEffect } from 'react';

function Notifications({ title }) {
    return (
        <div className=''>
           <p className=' text-white font-semibold text-2xl p-4 border-b-[1px] border-super-soft-black'>{title}</p>
        </div>
    )
}

export default Notifications