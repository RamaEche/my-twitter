import React, { useContext, useEffect, useState } from 'react';
import Notification from "../molecules/Notification";
import UserContext from '../../contexts/UserContext'

function NotificationsFeed() {
    const {user, setUser} = useContext(UserContext);
    const [notification, setNotification] = useState([]);

    useEffect(()=>{
        if (user != undefined) {
            fetch(`http://localhost:3000/users/${user.id}`)
            .then(response => response.json())
            .then(info =>{
                setNotification(info.notifications)
            })   
        }
    }, [user])

    useEffect(()=>{
        console.log(notification)
    }, [notification])

    return (
        <div>
            {notification && notification.map((item, index) => (
                <div key={index}>
                    <Notification content={item.content} img={item.img} fullDate={item.fullDate}/>
                </div>
            ))}
        </div>
    );
}

export default NotificationsFeed