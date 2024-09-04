"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from './index.module.scss';


// Інтерфейс для даних `FormType`
interface FormType {
  brend: string;
  model: string;
  year: string;
  generation: string;
  engineV: string;
  power: string;
  fuel: string;
  transmission: string;
  wheelDrive: string;
  description: string;
  imagesList: any[];
  color: string;
  region: string; // виправлено помилку в назві
  city: string;
}

// Інтерфейс для об'єктів `brends`
interface Brend {
  titlebrend: string;
}

// Інтерфейс для пропсів компонента
interface InputWithRequestProps {
  model: any; // Масив об'єктів `Brend`
  setForm: Dispatch<SetStateAction<FormType>>;
  form: FormType;
  type: string;
  setChoosed:Dispatch<SetStateAction<any>>;
  listTitle:string;
  ukrTitle:string;
}

// Компонент з типовими пропсами
const InputWithRequestYear: React.FC<InputWithRequestProps> = ({
  model,
  setForm,
  form,
  type,
  setChoosed,
  listTitle,
  ukrTitle,
}) => {
  const [isChoose, setIsChoose] = useState(false);
  const [objOfModel,setObjOfModel]=useState(model);
  const [arrOfYears,setArrOfYears]=useState<number[]>([]);
  useEffect(()=>{
    if(model){
        setObjOfModel(model);
        setArrOfYears(getArrOfYears(model));
    }
  },[model]);
//   console.log(objOfModel,"objOfModel");
  const coose = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsChoose(true);
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = event.target.value;
    // setArrOfBrends(filterByLetter(brends,data));
    
    setForm({ ...form, [type]: data });
  };
  const coose1=(event:React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    const year=event.target.getAttribute('data-year')as number;
        setForm({ ...form, [type]: year});

        // setChoosed({
        //     generationId,
        //     brendId,modelId});
        
            

        
        setIsChoose(false);
  }
  const cansleBrend=(event: React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    setIsChoose(false);
    setForm({ ...form, [type]:""});
    setChoosed(null);

  }

  return (
    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.sellcar_add_characteristics__label}>{ukrTitle} авто</label>
      <input
        type="text"
        value={form[type]}
        onChange={handleInputChange}
        onClick={coose}
        placeholder={type}
        className={style.sellcar_add_characteristics__input}
      />
      <button onClick={cansleBrend} className={style.cansleBrendBtn}>&times;</button>
      {(isChoose && arrOfYears.length>0) && (
        <div className={style.brend_list_container}>
          <ul>
            {
                arrOfYears.map((year,index)=>(
                    <li key={index} value={year} onClick={coose1}
                    data-year={year}
                      className={style.brend_list_item}
                       >
                      {year}
                    </li>))
            }
          </ul>
        </div>
      )}
      {(isChoose && arrOfYears.length===0) && (<div className={style.brend_list_nobrend}><p className={style.sellcar_add_characteristics__label} >Оберіть попереднє поле</p></div>) }
      
    </div>
  );
};

const filterByLetter = (arr: any[], letter: string): any[] => {
    // Перетворюємо літеру в нижній регістр, щоб порівняння було нечутливим до регістру
    const lowercaseLetter = letter.toLowerCase();
  
    // Повертаємо новий масив, де елементи починаються з вказаної літери
    return arr.filter(({titlebrend}) => titlebrend.toLowerCase().startsWith(lowercaseLetter));
  };
const getArrOfYears=(model:any):number[]=>{
    const years: number[]=[];
    const currentDate = new Date(); 
const currentYear = currentDate.getFullYear();
let endYear=Number(model.endYear);
    if(endYear==0)endYear=currentYear;
    if (Number(model.startYear) > endYear) {
        return years; 
      }
    for (let index = Number(model.startYear); index <=endYear; index++) {
        years.push(index);
    }
    return years;
}
export default InputWithRequestYear;