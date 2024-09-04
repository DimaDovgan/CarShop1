"use client"
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserMutation } from "@/app/GlobalRedux/api/authApi";
import {ChackMark} from "@/svgs/index";
import styles from "./index.module.scss";
import {notifyWarn,notifySuccess} from "@/helpers/toast";
import { useCreateRoomMutation,useAddMessageMutation,useCreateRoomForSellerMutation } from "@/app/GlobalRedux/api/messageApi";
import {createRoom,createRoomForSeller} from "@/app/GlobalRedux/api/features/messageSlice";

type room = {
    _id: string;
    buyerId: string;
    sellerId: string;
    carId:string;
    creationDate: string;
    roomId:string;
    messages: {
      id: string;
      date: string;
      message:string;
      user:string;
    }[];
  };

interface ChatProps {
    // dataRoom: room;
// sellerId:string;
//     user:string;
//     carId:string;
    roomDef:room;
  }

  interface RootState {
    userState:UserState;
    messageState:messageState;
  }
  type UserState = {
    isLoggedIn: boolean;
    token: string;
    user: {
        name:string;
      email: string;
      subscription: string;
      avatarUrl?: string; 
      phoneNumber?:string;
    };
  };
  type messageState={
    roomsForSeller:RoomsForSeller;
  }
  interface RoomsForSeller {
    [key: string]: room; // Динамічні властивості, кожна з яких має тип Room
  }

  const useInterval = (callback: () => void, delay: number) => {
    useEffect(() => {
      const intervalId = setInterval(callback, delay);
      return () => clearInterval(intervalId);
    }, [callback, delay]);
  };


  const SellerChat: React.FC<ChatProps > = ({roomDef}) => {
    console.log(roomDef,"room def")
     const room= useSelector((state:RootState) => state.messageState.roomsForSeller[roomDef.roomId]);
    const [messageText,setMessageText]=useState("");
    const dispatch = useDispatch();
    const [CreateMessage, { isLoadingMessage, isErrorMessage, errorMessage, isSuccess:isSuccessMessage ,dataMessage}] = 
    useAddMessageMutation();
    const [CreateRoom, { isLoading:isLoadingRoom, isError:isErrorRoom, error:errorRoom, isSuccess:isSuccessRoom ,data:dataRoom}] = 
    useCreateRoomForSellerMutation();

    const fetchData = async () => {
      try {
        const { data } = await CreateRoom({buyerId:roomDef.buyerId,carId:roomDef.carId});
        console.log(data, "response before slice");
        dispatch(createRoomForSeller({ room: data, buyerId:data.buyerId }));
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
        const respons= await CreateMessage({user:'seller',message:messageText,id:dataRoom._id});
        console.log(respons);
        console.log("sendMesage")
        if(respons.roomId){
          fetchData();
          setMessageText("");
          console.log("reload chat")
        }

        
      } catch (error) {
        notifyWarn(`Не вдалось встановити зєднання з продавцем!!!`);
      }
    
     }

    return <div>
        {isLoadingRoom && <p>Завантаження</p>}
        
        {room &&<div>{
            room.messages && (<div><ul>
                {room.messages.length>0 ?  room.messages.map(
                    ({id,date,message,user})=><li key={id}>{message}</li>):<p>ПочнітЬ спілкуання</p>}
                
            </ul> 
             <form onSubmit={sentMessage}>
                <input type="text" value={messageText} onChange={(e)=>setMessageText(e.target.value)}/>
                <button >Надіслати</button>
            </form> 
            </div>)
            }

        </div> }
    </div>
  }
  export default SellerChat;