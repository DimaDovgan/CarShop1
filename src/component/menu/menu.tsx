'use client';
import style from "./styles.module.scss"
import React, { useState } from "react"
import DropdownMenu from "../DropeMenu/DropdownMenu"

interface MenuProps {
    width: string;
  }
  
  const Menu: React.FC<MenuProps> = ({width} ) => {
    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const hendelMenu=()=>{
        setisOpenDropDown(!isOpenDropDown);
         console.log(isOpenDropDown)
          }

    return (
        <div>
            <div onClick={hendelMenu} style={{width:`${width}px`,height:`${width}`}} className={style.burger}>
            <div className={style.lineStyle}></div>
            <div className={style.lineStyle}></div>
            <div className={style.lineStyle}></div>
        </div>
        <DropdownMenu isOpenMenu={isOpenDropDown} setisOpenMenu={setisOpenDropDown}/>

        </div>
        
    );
}
export default Menu;