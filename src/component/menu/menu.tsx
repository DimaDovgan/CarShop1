'use client';
import style from "./styles.module.scss"
import React, { useState } from "react"
import DropdownMenu from "../DropeMenu/DropdownMenu"
// interface MenuProps {
//     onClick: () => void;
// }
export const Menu:React.FC=()=>{
    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const hendelMenu=()=>{
        setisOpenDropDown(!isOpenDropDown);
         console.log(isOpenDropDown)
          }

    return (
        <div>
            <div onClick={hendelMenu} className={style.menu} >
            <div className={style.lineStyle}></div>
            <div className={style.lineStyle}></div>
            <div className={style.lineStyle}></div>
        </div>
        <DropdownMenu isOpenMenu={isOpenDropDown} setisOpenMenu={setisOpenDropDown}/>

        </div>
        
    );
}