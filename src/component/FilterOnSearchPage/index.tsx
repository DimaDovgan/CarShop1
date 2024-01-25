"use client"
import { useState } from "react";
import style from "./index.module.scss";
import { useDispatch } from "react-redux";
import { setFilter } from "@/app/GlobalRedux/api/features/carSlice";
import { redirect } from 'next/navigation';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DropDownList from "../DropDownList/DropDownList";
type carState = {
    filter:any,
  };

interface RootState {
    carState:carState;
  }
const defultform={
    brend:"",
    model:"",
    yearFrom:"",
    yearTo:"",
    engineVFrom:"",
    engineVTo:"",
    fuel:"",
    transmission:"",
    wheelDrive:"",
    color:"",
    region:"",
    priceFrom:"",
    priceTo:"",
    }
export const Filter: React.FC = ()=>{

    const filter= useSelector((state:RootState) => state.carState.filter);
    console.log(filter)
    
    const optionsFuel = [{value:"Бензин"},{value:"Дизель"},{value:"Газ"},{value:"Бензин-газ"},{value:"Електро"}];
    const optionsTransmission=[{value:"Автомат"},{value:"Робот"},{value:"Механіка"},{value:"Варіатор"}]
    const optionsWheelDrive =[{value:"Передній"},{value:"Задній"},{value:"Повний"}]
    const [showListFuel, setShowListFuel] = useState(false);
    const [showListWheelDrive, setShowListWheelDrive] = useState(false);
    const [showListTransmission, setShowListTransmission] = useState(false);
    const [showAdvSettings, setShowAdvSettings] = useState(false);
    
    const [form,setForm]=useState(defultform);
    const [isShowYear,setIsShowYear]=useState(false);
    const [isShowV,setIsShowV]=useState(false);
    const [isShowPrice,setIsShowPrice]=useState(false);

    useEffect(() => {
      if(filter){
        setForm(filter);
      }
        console.log(filter,"filter---")
      }, [filter]);

    const dispatch=useDispatch();
    const submiteForm=(event: React.MouseEvent<HTMLInputElement>)=>{
        event.preventDefault();
        console.log("submite form ",form)
        dispatch(setFilter(form));
    }

    const handleInputChange=(event: React.MouseEvent<HTMLInputElement>)=>{
        event.preventDefault();
        const data=event.target.value;
        const atribute=event.target.getAttribute('data-make-value')as string;
        setForm({...form,[atribute]:data})
    }
    const handleInputClickYear=(event: React.MouseEvent<HTMLInputElement>)=>{
      event.preventDefault();
      const atribut = event.target.getAttribute('data-make-value')as string;
      switch (atribut) {
        case "year":
          setIsShowYear(!isShowYear);
          break;
          case "V":
          setIsShowV(!isShowV)
          break;
          case "price":
            setIsShowPrice(!isShowPrice)
            break;
        default:
          break;
          }
      
        
    }
    const handleChange11 = (selectedOption: { value: string; lable: string } | null) => {
        if (selectedOption) {
  
          const { value, lable } = selectedOption;
          setForm({...form,[lable]:value});
          console.log(lable,"lable")
          switch (lable) {
        case "fuel":
          setShowListFuel(false);
          break;
          case "wheelDrive":
          setShowListWheelDrive(false);
          break;
          case "transmission":
            setShowListTransmission(false);
            break;
        default:
          break;
          }
        
        } else {
          console.log("Selected option is null");
        }
      };
      const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        const atribute=event.target.getAttribute('data-make-value')as string;
        switch (atribute) {
          case "fuel":
            setShowListFuel(true);
            break;
            case "wheelDrive":
              setShowListWheelDrive(true);
            break;
            case "transmission":
              setShowListTransmission(true);
              break;
        
          default:
            break;
        }
    
         
      };
  

    return <div className={style.filterContainer}>
        <form onSubmit={submiteForm} className={style.forma}>
          
    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.label}>Марка</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.brend} data-make-value="brend"  onChange={handleInputChange}
     placeholder="Марка"/>
    </div>

    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.label}>Модель</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.model} data-make-value="model"  onChange={handleInputChange}
    placeholder="Модель"/>
    </div>

    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.label}>Паливо</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.fuel} data-make-value="fuel"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Паливо"/>
    {showListFuel && <div className={style.gggg}><DropDownList options={optionsFuel} lable="fuel" onChange={handleChange11} width={185}/></div>}
    </div>

    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.label}>Регіон</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.region} data-make-value="region"  onChange={handleInputChange} 
    placeholder="Регіон"/>
    </div>

    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.label}>Oб'єм двигуна</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={(form.engineVFrom!=="" || form.engineVTo!=="")?` ${form.engineVFrom} - ${form.engineVTo}`:" 0 - "} data-make-value="V"  
    onClick={handleInputClickYear} placeholder="об'єм двигуна" onChange={()=>null}/>
    {isShowV && <ul className={style.year_container}>
        <li><input className={style.sellcar_add_characteristics__input_v} type="text" value={form.engineVFrom} data-make-value="engineVFrom" onChange={handleInputChange}   
     placeholder="Від"/></li>
     <li><input className={style.sellcar_add_characteristics__input_v} type="text" value={form.engineVTo} data-make-value="engineVTo" onChange={handleInputChange}   
     placeholder="До"/></li>
        </ul>}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.label}>Ціна</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={(form.priceFrom!=="" || form.priceTo!=="")?`${form.priceFrom}-${form.priceTo} $`:"Ціна"} data-make-value="price"  
    onClick={handleInputClickYear} placeholder="Ціна" onChange={()=>null}/>
    {isShowPrice && <ul className={style.year_container}>
        <li><input className={style.sellcar_add_characteristics__input_v} type="text" value={form.priceFrom} data-make-value="priceFrom" onChange={handleInputChange}   
     placeholder="Від"/></li>
     <li><input className={style.sellcar_add_characteristics__input_v} type="text" value={form.priceTo} data-make-value="priceTo" onChange={handleInputChange}   
     placeholder="До"/></li>
        </ul>}
    </div>

      <div className={style.sellcar_add_characteristics__div}>
        <label className={style.label}>Колір</label>
      <input className={style.sellcar_add_characteristics__input} type="text" value={form.color} data-make-value="color"  onChange={handleInputChange} 
      placeholder="Колір"/>
      </div>
      
      <div className={style.sellcar_add_characteristics__div}>
    <label className={style.label}>Коробка передач</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.transmission} data-make-value="transmission"  
    onClick={handleInputClick} placeholder="Коробка передач"/>
    {showListTransmission && <div className={style.gggg}> <DropDownList options={optionsTransmission} lable="transmission" onChange={handleChange11} width={185} /></div>}
    </div>
      
      <div className={style.sellcar_add_characteristics__div}>
        <label className={style.label}>Привід</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.wheelDrive} data-make-value="wheelDrive"  
    onClick={handleInputClick} placeholder="Привід"/>
    {showListWheelDrive && <div className={style.gggg}> <DropDownList options={optionsWheelDrive} lable="wheelDrive" onChange={handleChange11} width={185} /></div>}
    </div>
     
    <div className={style.sellcar_add_characteristics__div}>

    <input className={style.sellcar_add_characteristics__input} type="text" value={(form.yearFrom!=="" || form.yearTo!=="")?`${form.yearFrom}-${form.yearTo}`:"Piк випуску"} data-make-value="year"  
    onClick={handleInputClickYear} placeholder="Роки виробництва" onChange={()=>null}/>
    {isShowYear && <ul className={style.year_container}>
        <li><input className={style.sellcar_add_characteristics__input_v} type="text" value={form.yearFrom} data-make-value="yearFrom" onChange={handleInputChange}   
     placeholder="Від"/></li>
     <li><input className={style.sellcar_add_characteristics__input_v} type="text" value={form.yearTo} data-make-value="yearTo" onChange={handleInputChange}   
     placeholder="До"/></li>
        </ul>}
    </div>
    <button type='submit' className={style.add_car__btn}>Розширений пошук</button>
    </form>
    </div>
}