import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

import LogedContext from '../../contexts/LogedContext'

import { GrTwitter } from "react-icons/gr";
import { MdClose } from "react-icons/md";

function SingIn({ className, close }) {
    const {AcountOpen, setAcountOpen} = useContext(LogedContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = async (data) =>{
        let userIdCount = null;
        let IdCount = null;

        let authorizedRegistration = true;
        await fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(info => {
            for (let i = 0; i < info.length; i++) {
                if(info[i].username == data.username){
                    console.log("Error. Ya existe un usuario con ese nombre");
                    authorizedRegistration = false;
                }
                if(info[i].email == data.email){
                    console.log("Error. Ya existe un usuario con ese email");
                    authorizedRegistration = false;
                }
            }
            IdCount = info.length + 1;
            userIdCount = info.length + 1;
        })
        .then(error =>{error && console.log(error)})

        if (authorizedRegistration == false) {
            return null
        }
        const sessionidGenerator = (username, password)=>{
          const replaceArray = {
            'a': '2',
            'e': '5',
            'i': '3',
            'o': '2',
            'u': '8'
          };
          const result = username.replace(/[aeiou]/g, (match) => replaceArray[match]);

          const resultArr = result.split('');
          const passwordArr = password.split('');
          let concatArr = resultArr.concat(passwordArr);
          concatArr.sort(() => Math.random() - 0.5);
          const sessionId = concatArr.join('');
          return sessionId;
        }

        let newSessionId = sessionidGenerator(data.username, data.password);
        await fetch('http://localhost:3000/accounts', {
          method: 'POST',
          body: JSON.stringify({ 
            id: IdCount, 
            userId: userIdCount,
            sessionid: newSessionId,
            email: data.email, 
            username: data.username, 
            userAllName: "User_" + data.username, 
            password: data.password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
        await fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify({ 
            id: userIdCount,
            username: data.username,
            biography:"Hello, i am new on twitter",
            Joinded:"xxxx xx xx",
            Following:[],
            Followers:[],
            notifications:[],
            content:{
                posts:[],
                reTweetedPosts:[],
                likes:[],
                lists:[]
            }
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            console.log('Account created!');
            Cookies.set('sessionId', newSessionId);
            setAcountOpen(true);
            close();
            console.log('login permitido');

          } else {
            console.error('Failed to create account');
          }
        })
    };
    
    return (
        <div className={' flex justify-center items-center bg-opacity-20 absolute bg-twitter-gray w-[100vw] h-[100vh]' + className}>
            <div className=' flex flex-col rounded-2xl w-[660px] h-[710px] bg-black  opacity-100'>
                <MdClose onClick={()=>close()} className='text-white text-2xl absolute m-4'/>
                <GrTwitter  className=' text-white mx-auto my-4 text-3xl'/>
                <div className=' m-auto mt-24'>
                    <div className='flex flex-col items-center'>
                        <h2 className=' text-white w-[320px] font-semibold text-4xl'>Únete a Twitter hoy mismo</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[320px]">
                            <input type="text" placeholder='nombre de usuario' {...register("username", { required: true })} className=' text-lg p-3 mt-9 h-14 rounded border-mega-soft-black border text-white placeholder:text-mega-soft-black bg-black outline-0 focus:border-twitter focus:border-[2px]'/>
                            <input type="text" placeholder='Correo electronico' {...register("email", { required: true, pattern: /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/})} className=' text-lg p-3 mt-6 h-14 rounded border-mega-soft-black border text-white placeholder:text-mega-soft-black bg-black outline-0 focus:border-twitter focus:border-[2px]'/>
                            <input type="password" placeholder='Contraseña' {...register("password", { required: true })} className=" text-lg p-3 mt-6 h-14 rounded border-mega-soft-black border text-white placeholder:text-mega-soft-black bg-black outline-0 focus:border-twitter focus:border-[2px]"/>
                            <input type="submit" value="Siguiente" className=" bg-white font-semibold mt-9 h-10 rounded-full"/>
                            <p className='text-l text-mega-soft-black mt-14'>¿No tienes una cuenta? <span className=' text-twitter'>Regístrate</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingIn