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
  modifications: any[]; // Масив об'єктів `Brend`
  setForm: Dispatch<SetStateAction<FormType>>;
  form: FormType;
  setChoosed:Dispatch<SetStateAction<any>>;
}

// Компонент з типовими пропсами
const ModificatonsInput: React.FC<InputWithRequestProps> = ({
  modifications,
  setForm,
  form,
  setChoosed,
}) => {
  const [isChoose, setIsChoose] = useState(false);
  const [inputValue,setInputValue]=useState("");

  const coose = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsChoose(true);
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // const data = event.target.value;
    // setArrOfBrends(filterByLetter(brends,data));
    
    // setForm({ ...form, [type]: data });
  };
  const coose1=(modif:any)=>{
    console.log(modif,"modif",)
    setInputValue(modif.modifString);
    setChoosed({brandId:modif.brandId,
        modelId:modif.modelId,
        generationId:modif.generationId,
        modificationId:modif.modificationId
        })
        setForm({ ...form,transmission:modif.transmission , wheelDrive:modif.wheelDrive});
        
        setIsChoose(false);

  }
  const cansleBrend=(event: React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    setIsChoose(false);
    setInputValue("");
    // setForm({ ...form, engineV:"",
    //     fuel:"",
    //     power:"",
    //     wheelDrive:"",
    //     transmission:"",
    //  });
    setChoosed(null);

  }

  return (
    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.sellcar_add_characteristics__label}>Модифікація авто</label>
      <input
        type="text"
        value={inputValue}
        onClick={coose}
        placeholder="Modification"
        className={style.sellcar_add_characteristics__input}
      />
      <button onClick={cansleBrend} className={style.cansleBrendBtn}>&times;</button>
      {(isChoose && modifications.length>0) && (
        <div className={style.brend_list_container}>
          {/* Переконайтесь, що `brends` має коректний тип */}
          <ul>
            {modifications.map((modif, index) => (
              <li key={index} value={modif.engineCapacity} onClick={()=>coose1(modif)}
                className={style.brend_list_item}
                 >
                {modif.modifString};
              </li>
            ))}
          </ul>
        </div>
      )}
      {(isChoose && modifications.length===0) && (<div className={style.brend_list_nobrend}><p className={style.sellcar_add_characteristics__label} >Оберіть попереднє поле</p></div>) }
      
    </div>
  );
};

const translateFuel = (fuel: string): string => {
    if (fuel === "petrol") {
      return "бензин";
    } else if (fuel === "diesel") {
      return "дизель";
    } else {
      return fuel; // Якщо значення не відомо, повертаємо його без змін
    }
  };
export default ModificatonsInput;