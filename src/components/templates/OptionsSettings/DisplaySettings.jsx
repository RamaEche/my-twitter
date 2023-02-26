import React, { useState, useEffect, useContext } from 'react';
import { BsCheck } from "react-icons/bs";
import Cookies from 'js-cookie'

import ColorModeContext from '../../../contexts/ColorModeContext'

function DisplaySettings() {
    const [bgSelected, setBgSelected] = useState();
    const [colorSelected, setColorSelected] = useState();

    const [whiteCheckbox, setWhiteCheckbox] = useState();
    const [dimCheckbox, setDimCheckbox] = useState();
    const [lightsOutCheckbox, setLightsOutCheckbox] = useState();

    const {colorMode, setColorMode} = useContext(ColorModeContext);

    useEffect(()=>{
        colorMode != undefined && chargeLastSaved();
    }, [colorMode])

    const onChangeWiteCheckbox = e=>{
        if(e.target.checked == true) {
            setBgSelected("white");
            setWhiteCheckbox(true);
            setDimCheckbox(false);
            setLightsOutCheckbox(false);
        }
    }

    const onChangeDimCheckbox = e=>{
        if(e.target.checked == true) {
            setBgSelected("dim");
            setWhiteCheckbox(false);
            setDimCheckbox(true);
            setLightsOutCheckbox(false);
        }
    }

    const onChangelightsOutCheckbox = e=>{
        if(e.target.checked == true) {
            setBgSelected("dark");
            setWhiteCheckbox(false);
            setDimCheckbox(false);
            setLightsOutCheckbox(true);
        }
    }

    const chargeLastSaved = ()=>{
        switch (colorMode.background) {
            case "white":
                setBgSelected("white");
                setWhiteCheckbox(true);
                setDimCheckbox(false);
                setLightsOutCheckbox(false);
            break;
            
            case "dim":
                setBgSelected("dim");
                setWhiteCheckbox(false);
                setDimCheckbox(true);
                setLightsOutCheckbox(false);
            break;
            
            case "dark":
                setBgSelected("dark");
                setWhiteCheckbox(false);
                setDimCheckbox(false);
                setLightsOutCheckbox(true);
            break;
        
            default:
            break;
        }
        setColorSelected(colorMode.color)
    }

    const save = ()=>{
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(info => {
            for (let i = 0; i < info.length; i++) {
                if (info[i].sessionid == Cookies.get('sessionId')) {
                    info[i].settings.display.color = colorSelected;
                    info[i].settings.display.background = bgSelected;

                    setColorMode({
                        background: info[i].settings.display.background,
                        color: info[i].settings.display.color
                    });

                    fetch(`http://localhost:3000/accounts/${info[i].id}`,{
                        method: 'PUT',
                        body: JSON.stringify(info[i]),
                        headers:{
                            'Content-type':'application/json'
                        }
                    })
                    .catch(error => console.log(error))
                }
            }
            window.location.replace('/settings');
        })
    }

    return (
        <div className=' text-background-1 mx-4'>
            <h1 className=' text-2xl font-semibold mt-3'>Display</h1>
            <p className=' text-background-3 text-sm mt-3'>Select your favorite display form, buttons, background, text and panels will be affected.</p>
            <h2 className=' text-2xl font-semibold mt-3'>Color</h2>
            <div className=' flex justify-around my-5'>
                <button onClick={()=>setColorSelected("lightBlue")} className=' w-[40px] h-[40px] bg-[#1D9BF0] rounded-full'>{colorSelected == "lightBlue" && <BsCheck className=' text-[#fff] relative left-[4.5px] top-[1px] text-[30px]'/>}</button>
                <button onClick={()=>setColorSelected("yellow")} className=' w-[40px] h-[40px] bg-[#FFD400] rounded-full'>{colorSelected == "yellow" && <BsCheck className=' text-[#fff] relative left-[4.5px] top-[1px] text-[30px]'/>}</button>
                <button onClick={()=>setColorSelected("pink")} className=' w-[40px] h-[40px] bg-[#F91880] rounded-full'>{colorSelected == "pink" && <BsCheck className=' text-[#fff] relative left-[4.5px] top-[1px] text-[30px]'/>}</button>
                <button onClick={()=>setColorSelected("greyBlue")} className=' w-[40px] h-[40px] bg-[#7856FF] rounded-full'>{colorSelected == "greyBlue" && <BsCheck className=' text-[#fff] relative left-[4.5px] top-[1px] text-[30px]'/>}</button>
                <button onClick={()=>setColorSelected("orange")} className=' w-[40px] h-[40px] bg-[#FF7A00] rounded-full'>{colorSelected == "orange" && <BsCheck className=' text-[#fff] relative left-[4.5px] top-[1px] text-[30px]'/>}</button>
                <button onClick={()=>setColorSelected("green")} className=' w-[40px] h-[40px] bg-[#00BA7C] rounded-full'>{colorSelected == "green" && <BsCheck className=' text-[#fff] relative left-[4.5px] top-[1px] text-[30px]'/>}</button>
            </div>
            <h2 className=' text-2xl font-semibold mt-7'>Background</h2>
            <div className=' flex justify-around mt-4 mb-9'>
                <label className=' w-[200px] h-[65px] bg-[#FFFFFF] text-[#16181C] rounded-sm border-2 border-background-3 font-semibold text-lg flex items-center'>
                    <input checked={whiteCheckbox} onChange={e=>onChangeWiteCheckbox(e)} type="checkbox" className=' ml-5 mr-[40px mr-[40px] border-[3px] border-[#B9CAD3] h-5 w-5'/>Default
                </label>
                <label className=' w-[200px] h-[65px] bg-[#15202B] text-[#E7E7E8] rounded-sm border-2 border-background-3 font-semibold text-lg flex items-center'>
                    <input checked={dimCheckbox} onChange={e=>onChangeDimCheckbox(e)} type="checkbox" className=' ml-5 mr-[40px mr-[40px] border-[3px] border-[#B9CAD3] h-5 w-5'/>Dim
                </label>
                <label className=' w-[200px] h-[65px] bg-[#000000] text-[#E7E7E8] rounded-sm border-2 border-background-3 font-semibold text-lg flex items-center'>
                    <input checked={lightsOutCheckbox} onChange={e=>onChangelightsOutCheckbox(e)} type="checkbox" className=' ml-5 mr-[40px mr-[40px] border-[3px] border-[#B9CAD3] h-5 w-5'/>Lights out
                </label>
            </div>
            <div className=' flex mt-4 mb-2'>
                <button onClick={()=>save()} className=' border-2 border-background-3 py-2 px-8 rounded-full font-semibold'>Save</button>
                <button onClick={()=>chargeLastSaved()} className=' ml-2 border-2 border-background-3 py-2 px-8 rounded-full font-semibold'>Discart</button>
            </div>
            <p className='text-red text-opacity-50 text-sm mt-3'>The changes doesn't save automatically</p>
        </div>
    )
}

export default DisplaySettings