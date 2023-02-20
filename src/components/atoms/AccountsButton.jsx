import React, { useState, useContext, useEffect } from 'react'

function AccountsButton({ title, href, onClick }) {
    return (
        <div className='w-full p-3 hover:bg-super-soft-black'>
            <a href={href} onClick={onClick} className=' text-white flex items-start justify-start w-full font-semibold'>
                <p>{title}</p>
            </a>
        </div>
    );
}

export default AccountsButton