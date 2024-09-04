"use client"
import { useDispatch } from 'react-redux';
import React,{ useEffect } from "react";
import { useGetUserMutation } from "@/app/GlobalRedux/api/authApi";
import {ChackMark} from "@/svgs/index";
import styles from "./index.module.scss";
import {notifyWarn,notifySuccess} from "../../helpers/toast";
import Chat from "./Chat";
import {createRoom} from "../../app/GlobalRedux/api/features/messageSlice";
import { useCreateRoomMutation,useAddMessageMutation } from "@/app/GlobalRedux/api/messageApi";
interface SliderProps {
    owner: string;
    city:string;
    carId:string;

  }
  const Cummmunication: React.FC<SliderProps> = ({ owner, city,carId}) => {
    const dispatch = useDispatch();
    console.log(owner,"owner Cummmunication")
    const [getUser, { isLoading, isError, error, isSuccess ,data}] = 
    useGetUserMutation();
    const [CreateRoom, { isLoading:isLoadingRoom, isError:isErrorRoom, error:errorRoom, isSuccess:isSuccessRoom ,data:dataRoom}] = useCreateRoomMutation();
    

    useEffect(()=>{
        try {
          // console.log(owner,"owner")
          const response = getUser({ params: owner});
          console.log(response,"response User")
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     },[])

     const toWriteToSeller= async()=>{
      try {
        const {data}= await CreateRoom({sellerId:owner,carId});

        console.log(data);
        // dispatch(createRoom({room:data,user:"buyer"}))
        
      } catch (error) {
        notifyWarn(`Не вдалось встановити зєднання з продавцем!!!`);
      }
     }
    //  const intervalId = setInterval(() => CreateRoom({ params: owner }), 30000);

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
                {
                  isSuccessRoom ? <Chat sellerId={owner} carId={carId} userName={data.user.name} user={"buyer"}/> : <button className={styles.btn} onClick={toWriteToSeller}>Написати</button>  
                }
                
            
            </div>
        }
        {isError && <p className={styles.text}>продавець не перевірений обережно</p>}

    </div>
  }
  export default Cummmunication;