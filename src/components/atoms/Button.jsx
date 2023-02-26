import React, {useState, useEffect} from 'react';

function Button({href, text, icon, bold, onClick, color=""}){

    const [asignHref, setAsignHref] = useState();
    const [asignText, setAsignText] = useState();
    const [asignIcon, setAsignIcon] = useState();
    let [classNames, setClassNames] = useState();
    let Classes = ["h-12 flex m-2 px-2 py-7 items-center border-none rounded-full text-background-1 g-background text-xl no-underline w-fit font-arial  hover:bg-background-2"];
    useEffect(()=>{

        if( color != "" && color == "twitter") {
            Classes.push(" text-twitter ");
        }

        if(href !== undefined){
            setAsignHref(href);
        }

        if(text !== undefined){
            setAsignText(text);
        }else{
            Classes.push("only-icon");
        }

        if(bold){
            Classes.push("bg-accent font-semibold hover:bg-accent hover:text-soft-white text-[#fff]");
        }

        if(icon !== undefined){
            setAsignIcon(icon);
            
        }else{
            Classes.push("w-56 flex justify-center");
        }
        
        setClassNames(Classes.join(" "));
    }, [href, text, icon, bold, onClick]);

    return(
        <a onClick={onClick} className={classNames} href={asignHref}><div className={icon !== undefined ? 'p-2.5 text-4xl' : undefined}>{asignIcon}</div><p className={text !== undefined ? 'pl-4 pr-4' : undefined}>{asignText}</p></a>
    )
}

export default Button