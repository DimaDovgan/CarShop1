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

// Інтерфейс для пропсів компонента
interface InputWithRequestProps {
  setForm: Dispatch<SetStateAction<FormType>>;
  form: FormType;
}

// Компонент з типовими пропсами
const RegionInput: React.FC<InputWithRequestProps> = ({
  setForm,
  form,
}) => {
  const [isChoose, setIsChoose] = useState(false);
  const [currentRegion,setCurrentRegion]=useState("");
  const regionsOfUkraine = [
    "АР Крим",
    "Вінницька",
    "Волинська",
    "Дніпропетровська",
    "Донецька",
    "Житомирська",
    "Закарпатська",
    "Запорізька",
    "Івано-Франківська",
    "Київська",
    "Кіровоградська",
    "Луганська",
    "Львівська",
    "Миколаївська",
    "Одеська",
    "Полтавська",
    "Рівненська",
    "Сумська",
    "Тернопільська",
    "Харківська",
    "Херсонська",
    "Хмельницька",
    "Черкаська",
    "Чернівецька",
    "Чернігівська",
    "м. Київ",
    "м. Сімферополь"
];
//   console.log(objOfModel,"objOfModel");
  const coose = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsChoose(true);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = event.target.value;
    setCurrentRegion(data);
    setForm({ ...form, region: data});
  };
  const coose1=(event:React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    const region=event.target.getAttribute('data-region')as string;
        setForm({ ...form, region: region});
        setIsChoose(false);
  }
  const cansleBrend=(event: React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    setIsChoose(false);
    setForm({ ...form, region:""});
  }

  return (
    <div className={style.sellcar_add_characteristics__div}>
      <label className={style.sellcar_add_characteristics__label}>Область</label>
      <input
        type="text"
        value={form.region}
        onChange={handleInputChange}
        onClick={coose}
        placeholder="Вінницька"
        className={style.sellcar_add_characteristics__input}
      />
      <button onClick={(e)=>{ e.preventDefault(); setForm({...form,region:"" }); setIsChoose(false);}} className={style.cansleBrendBtn}>&times;</button>
      {(isChoose ) && (
        <div className={style.brend_list_container}>
          <ul>
            {
                filterByLetter(regionsOfUkraine,currentRegion).map((index,region)=>(
                    <li key={index} value={index} onClick={coose1}
                    data-region={index}
                      className={style.brend_list_item}
                       >
                      {index}
                    </li>))
            }
          </ul>
        </div>
      )}
      
      
    </div>
  );
};

const filterByLetter = (arr: string[], letter: string): any[] => {
    // Перетворюємо літеру в нижній регістр, щоб порівняння було нечутливим до регістру
    const lowercaseLetter = letter.toLowerCase();
  
    // Повертаємо новий масив, де елементи починаються з вказаної літери
    return arr.filter((title) => title.toLowerCase().startsWith(lowercaseLetter));
  };

export default RegionInput;