import { createContext } from "react";
import Cookies from 'js-cookie';

const createNotificationContext  = createContext(async (content, img)=>{
    let userIds = null;
    let user = null;
    
    await fetch('http://localhost:3000/accounts')
      .then(response => response.json())
      .then(info =>{
        for (let i = 0; i < info.length; i++) {
            if (info[i].sessionid == Cookies.get('sessionId')) {
                userIds = info[i].userId;
            }
        }
    })

    await fetch(`http://localhost:3000/users/${userIds}`)
    .then(response => response.json())
    .then(info =>{
        user = info;
    })

    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[date.getMonth()];
    let fullDate = `${date.getDate()} ${monthName} ${date.getFullYear()}`
    await user.notifications.push({ content, img, fullDate });

    await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
});

export default createNotificationContext;