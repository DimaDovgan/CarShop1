"use client"
import carimg from "../../images/x5.jpg"
import carimg2 from "../../images/x5_2.jpg"
import carimg3 from "../../images/x5_e70.jpg"
import Image from 'next/image';
import styles from './CarList.module.scss';
import { Location } from "@/svgs";
import { Renge } from "@/svgs";
import { Fuel } from "@/svgs";
import { GearBox } from "@/svgs";
import { Clock } from "@/svgs";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useGetAllCarMutation } from "@/app/GlobalRedux/api/carApi";
import Pagination from "../Pagination";
import { Heart } from '@/svgs';
// import { useEffect } from "react";
import React, { useEffect, useState, useCallback } from 'react';
import { type } from "os";
import { useAddFavoriteCarMutation } from "@/app/GlobalRedux/api/authApi";
import { useDispatch } from "react-redux";
import { updateFavoriteList } from "@/app/GlobalRedux/api/features/userSlice";
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
    email: string;
    subscription: string;
    avatarUrl?: string; 
    favoriteCar:string[];
  };
};

interface RootState {
  userState:UserState;
}
interface FilterInterProps {
  filter?: object;
}
const ROWS_PER_PAGE = 10;

// const getTotalPageCount = (rowCount: number): number =>Math.ceil(rowCount / ROWS_PER_PAGE);


export const CarList: React.FC<FilterInterProps> = ({ filter = '' })=>{
  const dispatch=useDispatch();
  const [page, setPage] = useState(1);
  const user= useSelector((state:RootState) => state.userState.user);
  console.log("---------useSelector------",user);
  const [getAllcar, { isLoading, isError, error, isSuccess ,data}] = 
  useGetAllCarMutation();
  const [addFavoriteList, { isLoadingFav, isErrorFav, errorFav, isSuccessFav ,dataFav}] = useAddFavoriteCarMutation()
  
 
  const addFavCar = async (event: React.MouseEvent<HTMLDivElement>, carId: string) => {
    event.preventDefault();
  
    try {
      if (data) {
        const respons = await addFavoriteList({ params: carId });
        dispatch(updateFavoriteList(respons));
        console.log(respons,"--user.favoriteCar-")
      }
    } catch (error) {
      // Обробка помилок
    }
  };
  useEffect(()=>{
      try {
         const response =  getAllcar({ params: JSON.stringify({...filter,page:page}) });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
   },[filter,page])

   const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data.totalPages;
    // data ? getTotalPageCount(data.count) : current;

    setPage(next <= total ? next : current);
  }, [page, data]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  const handleGoPage = useCallback((pagePosition:number) => {
    setPage(pagePosition);
  }, []);

   return <div> 
    {isLoading && <div>Loading...</div>}
    {/* {isSuccess && <div>{data}</div>} */}
    {(isSuccess && !(data.cars.length>=1)) && <div>База даних пуста або якісь неочікувана помилка</div>}
    {isSuccess && <div><ul>{data.cars.map((car:carTupe)=><li key={car._id} className={styles.car_li}>
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
  {
          user.favoriteCar && <div onClick={(event) => addFavCar(event, car._id)} className={styles.heart_component}>
          <Heart className={`${styles.heartIcon} ${ user.favoriteCar.map(obj => obj._id).includes(car._id) ? styles.heartIconActive : ''}`} />
          </div>
        }
        </div>

        </Link>
        <div className={styles.line}></div>
       
        
        {/* <Heart className={styles.heartIcon} onClick={addFavCar} data-id-value={car._id}/> */}
        {/* <button data-id-value={car._id} onClick={addFavCar} >addFavoritelist</button> */}
        </li>)}</ul>
        

        <Pagination  onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === data.totalPages,
          }}
          nav={{ current: page, total: data.totalPages }}
          handleGoPage={handleGoPage}
          />
        </div>
         

    }
    
    </div>
    
}