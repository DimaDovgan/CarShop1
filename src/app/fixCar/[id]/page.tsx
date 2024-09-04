"use client"
import { useGetCarByIdMutation } from "@/app/GlobalRedux/api/carApi";
import { useEffect } from "react";
import styles from "./page.module.scss" ;
import Sellcar from "@/app/sellcar/page";
import Car from "@/app/car/[id]/page";
type Props={
    params:{
        id:string;
    }
}
const FixCar =({params:{id}}:Props)=>{
    const [getCarById, { isLoading, isError, error, isSuccess ,data}] = 
    useGetCarByIdMutation();
    useEffect(()=>{
        try {
          const response = getCarById({ params: id});
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     },[])
   
    return <div>
        {isLoading && <p>Завантаження ...</p>}
    {data && <div className={styles.car_page_containt}>
    <Car  params={{ id: id.toString() }}/>
        <Sellcar optionalProp={"fixSellcar"} optionId={id.toString()}/>
        
        
        </div>}

    </div>

}
export default FixCar;