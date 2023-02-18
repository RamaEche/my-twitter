import React, { useState, useEffect } from 'react';

function ArticleSelector({ elements }) {

    return (
        <article className=' h-full w-[470px] border-l-2 border-super-soft-black'>
            {elements !== undefined && (
                elements.map((item, index) => (
                    <div key={index}>{item}</div>
                ))
            )}
        </article>
    )
}

export default ArticleSelector