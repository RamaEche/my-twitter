import React from 'react';

function Title(OriginalComponent) {
    function NewComponent() {
        const setTitle = (newTitle)=> {
            const title = document.querySelector(".title");
            title.innerHTML = newTitle;
        }
        return (<OriginalComponent setTitle={ setTitle }/>)
    }
    return (NewComponent)
}

export default Title