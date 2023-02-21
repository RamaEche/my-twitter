import React, { useState, useEffect, useRef } from 'react';

import SerchResults from "./SerchResults";

function SerchBar() {
    let [serchBarFocus, setSerchBarFocus] = useState();
    let [panelState, setPanelState] = useState("invisible");
    const [items, setItems] = useState([]);
    const serchInput = useRef(null);

    const refreshResults = ()=>{
        let newItems = [];
        let finalItems = [];
        //traer usuarios
        fetch("http://localhost:3000/users/")
        .then(response => response.json())
        .then(info=>{
            for (let i = 0; i < info.length; i++) {
                newItems.push({
                    img:info[i].img,
                    userAllName:info[i].userAllName,
                    tag:"@" + info[i].username,
                    userName: info[i].username
                })
            }
            console.log(serchInput.current.value)
            if (serchInput.current.value !== "") {
                for (let i = 0; i < newItems.length; i++) {
                    if(JSON.stringify(newItems[i].userAllName).includes(serchInput.current.value)){
                        finalItems.push(newItems[i])
                    }else if(JSON.stringify(newItems[i].tag).includes(serchInput.current.value)){
                        finalItems.push(newItems[i])
                    }
                }
            }else{
                finalItems = newItems;
            }
            setItems(finalItems);
        })
    }

    const handleChange = (event) => {
        refreshResults();
    }

    return (
        <div>
            <div className=" bg-mygray w-full h-[55px] rounded-[50px] flex">
                <img className="w-[60px] absolute p-4 pl-5" src="https://svgsilh.com/svg/3331255-999999.svg"/>
                <input ref={serchInput} onChange={handleChange} onFocus={()=>{setSerchBarFocus(true); setPanelState("visible")}} placeholder="Serch Twitter" className=" bg-mygray w-full h-full border-none rounded-[50px] text-white pl-[70px] font-lg placeholder:text-mega-soft-black focus:bg-black outline-twitter outline-1"/>
            </div>
            <SerchResults inputState={serchBarFocus} items={items} onUnFocus={setSerchBarFocus} panelState={panelState} setPanelState={setPanelState}/>
        </div>
    )
}

export default SerchBar