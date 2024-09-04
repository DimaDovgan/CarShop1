"use client"
import style from "./DropDownList.module.scss"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
interface FormType {
  brend: string;
  model: string;
  year: string;
  generation: string;
  engineV: string;
  power: string;
  fuel: string;
  transmission: string;
  wheelDrive: string;
  description: string;
  imagesList: any[];
  color: string;
  region: string; // виправлено помилку в назві
  city: string;
}
interface CustomSelectProps {
    options: Array<{ value: string}>;
    lable:string;
    setForm: Dispatch<SetStateAction<FormType>>;
    form: FormType;
    setShowList:Dispatch<SetStateAction<any>>;
    // width:number;
  }
  
  const DropDownList: React.FC<CustomSelectProps> = ({ options, setForm ,lable,setShowList,form}) => {

    const selectOption =(event: React.MouseEvent<HTMLInputElement>)=>{
      event.preventDefault();
      const value=event.target.getAttribute('data-value')as string;
      const lable=event.target.getAttribute('data-lable')as string;
      setShowList(false);
      setForm({...form,[lable]:value});
    }

    

    return (<div className={style.brend_list_container} >
        <ul>
          {options.map(({value})=><li key={value} onClick={selectOption} data-value={value} data-lable={lable} className={style.brend_list_item}>{value}</li>)}
        </ul>
        </div>)
  }
  export default DropDownList;