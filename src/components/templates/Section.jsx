import React, { useState, useEffect } from 'react';

function Section({ elements }) {

    return (
        <section className=' flex  flex-col w-[700px] h-full border-l-2 border-r-2 border-solid border-soft-black'>
            {elements !== undefined && (
                    elements.map((item, index) => (
                        <div className=' w-full' key={index}>{item}</div>
                    ))
                )}
        </section>
    )
}

export default Section