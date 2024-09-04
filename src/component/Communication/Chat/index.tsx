"use client"
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserMutation } from "@/app/GlobalRedux/api/authApi";
import {ChackMark} from "@/svgs/index";
import styles from "./index.module.scss";
import {notifyWarn,notifySuccess} from "../../../helpers/toast";
import { useCreateRoomMutation,useAddMessageMutation } from "@/app/GlobalRedux/api/messageApi";
import {createRoom} from "@/app/GlobalRedux/api/features/messageSlice";

type room = {
    _id: string;
    buyerId: string;
    sellerId: string;
    creationDate: string;
    messages: {
      id: string;
      date: string;
      message:string;
      user:string;
    }[];
  };

interface ChatProps {
    // dataRoom: room;
sellerId:string;
    user:string;
    carId:string;
    userName:string;
  }
  const useInterval = (callback: () => void, delay: number) => {
    useEffect(() => {
      const intervalId = setInterval(callback, delay);
      return () => clearInterval(intervalId);
    }, [callback, delay]);
  };


  const Chat: React.FC<ChatProps > = ({ sellerId,user,carId,userName}) => {
    const {room}= useSelector((state:RootState) => state.messageState);
    const [messageText,setMessageText]=useState("");
    const dispatch = useDispatch();
    const [CreateMessage, { isLoadingMessage, isErrorMessage, errorMessage, isSuccess:isSuccessMessage ,dataMessage}] = 
    useAddMessageMutation();
    const [CreateRoom, { isLoading:isLoadingRoom, isError:isErrorRoom, error:errorRoom, isSuccess:isSuccessRoom ,data:dataRoom}] = 
    useCreateRoomMutation();

    const fetchData = async () => {
      try {
        const { data } = await CreateRoom({sellerId,carId});
        console.log(data, "response before slice");
        dispatch(createRoom({ room: data, user }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useInterval(fetchData, 10000);

    useEffect(() => {
      fetchData();
    }, []);

     const sentMessage=async(e: React.FormEvent)=>{
        e.preventDefault();
      try {
        const respons= await CreateMessage({user:user,message:messageText,id:dataRoom._id});
        console.log(respons);
        console.log(isSuccessMessage,"isSuccessMessage")
        if(isSuccessMessage){
          console.log("is",isSuccessMessage,"dijfffffff")
          fetchData();
          setMessageText("");
        }

        
      } catch (error) {
        notifyWarn(`Не вдалось встановити зєднання з продавцем!!!`);
      }
    
     }

    return <div>
        {room && <div> { room.messages && (<div className={styles.chat_component} ><ul className={styles.chat_container}><p className={styles.chat_title}>Чат із {userName} </p>
            {room.messages.length>0 ?  room.messages.map(
                ({id,date,message,user})=><li className={styles[user]} key={id}>{message} <p className={styles.date_of_message}>{date.slice(-5)}</p></li>):<p>ПочнітЬ спілкуання</p>}
            
        </ul> 
         <form onSubmit={sentMessage} className={styles.form_component}>
         <textarea className={styles.message_input} value={messageText} onChange={(e)=>setMessageText(e.target.value)}></textarea>
            {/* <input className={styles.message_input} type="text" value={messageText} onChange={(e)=>setMessageText(e.target.value)}/> */}
            <button className={styles.message_btn} >&#8593</button>
        </form> 
        </div>)
        }</div>}
    </div>
  }
  export default Chat;