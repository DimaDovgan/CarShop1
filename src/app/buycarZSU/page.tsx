import car from "../../images/armyCar.png";
import Image from 'next/image';
import style from './page.module.scss'
const ByArmyCar: React.FC=()=>{
    return <div className={style.buycarZSU}>
        <Image  src={car}
      alt="Picture of the author"/>
      <button className={style.button}>Підтримати</button>
    </div>
}
export default ByArmyCar;