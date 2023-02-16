import React, { useState, useEffect } from 'react';

import Post from '../molecules/Post';

function ListsFeed() {
    return (
        <div>
            <Post img="https://xsgames.co/randomusers/assets/avatars/male/70.jpg" userAllName='Ramiro' tag='@ramiro' date='xxx xx xx' content='Hola mundo Hola mundoHola mundoHola mundoHola mundoHola mundoHola mundo'/>
            <Post img="https://xsgames.co/randomusers/assets/avatars/male/70.jpg" userAllName='Ramiro' tag='@ramiro' date='xxx xx xx' content='Hola'/>
            <Post img="https://xsgames.co/randomusers/assets/avatars/male/70.jpg" userAllName='Ramiro' tag='@ramiro' date='xxx xx xx' content='Hola mundoHola mundo'/>
            <Post img="https://xsgames.co/randomusers/assets/avatars/male/70.jpg" userAllName='Ramiro' tag='@ramiro' date='xxx xx xx' content='Hola mundoHola mundoHola mundoHola mundoHola mundo'/>

        </div>
    )
}

export default ListsFeed