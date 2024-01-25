"use client"
import checkMark from "../../../svgs/checkmark.svg";
import carimg from "../../../images/x5.jpg"
import carimg2 from "../../../images/x5_2.jpg"
import carimg3 from "../../../images/x5_e70.jpg"
import Slider from "@/component/Slider/Slider"
import styles from "./page.module.scss" 
import { useGetCarByIdMutation } from "@/app/GlobalRedux/api/carApi";
import {ChackMark} from "@/svgs/index";
import { useEffect } from "react";
import colorToHex from "@/helpers/convertColor";
import Cummmunication from "@/component/Communication";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props={
    params:{
        id:string;
    }
}
const Car =({params:{id}}:Props)=>{
    const [getCarById, { isLoading, isError, error, isSuccess ,data}] = 
    useGetCarByIdMutation();
    useEffect(()=>{
        try {
          const response = getCarById({ params: id});
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     },[])
   
    return <div className={styles.car_container}>
    {isLoading && <p>Завантаження ...</p>}
    {data && <div className={styles.car_page_containt}>
        <Cummmunication owner={data.owner} city={data.city}/>
        <div className={styles.car_component}>
        <Slider imagesList={data.imagesList}/>
    <div className={styles.gfgf}>
    <p className={styles.text}>{data.brend}  {data.model} {data.year}</p>
    <p className={styles.text_price}>{data.price}$</p>
    <p className={styles.text}>range тис.км пробіг</p>
    <p className={styles.text}>{data.city} </p>
    <p>{data.region}</p>
    </div>
    <div className={styles.all_charackter}>
    <div className={styles.char_comp}>
        <div className={styles.chack_mark_component}>
        <ChackMark className={styles.chack_mark}/>
    <span className={styles.charac_text}>Марка, модель, рік</span> 
    </div>
    <span className={styles.charac_context}>{data.brend}  {data.model} {data.year}</span>
    </div>

    <div className={styles.char_comp}>
        <div className={styles.chack_mark_component}>
        <ChackMark className={styles.chack_mark}/>
    <span className={styles.charac_text}>Двигун</span> 
    </div>
    <span className={styles.charac_context}>{data.engineV}.L  {data.fuel} {data.power}кс.</span>
    </div>

    <div className={styles.char_comp}>
        <div className={styles.chack_mark_component}>
        <ChackMark className={styles.chack_mark}/>
    <span className={styles.charac_text}>Колір</span> 
    </div>
    <span className={styles.charac_context}><span style={{
      width: '15px',
      height: '15px',
      backgroundColor: colorToHex(data.color),
      display: 'inline-block',
    }}></span> {data.color}</span>
    </div>

    <div className={styles.char_comp}>
        <div className={styles.chack_mark_component}>
        <ChackMark className={styles.chack_mark}/>
    <span className={styles.charac_text}>Коробка передач</span> 
    </div>
    <span className={styles.charac_context}>{data.transmission}</span>
    </div>

    <div className={styles.char_comp}>
        <div className={styles.chack_mark_component}>
        <ChackMark className={styles.chack_mark}/>
    <span className={styles.charac_text}>Покоління</span> 
    </div>
    <span className={styles.charac_context}>{data.generation}</span>
    </div>

    <div className={styles.char_comp}>
        <div className={styles.chack_mark_component}>
        <ChackMark className={styles.chack_mark}/>
    <span className={styles.charac_text}>Привід</span> 
    </div>
    <span className={styles.charac_context}>{data.wheelDrive}</span>
    </div>
    </div>
    <div className={styles.description_component}>
    <p className={styles.text}>Опис:</p>
    <p className={styles.text}>{data.description}</p>
    </div>
    
    </div>
    </div>
    }
    {isError && <p>Помилка проблеми із сервером</p>}
    
    </div>
}
export default Car;