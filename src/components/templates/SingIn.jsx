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
            password: data.password,
            settings:{
              display:{
                color: "lightBlue",
                background: "white"
              }
            }
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
        let date = new Date()
        let months = [
          "January", "February",
          "March", "April",
          "May", "June",
          "July", "August",
          "September", "October",
          "November", "December"
        ]
        let joindedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getYear() + 1900}`;
        
        await fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify({ 
            id: userIdCount,
            username: data.username,
            userAllName: "User_" + data.username,
            biography:"Hello, i am new on twitter.",
            img: "http://localhost:5173/defaultImage.png",
            banerImg: "",
            Joinded:joindedDate,
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
            Cookies.set('sessionId', newSessionId);
            setAcountOpen(true);
            window.location.replace('/home');

          } else {
            console.error('Failed to create account');
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
                        <h2 className=' text-background-1 w-[320px] font-semibold text-4xl'>Únete a Twitter hoy mismo</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[320px]">
                            <input type="text" placeholder='nombre de usuario' {...register("username", { required: true })} className=' text-lg p-3 mt-9 h-14 rounded border-background-3 border text-background-1 placeholder:text-background-3 bg-background outline-0 focus:border-accent focus:border-[2px]'/>
                            <input type="text" placeholder='Correo electronico' {...register("email", { required: true, pattern: /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/})} className=' text-lg p-3 mt-6 h-14 rounded border-background-3 border text-background-1 placeholder:text-background-3 bg-background outline-0 focus:border-accent focus:border-[2px]'/>
                            <input type="password" placeholder='Contraseña' {...register("password", { required: true })} className=" text-lg p-3 mt-6 h-14 rounded border-background-3 border text-background-1 placeholder:text-background-3 bg-background outline-0 focus:border-accent focus:border-[2px]"/>
                            <input type="submit" value="Siguiente" className=" bg-background-4 text-background font-semibold mt-9 h-10 rounded-full"/>
                            <p className='text-l text-background-3 mt-14'>¿No tienes una cuenta? <span className=' text-accent'>Regístrate</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingIn