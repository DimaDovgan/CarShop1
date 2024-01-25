"use client"
import React,{ useEffect } from "react";
import { useGetUserMutation } from "@/app/GlobalRedux/api/authApi";
import {ChackMark} from "@/svgs/index";
import styles from "./index.module.scss"
interface SliderProps {
    owner: string;
    city:string;

  }
  const Cummmunication: React.FC<SliderProps> = ({ owner, city}) => {
    const [getUser, { isLoading, isError, error, isSuccess ,data}] = 
    useGetUserMutation();
    
    useEffect(()=>{
        try {
          const response = getUser({ params: owner});
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     },[])

    return <div className={styles.commun_form}>
        {data && <div className={styles.commun_contsiner} >
            <div className={styles.commun_avat_container}><img src={data.user.avatarUrl} className={styles.avatar_img}/>
            <div><p className={styles.text}>Продавець</p><p> {data.user.name} </p></div>
            </div>
            <div className={styles.chaked_polia}>
            <ChackMark className={styles.chack_mark} className={styles.chack}/>
                <span className={styles.text}> {city} </span>
                </div>
            <div className={styles.chaked_polia}>
            <ChackMark className={styles.chack_mark} className={styles.chack}/>
                <span className={styles.text}> Перевірені контакти </span>
                </div>
                <div className={styles.chaked_polia}>
            <ChackMark className={styles.chack_mark} className={styles.chack}/>
                <span className={styles.text}> Перевірений продавець </span>
                </div>
                <button className={styles.btn}>Написати</button>
            
            </div>
        }
        {isError && <p className={styles.text}>продавець не перевірений обережно</p>}

    </div>
  }
  export default Cummmunication;