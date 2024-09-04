"use client"
import React, { useEffect ,useState} from 'react';
import { useGetOwnerCarMutation, useDeleteCarMutation} from '@/app/GlobalRedux/api/carApi';
import { useGetRoomByCarMutation } from '@/app/GlobalRedux/api/messageApi';
import { useSelector } from 'react-redux';
import styles from "./index.module.scss";
import { Location } from "@/svgs";
import { Renge } from "@/svgs";
import { Fuel } from "@/svgs";
import { GearBox } from "@/svgs";
import { Clock } from "@/svgs";
import Link from "next/link";
import ChatForSeller from '../Communication/SellerChat/ChatForSeller';
import SellerChat from './SellerChats';
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
  roomsForSeller:Object;
}

type carType={
  _id:string,
  brend:string,
  model:string,
  year:string,
  engineV:string,
  power:string,
  fuel:string,
  transmission:string,
  wheelDrive:string,
  description:string,
  color:string,
  region:string,
  city:string,
  datepublication:string,
  imagesList:string[],
  price:string,
  range:number,

}
interface Message {
  roomId: string;
  createdAt: string;
  updatedAt: string;
}

interface DataObject {
  _id: string;
  buyerId: string;
  sellerId: string;
  carId: string;
  creationDate: string;
  messages: Message[];
}

interface RootState {
  userState:UserState;
  messageState:messageState;
}
interface ForOneCarChatProps {
    // id: string;
    car: carType;
  }
  
  const ForOneCarChat: React.FC<ForOneCarChatProps> = ({  car }) => {
//   const [getOwnerCar, { isLoading:isLoadingOwnerCar, isError:isErrorOwnerCar, error:errorOwnerCar, isSuccess:isSuccessOwnerCar,data:dataOwnerCar }] =useGetOwnerCarMutation ();
const [chatList,setChatList]= useState<DataObject[]>([]);
// const rooms= useSelector((state:RootState) => state.messageState.roomsForSeller);
  const [getRoomByCar, { isLoading:isLoadingRoomByCar, isError:isErrorRoomByCar, error:errorRoomByCar, isSuccess:isSuccessRoomByCar,data:dataRoomByCar}] =useGetRoomByCarMutation();
  // useEffect(async ()=>{
  //   try {
  //     const response = await getRoomByCar({carId:car._id});
  //     console.log(response)
  //  } catch (error) {
  //    console.error('Error fetching data:', error);
  //  }},[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await getRoomByCar({ carId: car._id });
        if(data && data.length>0){
          setChatList(data);
        }
        console.log(response,"responss ????????????!!!!!????????", car._id," car._id ");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [car._id]);
    
//   },[])
//   useEffect(()=>{
//     try {
//       if(dataOwnerCar.)
      
//     } catch (error) {
      
//     }
//   },[dataOwnerCar])

  
  return <li key={car._id} className={styles.car_li}>
      <Link  href={`/car/${car._id}`}>
        <div className={styles.car_elem}>
          <img src={car.imagesList[0]}
            className={styles.car_img} alt="Car img"/>
  <div className={styles.car_content}>
  <h3 className={styles.car_name}>{car.brend} {car.model}</h3>
  <p className={styles.car_price}>{car.price} $</p>
  <div className={styles.car_list}>
  <ul className={styles.car_list_1}>
    <li className={styles.car_list_elem} ><Renge className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.range} тис.</p></li>
    <li className={styles.car_list_elem}><Fuel className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.fuel}</p></li>
  </ul>
  <ul>
    <li className={styles.car_list_elem}><Location className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.city} </p></li>
    <li className={styles.car_list_elem}> <GearBox className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.transmission}</p></li>
  </ul>
  </div>
  <div className={styles.car_date_elem}>
  <Clock className={styles.car_date_svg}/><p className={styles.car_list_text} >{car.datepublication}</p>
  </div>
  </div>
        </div>

        </Link> 
        {chatList.length>0 &&<div>{chatList.map((room)=><SellerChat roomDef={room}/>)}</div>}
        {/* {chatList.length>0 && chatList.map((id)=><ChatForSeller sellerId={rooms[id].sellerId} carId={rooms[id].carId} roomId={rooms[id]._id} user={"seler"} key={rooms[id]._id}/>)} */}
        {/* {(isSuccessRoomByCar && dataRoomByCar.length>0)&& <ChatForSeller sellerId={rooms.sellerId} carId={room.carId} roomId={room._id} user={"seler"} key={room._id}/>

        } */}
        {/* <SellerChats carId={car._id}/> */}
        <div className={styles.line}></div>
        </li>
};

export default ForOneCarChat;