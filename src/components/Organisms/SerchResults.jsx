import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

function SerchResults({ inputState }) {
    const title = useRef(null);
    const [items, setItems] = useState([{ img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Pepe Gonzales", userName: "Pepe", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Luis Borgas", userName: "Luis2", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Juancho Tito", userName: "Juancho4", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Pipi Llo", userName: "Pipi32", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "El Pan cito", userName: "Pan", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Pipi Llo", userName: "Pipi32", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Pipi Llo", userName: "Pipi32", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Pipi Llo", userName: "Pipi32", tag:"@Pipi32" },
        { img: "https://pbs.twimg.com/profile_images/1369653797635686400/zCHRcB-d_400x400.jpg", userAllName: "Pipi Llo", userName: "Pipi32", tag:"@Pipi32" }]);

    useEffect(() => {
        if(title !== null || title !== undefined){
            if (inputState) {
                title.valueOf().current.classList.add("visible");
                title.valueOf().current.classList.remove("invisible");
            } else if (inputState == false) {
                title.valueOf().current.classList.add("invisible");
                title.valueOf().current.classList.remove("visible");
            } else {
            }
        }
    }, [inputState]);

    return (
        <div ref={title} className=" invisible absolute w-[390px] min-h-[100px] max-h-[500px] rounded-[10px] bg-black shadow-white shadow-[0_0px_25px_-15px_rgba(0,0,0,0.3)] overflow-auto">
            {items.length == 0 ?(
                <p className=" text-mega-soft-black mt-5 font-arial text-center text-base">Try searching for people, topics, or keywords</p>
            ) : (
                items.map((item, index)=>(
                    <div key={index} className=" w-full h-[100px] flex text-center text-white font-arial hover:bg-super-soft-black">
                        <img className="w-[100px] h-[100px] rounded-full p-4" src={item.img} />
                        <div className="flex flex-col items-start justify-center">
                            <p className=' font-semibold text-lg leading-5'>{item.userAllName}</p>
                            <p className=' text-mega-soft-black leading-5'>{item.tag}</p>
                            <p className=' text-mega-soft-black leading-5'>Descripcion Descripcion Descripcion</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default SerchResults