"use client";
 import styles from "./index.module.scss"
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs ,Autoplay } from 'swiper/modules';
import { useGetAllCarMutation } from "@/app/GlobalRedux/api/carApi";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "./slider.css"
// interface SliderProps {
//   imagesList: string[];
// }
const SliderHome: React.FC = () => {
    const [getAllcar, { isLoading, isError, error, isSuccess ,data}] = 
    useGetAllCarMutation();

    useEffect(()=>{
        try {
           const response =  getAllcar({ params: JSON.stringify({filter:""}) });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     },[])
  return (<section className={styles.slider}>
    {isSuccess && 
        <Swiper
          spaceBetween={10}
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
           className={styles.swiper_slider}>
          {data.cars.map((car, index) => (
            <SwiperSlide key={index}>
              <Link href={`/car/${car._id}`} className={styles.swiper_div}>
                <img
                  src={car.imagesList[0]}
                  alt="img"
                  className={styles.swiper_img} />
              </Link >
            </SwiperSlide>
          ))}
        </Swiper>
      
    }
      
    </section>
  );
};

export default SliderHome;