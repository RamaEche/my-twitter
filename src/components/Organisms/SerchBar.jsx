import React, { useState, useEffect } from 'react';

import SerchResults from "./SerchResults";

function SerchBar() {
    let [serchBarFocus, setSerchBarFocus] = useState();

    return (
        <div>
            <div className=" bg-mygray w-full h-[55px] rounded-[50px] flex">
                <img className="w-[60px] absolute p-4 pl-5" src="https://svgsilh.com/svg/3331255-999999.svg"/>
                <input onFocus={()=>setSerchBarFocus(true)} onBlur={()=>setSerchBarFocus(false)} placeholder="Serch Twitter" className=" bg-mygray w-full h-full border-none rounded-[50px] text-white pl-[70px] font-lg placeholder:text-mega-soft-black focus:bg-black outline-twitter outline-1"/>
            </div>
            <SerchResults inputState={serchBarFocus} />
        </div>
    )
}

export default SerchBar