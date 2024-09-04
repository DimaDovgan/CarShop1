"use client"
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetOwnerCarMutation, useDeleteCarMutation} from '@/app/GlobalRedux/api/carApi';
import styles from './index.module.scss';
import Link from "next/link";
import { Location } from "@/svgs";
import { Renge } from "@/svgs";
import { Fuel } from "@/svgs";
import { GearBox } from "@/svgs";
import { Clock } from "@/svgs";
type carTupe={
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

interface RootState {
  userState:UserState;
}

const MyAvb: React.FC = () => {
  const [getOwnerCar, { isLoading:isLoadingOwnerCar, isError:isErrorOwnerCar, error:errorOwnerCar, isSuccess:isSuccessOwnerCar,data:dataOwnerCar }] =useGetOwnerCarMutation ();
  const [getDeleteCar, { isLoading:isLoadingDeleteCar, isError:isErrorDeleteCar, error:errorDeleteCar, isSuccess:isSuccessDeleteCar,data:DeleteCar }] =useDeleteCarMutation ();
  const user= useSelector((state:RootState) => state.userState.user);
  const deleteCar=(carId:string)=>{
    try {
      console.log(carId,"ID deleteCar dunc")
      const respons=getDeleteCar(carId);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  }
  useEffect(()=>{
    try {
      const response =  getOwnerCar({});
   } catch (error) {
     console.error('Error fetching data:', error);
   }
    
  },[DeleteCar]);
  useEffect(()=>{
    try {
      const response =  getOwnerCar({});
   } catch (error) {
     console.error('Error fetching data:', error);
   }
    
  },[])

  console.log(user);
  return <div> 
    <h3 className={styles.title_of_page}>Ваші оголошення</h3>
    {isLoadingOwnerCar && <div>Loading...</div>}
    {(isSuccessOwnerCar && !(dataOwnerCar.length>=1)) && <div>База даних пуста або якісь неочікувана помилка</div>}
    {isSuccessOwnerCar && <div><ul>{dataOwnerCar.map((car:carTupe)=><li key={car._id} className={styles.car_li}>
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

        <Link  href={`/fixCar/${car._id}`}><button className={styles.fix_btn}>Змінити</button></Link>
        <button className={styles.delete_btn} onClick={(e)=> {e.preventDefault(); deleteCar(car._id)}}>Видалити</button>
 
        </Link>
        <div className={styles.line}></div>
        </li>)}</ul>
        

        
        </div>
    }
  
  </div>
};

export default MyAvb;