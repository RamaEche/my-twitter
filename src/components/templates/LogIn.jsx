import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";

import LogedContext from '../../contexts/LogedContext'

import { GrTwitter } from "react-icons/gr";
import { MdClose } from "react-icons/md";


function LogIn({ className, close }) {    
    const {AcountOpen, setAcountOpen} = useContext(LogedContext);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) =>{
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(info =>{
            for (let i = 0; i < info.length; i++) {
                if (info[i].username == data.emailorusername || info[i].email == data.emailorusername) {
                    if(info[i].password == data.password){
                        console.log('login permitido');
                        Cookies.set('sessionId', info[i].sessionid);
                        close();
                        setAcountOpen(true);
                        window.location.replace('/home');
                    }
                }                
            }
        })
    };
    
    return (
        <div className={' flex justify-center items-center bg-opacity-40 absolute bg-[#777] w-[100vw] h-[100vh]' + className}>
            <div className=' flex flex-col rounded-2xl w-[660px] h-[710px] bg-background  opacity-100'>
                <MdClose onClick={()=>close()} className='text-background-1 text-2xl absolute m-4'/>
                <GrTwitter  className=' text-twitter mx-auto my-4 text-3xl'/>
                <div className=' m-auto mt-24'>
                    <div className='flex flex-col items-center'>
                        <h2 className=' text-background-1 w-[320px] font-semibold text-4xl'>Inicia sesión en Twitter</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[320px]">
                            <input type="text" placeholder='Correo electronico o nombre de usuario' {...register("emailorusername", { required: true})} className=' bg-background text-lg p-3 mt-9 h-14 rounded border-background-3 border text-background-1 placeholder:text-background-3 outline-0 focus:border-accent focus:border-[2px]'/>
                            <input type="password" placeholder='Contraseña' {...register("password", { required: true })} className=" text-lg p-3 mt-6 h-14 rounded border-background-3 border text-background-1 placeholder:text-background-3 bg-background outline-0 focus:border-accent focus:border-[2px]"/>
                            <input type="submit" className=" bg-background-4 text-background font-semibold mt-9 h-10 rounded-full"/>
                            <p className='text-l text-background-3 mt-14'>¿No tienes una cuenta? <span className=' text-accent'>Regístrate</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn