"use client"
import { useState } from "react";
import style from "./index.module.scss";
import { useDispatch } from "react-redux";
import { setFilter } from "@/app/GlobalRedux/api/features/carSlice";
import { redirect } from 'next/navigation';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DropDownList from "../DropDownList/DropDownList";
import { getBrend,getModel,getModifications } from "@/app/GlobalRedux/api/features/carCharacteristicsSlice";
import {InputWithRequest,InputWithRequestYear,ModificatonsInput,RegionInput,ModelInput} from "@/component/InputWithRequest";
import { useGetBrendsMutation,useGetModelsMutation,useGetModificationMutation,useGetCharacteristicsMutation} from "@/app/GlobalRedux/api/characteristicsApi";
type carState = {
    filter:any,
  };

interface RootState {
    carState:carState;
  }
const defultform={
    brend:"",
    model:"",
    yearFrom:"",
    yearTo:"",
    engineVFrom:"",
    engineVTo:"",
    fuel:"",
    transmission:"",
    wheelDrive:"",
    color:"",
    region:"",
    priceFrom:"",
    priceTo:"",
    }
export const Filter: React.FC = ()=>{
  const brends = useSelector((state:RootState) => state.characteristicsState.brends);
  const models = useSelector((state:RootState) => state.characteristicsState.models);
    const filter= useSelector((state:RootState) => state.carState.filter);
    const [getAllBrend, { isLoading:isLoadingGetBrend, isError:isErrorGetBrend, error:errorGetBrend, isSuccess:isSuccessGetBrend,data:dataGetBrend }] = useGetBrendsMutation();
    const [getAllModel, { isLoading:isLoadingGetModel, isError:isErrorGetModel, error:errorGetModel, isSuccess:isSuccessGetModel }] =useGetModelsMutation();
    const[showListFuel,setShowListFuel]=useState(false);
    const [choosModel,setChoosModel]=useState(null);
    const [showAdvSettings, setShowAdvSettings] = useState(false);
    // useEffect(()=>{
    //  if(filter){
    //     console.log("ffffffff")
    //      redirect('/cars');
    //  }
    // },[filter])
    const [form,setForm]=useState(defultform);
    const [isShowYear,setIsShowYear]=useState(false);
    const [isShowV,setIsShowV]=useState(false);
    const [isShowPrice,setIsShowPrice]=useState(false);
    const dispatch=useDispatch();
    const [choosedModel,setChoosedModel]=useState(null);
  const [chooseBrend,setChoosBrend]=useState(null);
    const submiteForm=(event: React.MouseEvent<HTMLInputElement>)=>{
        event.preventDefault();
        console.log("submite form ",form)
        dispatch(setFilter(form));
        setForm(defultform);
    }

    const getModels = async () => {
      
      try {
        if(chooseBrend){
          const { data } = await getAllModel({params:chooseBrend});
          const carsArr = data.cars ? [...data.cars] : []; 
          carsArr.sort((a, b) => {
            const titleA = a.name?.toLowerCase() || ''; 
            const titleB = b.name?.toLowerCase() || '';
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          });
          if (carsArr.length > 0) { 
            dispatch(getModel({ cars: carsArr }));
          }
        }
      } catch (error) {
        console.error("Error in getModel:", error);
        dispatch(getModel({ cars: [] }));
      }
    };
    
    const getBrends = async () => {
      
      try {
        const { data } = await getAllBrend({});
        const carsArr = data.cars ? [...data.cars] : []; 
        carsArr.sort((a, b) => {
          const titleA = a.titlebrend?.toLowerCase() || ''; 
          const titleB = b.titlebrend?.toLowerCase() || '';
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
        if (carsArr.length > 0) { 
          dispatch(getBrend({ cars: carsArr }));
        }
      } catch (error) {
        console.error("Error in getBrends:", error);
        dispatch(getBrend({ cars: [] }));
      }
    };

    useEffect(()=>{
      getBrends();
  
    },[]);
    useEffect(()=>{
      console.log(chooseBrend,"chooseBrend")
      if(chooseBrend){
       getModels();
      }
      setForm({ ...form, model: ""});
      dispatch(getModel({ cars:[]}));
      setChoosedModel(null);
  
     },[chooseBrend])


    const handleInputChange=(event: React.MouseEvent<HTMLInputElement>)=>{
        event.preventDefault();
        const data=event.target.value;
        const atribute=event.target.getAttribute('data-make-value')as string;
        setForm({...form,[atribute]:data})
    }
    const handleInputClickYear=(event: React.MouseEvent<HTMLInputElement>)=>{
      event.preventDefault();
      const atribut = event.target.getAttribute('data-make-value')as string;
      switch (atribut) {
        case "year":
          setIsShowYear(!isShowYear);
          break;
          case "v":
          setIsShowV(!isShowV)
          break;
          case "price":
            setIsShowPrice(!isShowPrice)
            break;
        default:
          break;
          }
      
        
    }
    const handleChange11 = (selectedOption: { value: string; lable: string } | null) => {
        if (selectedOption) {
  
          const { value, lable } = selectedOption;
          setForm({...form,[lable]:value});
          console.log(lable,"lable")
          switch (lable) {
        case "fuel":
          setShowListFuel(false);
          break;
          case "wheelDrive":
          setShowListWheelDrive(false);
          break;
          case "transmission":
            setShowListTransmission(false);
            break;
        default:
          break;
          }
        
        } else {
          console.log("Selected option is null");
        }
      };
      const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        const atribute=event.target.getAttribute('data-make-value')as string;
        switch (atribute) {
          case "fuel":
            setShowListFuel(true);
            break;
            case "wheelDrive":
              setShowListWheelDrive(true);
            break;
            case "transmission":
              setShowListTransmission(true);
              break;
        
          default:
            break;
        }
    
         
      };
      const canslePrice=(event: React.MouseEvent<HTMLInputElement>)=>{
        event.preventDefault();
        const atribute=event.target.getAttribute('data-make-value')as string;
        switch (atribute) {
          case "year":
            setForm({...form,yearFrom:"",yearTo:""})
            break;
            case "price":
            setForm({...form,priceFrom:"",priceTo:""})
            break;
            case "v":
            setForm({...form,engineVFrom:"",engineVTo:""})
            break;
            case "color":
            setForm({...form,color:""})
            break;
        
          default:
            break;
        }
        setIsChoose(false);
        setForm({ ...form, [type]:""});
        setChoosed(null);
    
      }

  

    return <div className={style.filterContainer}>
        <form onSubmit={submiteForm} className={style.forma}>
          <div className={style.filter_form_inputs}>  <div>
      <InputWithRequest brends={brends} setForm={setForm} form={form} type="brend" setChoosed={setChoosBrend} listTitle="titlebrend" ukrTitle="Марка"/>
    <ModelInput brends={models} setForm={setForm} form={form} type="model" setChoosed={setChoosModel} listTitle="name" ukrTitle="Модель" setChoosedModel={setChoosedModel}/>
        
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__label}>Паливо</label>
    <input className={style.sellcar_add_characteristics__input_title} type="text" value={form.fuel} data-make-value="fuel"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Паливо "/>
    <button onClick={(e)=>{ e.preventDefault();
    setShowListFuel(false);
    setForm({ ...form, fuel:""});}} className={style.cansleBrendBtn}>&times;</button>
    {showListFuel && <DropDownList options={[{value:"Дизель"},{value:"Бензин"},{value:"Газ"},{value:"Газ-бензин"},{value:"Гібрид"},{value:"Електрика"}]} setForm={setForm} form={form} lable="fuel" setShowList={setShowListFuel}   />}
    
    
    </div>
    </div>
<div className={style.rigthCom}>
    <RegionInput setForm={setForm} form={form} />
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__label}>Рік випуску</label>
      <input className={style.sellcar_add_characteristics__input_title} type="text" value={(form.yearFrom!=="" || form.yearTo!=="")?`${form.yearFrom}-${form.yearTo}`:"Рік випуску"} data-make-value="year"  
    onClick={handleInputClickYear} placeholder="Роки виробництва" onChange={()=>null}/>
     <button onClick={canslePrice} data-make-value="year"  className={style.cansleBrendBtn}>&times;</button>
    {isShowYear && <ul className={style.year_container}>
        <li><input className={style.sellcar_add_characteristics__input} type="text" value={form.yearFrom} data-make-value="yearFrom" onChange={handleInputChange}   
     placeholder="Від"/></li>
     <li><input className={style.sellcar_add_characteristics__input} type="text" value={form.yearTo} data-make-value="yearTo" onChange={handleInputChange}   
     placeholder="До"/></li>
        </ul>}
    </div>
    <div className={style.sellcar_add_characteristics__div}>

    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__label}>Обєм двигуна</label>
      <input className={style.sellcar_add_characteristics__input_title} type="text" value={(form.engineVFrom!=="" || form.engineVTo!=="")?`${form.engineVFrom}-${form.engineVTo}`:"Обєм двигуна"} data-make-value="v"  
    onClick={handleInputClickYear} placeholder="обєм" onChange={()=>null}/>
     <button onClick={canslePrice} data-make-value="v"  className={style.cansleBrendBtn}>&times;</button>
    {isShowV && <ul className={style.year_container}>
        <li><input className={style.sellcar_add_characteristics__input} type="text" value={form.engineVFrom} data-make-value="engineVFrom" onChange={handleInputChange}   
     placeholder="Від"/></li>
     <li><input className={style.sellcar_add_characteristics__input} type="text" value={form.engineVTo} data-make-value="engineVTo" onChange={handleInputChange}   
     placeholder="До"/></li>
        </ul>}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__label}>Обєм двигуна</label>
      <input className={style.sellcar_add_characteristics__input_title} type="text" placeholder="обєм" onChange={(e)=>setForm({...form,color:e.target.value})}/>
      <button onClick={canslePrice} data-make-value="color"  className={style.cansleBrendBtn}>&times;</button>
    </div>
    
    <label className={style.sellcar_add_characteristics__label}>Ціна</label>
    <input className={style.sellcar_add_characteristics__input_title} type="text" value={(form.priceFrom!=="" || form.priceTo!=="")?`${form.priceFrom}-${form.priceTo} $`:"Ціна"} data-make-value="price"  
    onClick={handleInputClickYear} placeholder="Ціна" onChange={()=>null}/>
    <button onClick={canslePrice} data-make-value="price"  className={style.cansleBrendBtn}>&times;</button>
    {isShowPrice && <ul className={style.year_container}>
        <li><input className={style.sellcar_add_characteristics__input} type="text" value={form.priceFrom} data-make-value="priceFrom" onChange={handleInputChange}   
     placeholder="Від"/></li>
     <li><input className={style.sellcar_add_characteristics__input} type="text" value={form.priceTo} data-make-value="priceTo" onChange={handleInputChange}   
     placeholder="До"/></li>
        </ul>}
    </div>
    
</div>
          </div>
    <button type='submit' className={style.add_car__btn}>Пошук</button>
    </form>
    </div>
}
