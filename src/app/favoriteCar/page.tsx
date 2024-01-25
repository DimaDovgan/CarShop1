"use client"
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import React from "react";
import { useGetCarByIdMutation } from "../GlobalRedux/api/carApi";
import { Heart } from "@/svgs";
import { Location } from "@/svgs";
import { Renge } from "@/svgs";
import { Fuel } from "@/svgs";
import { GearBox } from "@/svgs";
import { Clock } from "@/svgs";
import styles from "./page.module.scss"
import Link from "next/link";
import { useAddFavoriteCarMutation } from "../GlobalRedux/api/authApi";
import { updateFavoriteList } from "@/app/GlobalRedux/api/features/userSlice";

type carTupe={
    _id:string,
    brend:string,
    model:string,
    year:string,
    generation:string,
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
  
  }
type UserState = {
    isLoggedIn: boolean;
    token: string;
    user: {
      email: string;
      subscription: string;
      avatarUrl?: string; 
      favoriteCar:carTupe[];
    };
  };
  
  interface RootState {
    userState:UserState;
  }

const favoriteCar:React.FC = () => {
  const dispatch=useDispatch();
  
  const [addFavoriteList, { isLoadingFav, isErrorFav, errorFav, isSuccessFav ,dataFav}] = useAddFavoriteCarMutation();
    const user= useSelector((state:RootState) => state.userState.user);
    const addFavCar = async (event: React.MouseEvent<HTMLDivElement>, carId: string) => {
      event.preventDefault();
    
      try {
        
          const respons = await addFavoriteList({ params: carId });
          dispatch(updateFavoriteList(respons));
          console.log(respons,"--user.favoriteCar-")
        
      } catch (error) {
        // Обробка помилок
      }
    };
    

    return <div className={styles.favorite_car_container}>
      <p className={styles.page_title}>Сторінка з автівками які вам сподобались</p>
      {
        !user.favoriteCar && <div className={styles.page_text}>Ви не ввійшли в систему</div>
      }
      {
        user?.favoriteCar?.length ==0 && <div className={styles.page_text}>У вс немає улюблених автівок</div>
      }
        {
            user.favoriteCar && <div><ul>{user.favoriteCar.map((car:carTupe)=><li key={car._id} className={styles.car_li}>
            <Link  href={`/car/${car._id}`}>
              <div className={styles.car_elem}>
                <img src={car.imagesList[0]}
                  className={styles.car_img} alt="Car img"/>
        <div className={styles.car_content}>
        <h3 className={styles.car_name}>{car.brend} {car.model}</h3>
        <p className={styles.car_price}>{car.price} $</p>
        <div className={styles.car_list}>
        <ul className={styles.car_list_1}>
          <li className={styles.car_list_elem} ><Renge className={styles.car_list_svg}/><p className={styles.car_list_text}>range</p></li>
          <li className={styles.car_list_elem}><Fuel className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.fuel}</p></li>
        </ul>
        <ul>
          <li className={styles.car_list_elem}><Location className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.city}</p></li>
          <li className={styles.car_list_elem}> <GearBox className={styles.car_list_svg}/><p className={styles.car_list_text}>{car.transmission}</p></li>
        </ul>
        </div>
        <div className={styles.car_date_elem}>
        <Clock className={styles.car_date_svg}/><p className={styles.car_list_text} >{car.datepublication}</p>
        </div>
        </div>
            {
                user.favoriteCar && <div onClick={(event) => addFavCar(event, car._id)} className={styles.heart_component}>
                <Heart className={`${styles.heartIcon} ${ styles.heartIconActive}`} />
                </div>
              }
              </div>
      
              </Link>
              <div className={styles.line}></div>
             
              </li>)}</ul></div>
        }

    </div>

}
export default favoriteCar;