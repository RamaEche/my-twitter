import React, { useState, useEffect } from 'react';

function DisplaySettings() {

    return (
        <div className=' text-white mx-4'>
            <h1 className=' text-2xl font-semibold mt-3'>Display</h1>
            <p className=' text-mega-soft-black text-sm mt-3'>Select your favorite display form, buttons, background, text and panels will be affected.</p>
            <h2 className=' text-2xl font-semibold mt-3'>Color</h2>
            <div className=' flex justify-around my-5'>
                <button className=' w-[40px] h-[40px] bg-[#1D9BF0] rounded-full'></button>
                <button className=' w-[40px] h-[40px] bg-[#FFD400] rounded-full'></button>
                <button className=' w-[40px] h-[40px] bg-[#F91880] rounded-full'></button>
                <button className=' w-[40px] h-[40px] bg-[#7856FF] rounded-full'></button>
                <button className=' w-[40px] h-[40px] bg-[#FF7A00] rounded-full'></button>
                <button className=' w-[40px] h-[40px] bg-[#00BA7C] rounded-full'></button>
            </div>
            <h2 className=' text-2xl font-semibold mt-7'>Background</h2>
            <div className=' flex justify-around mt-4 mb-9'>
                <button className=' w-[200px] h-[65px] bg-[#FFFFFF] rounded-sm border-2 border-mega-soft-black text-black font-semibold text-lg flex items-center'>
                    <div className=' ml-5 mr-10 rounded-full border-[3px] border-[#B9CAD3] h-5 w-5'></div>Default
                </button>
                <button className=' w-[200px] h-[65px] bg-[#15202B] rounded-sm border-2 border-mega-soft-black text-white font-semibold text-lg flex items-center'>
                <div className=' ml-5 mr-10 rounded-full border-[3px] border-[#B9CAD3] h-5 w-5'></div>Dim
                </button>
                <button className=' w-[200px] h-[65px] bg-[#000000] rounded-sm border-2 border-mega-soft-black text-white font-semibold text-lg flex items-center'>
                <div className=' ml-5 mr-10 rounded-full border-[3px] border-[#B9CAD3] h-5 w-5'></div>Lights out
                </button>
            </div>
            <div className=' flex mt-4 mb-2'>
                <button className=' border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Save</button>
                <button className=' ml-2 border-2 border-mega-soft-black py-2 px-8 rounded-full font-semibold'>Discart</button>
            </div>
            <p className='text-red text-opacity-50 text-sm mt-3'>The changes doesn't save automatically</p>
        </div>
    )
}

export default DisplaySettings