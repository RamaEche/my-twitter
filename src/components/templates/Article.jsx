import React, { useState, useEffect } from 'react';

function Article({ elements }) {

    return (
        <article className=' h-full w-[470px]'>
            <div className=" my-2 mx-11">
                {elements !== undefined && (
                    elements.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))
                )}
            </div>
        </article>
    )
}

export default Article