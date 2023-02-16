import React from 'react';
import Notification from "../molecules/Notification";

function NotificationsFeed() {
    return (
        <div>
            <Notification content='La cuenta se creo exitosamente La cuenta se creo exitosamente se creo exitosamente.' img='twitter'/>
            <Notification content='El tweet se envio exitosamente.' img='post'/>
            <Notification content='A @pepe le gusto tu tweet:"Hola mundo".' img='like'/>
            <Notification content='@pepe ahora te sigue.' img='twitter'/>
        </div>
    );
}

export default NotificationsFeed