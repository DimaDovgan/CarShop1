import Image from 'next/image'
import { CarList } from '@/component/CarList/CarList'
import { Filter } from '@/component/Filter/Filter'
import parking from "@/images/parking.jpeg"
import choice1 from "@/images/choice1.jpg"
import choice2 from "@/images/choice2.jpg"
import choice3 from "@/images/choice3.jpg"
import style from "./styles.module.scss"
import SliderHome from "../component/homeSlider/index"
export default function Home() {
  return (<div className={style.homePage}>
    <div className={style.navList}>
    <Filter/>
    <SliderHome/>
    </div>
    <div className={style.parking}>
      <p className={style.parking_text}>Pоби усвідомлений вибір разом із Car-shop</p>
      <div className={style.choiceimgcon}>
      <Image  src={choice1}
      alt="Picture of the parking"/>
      <Image  src={choice2}
      alt="Picture of the parking"/>
      <Image  src={choice3}
      alt="Picture of the parking"/>

      </div>
    
    </div>
    
    <h3 className={style.recomend_text}>Автомобілі які Car-Shop люто рекомендує</h3>
  <CarList/></div>)
}
