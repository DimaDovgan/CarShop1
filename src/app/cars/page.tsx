'use client'
import { useSelector } from "react-redux";
import { CarList } from "@/component/CarList/CarList";
import {Filter} from "@/component/FilterOnSearchPage"
import styles from './page.module.scss';
import {ActiveFilterParams} from "@/component/ActiveFilterParms"
type carState = {
    filter:any,
  };

interface RootState {
    carState:carState;
  }

const Cars: React.FC = ()=>{
    const filter= useSelector((state:RootState) => state.carState.filter);
    console.log(filter,"filter");
    return <div className={styles.page}>
        <Filter/>
        <div>
          <ActiveFilterParams filter={filter}/>
        <CarList filter={filter}/>
        </div>
        
        
    </div>
}
export default Cars;