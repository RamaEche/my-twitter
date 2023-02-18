import React, { useState, useContext, useEffect } from 'react'

function AccountsButton({ title }) {
    return (
        <div className='w-full p-3 hover:bg-super-soft-black'>
            <div className=' text-white flex items-start justify-start w-full font-semibold'>
                <p>{title}</p>
            </div>
        </div>
    );
}

export default AccountsButton