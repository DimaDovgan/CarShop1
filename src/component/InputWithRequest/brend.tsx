
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
  brends: any[]; // Масив об'єктів `Brend`
  setForm: Dispatch<SetStateAction<FormType>>;
  form: FormType;
  type: string;
  setChoosed:Dispatch<SetStateAction<any>>;
  listTitle:string;
  ukrTitle:string;
  setChoosedModel?:Dispatch<SetStateAction<any>>;
}

// Компонент з типовими пропсами
const InputWithRequest: React.FC<InputWithRequestProps> = ({
  brends,
  setForm,
  form,
  type,
  setChoosed,
  listTitle,
  ukrTitle,
  setChoosedModel,
}) => {
  const [isChoose, setIsChoose] = useState(false);
  const [arrOfBrends,setArrOfBrends]=useState(brends);
  useEffect(()=>{
    setArrOfBrends(brends);
  },[brends]);
  // console.log(arrOfBrends,"arrOfBrends");
  const coose = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsChoose(true);
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = event.target.value;
    setArrOfBrends(filterByLetter(brends,data));
    
    setForm({ ...form, [type]: data });
  };
  const coose1=(brend:any)=>{
        setForm({ ...form, [type]: brend[listTitle]});
        console.log(brend,"brend&&&&&&&&&&&&&")
        switch (type) {
            case "brend":
                setChoosed(brend.brendId);
                break;
                case "model":
                setChoosed({
                  generationId:brend.generationId,
                  brandId:brend.brandId,modelId:brend.modelId});
                  if(setChoosedModel)setChoosedModel(brend);
                break;
        
            default:
                break;
        }
       
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
      {(isChoose && arrOfBrends.length>0) && (
        <div className={style.brend_list_container}>
          {/* Переконайтесь, що `brends` має коректний тип */}
          <ul>
            {arrOfBrends.map((brend, index) => (
              <li key={index} value={brend.titlebrend} onClick={()=>coose1(brend)}
                //  data-key={brend.brendId}
                //  data-make-value={brend[listTitle]}
                //  data-generationId={brend.generationId}
                //  data-modelId={brend.modelId}
                //  data-modificationId={brend.modificationId}
                className={style.brend_list_item}
                 >
                
                {brend[listTitle]}
              </li>
            ))}
          </ul>
        </div>
      )}
      {(isChoose && arrOfBrends.length===0) && (<div className={style.brend_list_nobrend}><p className={style.sellcar_add_characteristics__label} >Оберіть попереднє поле</p></div>) }
      
    </div>
  );
};

const filterByLetter = (arr: any[], letter: string): any[] => {
    // Перетворюємо літеру в нижній регістр, щоб порівняння було нечутливим до регістру
    const lowercaseLetter = letter.toLowerCase();
  
    // Повертаємо новий масив, де елементи починаються з вказаної літери
    return arr.filter(({titlebrend}) => titlebrend.toLowerCase().startsWith(lowercaseLetter));
  };
export default InputWithRequest;