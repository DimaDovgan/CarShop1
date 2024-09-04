"use client"
import style from "./page.module.scss";
import {useEffect,useState} from "react";
import { redirect } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import { CharecteristikList } from "@/component/CharacteristikList/CharecteristikList";
import Joi from "joi";
import {notifyWarn,notifySuccess} from "../../helpers/toast";
import { useCreateSellCarMutation } from "../GlobalRedux/api/carApi";
import { useGetBrendsMutation } from "../GlobalRedux/api/characteristicsApi";
import { getBrend } from "../GlobalRedux/api/features/carCharacteristicsSlice";
import Image from "next/image";
import  Axios  from "axios";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DropDownList from "@/component/DropDownList/DropDownList";
import FileInput from "@/component/inputImg/inputImg";
import { uploadImgs } from "@/helpers/uploadImagesCload";
type UserState = {
    isLoggedIn: boolean;
    token: string;
    user: {
      email: string;
      subscription: string;
      avatarUrl?: string; 
    };
  };

interface RootState {
    userState:UserState;
  }

const defultform={
  brend:"",
  model:"",
  year:"",
  generation:"",
  engineV:"",
  power:"",
  fuel:"",
  transmission:"",
  wheelDrive:"",
  description:"",
  color:"",
  region:"",
  city:"",
  price:"",
  }

interface UploadedImage {
  id: number;
  urlLocal: string;
  file: any;
}

const schema = Joi.object({
  brend: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().required(),
  generation: Joi.string().required(),
  engineV: Joi.string().required(),
  power:Joi.string(),
  fuel:Joi.string(),
  transmission:Joi.string(),
  wheelDrive:Joi.string(),
  description:Joi.string(),
  imagesList:Joi.array(),
  color:Joi.string(),
  rsgion:Joi.string(),
  city:Joi.string(),
})

export type  SellcarImput = typeof schema;

const Sellcar: React.FC=()=>{
  const dispatch = useDispatch();
  const brends = useSelector((state:RootState) => state.characteristicsState.brends);
  const [imageList,setImageList]=useState<string[]>([]);;
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadedImageList, setUploadedImageList]=useState<UploadedImage[]>([]);
  const [addSellCar, { isLoading, isError, error, isSuccess }] = 
  useCreateSellCarMutation();
    const [form, setForm] = useState(defultform);
    const optionsTransmission=[{value:"Автомат"},{value:"Робот"},{value:"Механіка"},{value:"Варіатор"}]
    const optionsFuel = [{value:"Бензин"},{value:"Дизель"},{value:"Газ"},{value:"Бензин-газ"},{value:"Електро"}]
    const optionsWheelDrive =[{value:"Передній"},{value:"Задній"},{value:"Повний"}]
  const [showListFuel, setShowListFuel] = useState(false);
  const [showListWheelDrive, setShowListWheelDrive] = useState(false);
  const [showListTransmission, setShowListTransmission] = useState(false);

  const [getAllBrend, { isLoading:isLoadingGetBrend, isError:isErrorGetBrend, error:errorGetBrend, isSuccess:isSuccessGetBrend }] = useGetBrendsMutation()
  const getBrends = async () => {
    try {
      const { data } = await getAllBrend({});
      console.log(data, "data");
  
      const carsArr = data.cars ? [...data.cars] : []; // Переконайтеся, що це масив, навіть якщо порожній
      console.log(carsArr, "carsArr1");
  
      carsArr.sort((a, b) => {
        const titleA = a.titlebrend?.toLowerCase() || ''; // Захист від `undefined`
        const titleB = b.titlebrend?.toLowerCase() || '';
  
        if (titleA < titleB) {
          return -1;
        }
  
        if (titleA > titleB) {
          return 1;
        }
  
        return 0;
      });
  
      console.log(carsArr, "carsArr2");
  
      if (carsArr.length > 0) { // Перевірте, чи масив не порожній
        dispatch(getBrend({ cars: carsArr }));
      }
    } catch (error) {
      console.error("Error in getBrends:", error); // Вивести помилку в консоль
    }
  };

  useEffect(()=>{
    getBrends();

  },[]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data=event.target.value;
    const pole=event.target.getAttribute('data-make-value')as string;
    setForm({...form,[pole]:data})
    
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
  const submiteForm=async(event: React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    try {
      const uploadedUrls = await uploadImgs(uploadedImageList)
      await schema.validate({...form,imagesList:uploadedUrls}, { abortEarly: false });
      console.log("add sell car");
      const car= await addSellCar({...form,imagesList:uploadedUrls});
      console.log(car,"car------")
      if('error' in car){
        notifyWarn(`Ви маєте проблеми із додаваням авто!!!`);
      }
      else{
        setForm(defultform);
          setUploadedImageList([]);
          setImageList([])
        notifySuccess("Ви створили автомобіль");
      }
    } catch (error) {
        notifyWarn(error.message);
      
    }
  }
     
  const addImage = (urlLocal: string | null, file: any) => {
    setUploadedImageList((prevList) => [
      ...prevList,
      { id: uuidv4(), urlLocal: urlLocal, file: file },
    ]);
    console.log(uploadedImageList,"UploadedImageList")
  };
  
  const removeImage = (id: string) => {
    setUploadedImageList((prevList) => prevList.filter((image) => image.id !== id));
  };

  const changeImg=(event: React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
try {
const fileList = event.target.files;
if (fileList) {
  const file = fileList[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const urlLocal = e.target.result as string;
    setUploadedImageUrl(urlLocal);
    addImage(urlLocal,file); 

  };
  reader.readAsDataURL(file);
}
} catch (error) {
  console.log(error,"changeImg")
}
  }
    const user= useSelector((state:RootState) => state.userState.user);
    useEffect(()=>{
      
     if(!user.email){
        console.log("ffffffff")
         redirect('/login');
     }
    },[user])
   

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
    const [isChooseBrend, setIsChooseBrend] = useState(false);
    const cooseBrend=()=>{
      setIsChooseBrend(true);
    }
    const chooseConkret=(event: React.MouseEvent<HTMLInputElement>)=>{
      event.preventDefault();
    const atribute=event.target.getAttribute('data-make-value')as string;
    
    }
    
    return <div className={style.sellcar} >
    <div className={style.sellcar_title}>
    <p className={style.sellcar_title__text}>Додавання оголошення</p>
    <div className={style.sellcar_title__forspan}>
    <span className={style.sellcar_title__span}> <span className={style.sellcar_title__span}>Основна інформація</span><br/> Вкажіть характеристики </span>
    </div>
    </div>
    <div className={style.sellcar_addimg__container}><div className={style.sellcar_addimg__title}><div className={style.sellcar_addimg__title__circle}>1</div> Додайте кілька фото</div>
    <div className={style.addimg_list}>
    {uploadedImageList.length<=0 ? <p className={style.sellcar_addimg__noimg__text}>Оберіть фото</p> : <ul>
      {
        uploadedImageList.map(({id,urlLocal,file})=><li className={style.sellcar_addimg__li} key={id}><img src={urlLocal} alt="Обране зображення" className={style.sellcar_addimg__img} /> <div className={style.delimg_icon} onClick={()=>{removeImage(id)}}>&times;</div></li>)
      }
        </ul>
        }
    </div>
    <div className={style.addstylfor_btn}>
    <FileInput onChange={changeImg}/>
    </div>
    </div>
    <div className={style.sellcar_add_characteristics__container}>
    <div className={style.sellcar_addimg__title}>
    <div className={style.sellcar_addimg__title__circle}>2</div>Основна інформація</div>
    <form onSubmit={submiteForm} className={style.forma}>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Марка авто</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.brend} data-make-value="brend"  onChange={handleInputChange}
    onClick={cooseBrend} placeholder="Марка"/>
     {isChooseBrend && (
        <div className={style.brend_list_container}> 
          <ul>
            {brends && brends.map((brend, index) => (
              <li key={index} data-make-value="brend" onClick={chooseConkret} >{brend.titlebrend}</li> 
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Модель авто</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.model } data-make-value="model"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Модель"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Колір</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.color } data-make-value="color"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Колір"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Рік виробництва</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.year } data-make-value="year" onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Рік виробництва"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Покоління</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.generation } data-make-value="generation"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Покоління"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Паливо</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.fuel} data-make-value="fuel"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Паливо"/>
    {showListFuel && <DropDownList options={optionsFuel} lable="fuel" onChange={handleChange11}/>}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Обєм двигуна</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.engineV } data-make-value="engineV"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Обєм"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Потужність</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.power } data-make-value="power"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Потужність кс"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Привід</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.wheelDrive} data-make-value="wheelDrive"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Привід"/>
    {showListWheelDrive && <DropDownList options={optionsWheelDrive} lable="wheelDrive" onChange={handleChange11}/>}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Трансмісія</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.transmission} data-make-value="transmission"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Трансмісія"/>
    {showListTransmission && <DropDownList options={optionsTransmission} lable="transmission" onChange={handleChange11}/>}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Область</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.region } data-make-value="region"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Вінницька"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Місто</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.city } data-make-value="city"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Вінниця"/>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Ціна</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.price } data-make-value="price"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="$$$"/>
    </div>
    <div className={style.sellcar_add_description__container}>
    <div className={style.sellcar_addimg__title}>
    <div className={style.sellcar_addimg__title__circle}>3</div>Опис вашої автівки</div>
    <div >
    <label className={style.sellcar_add_description__lable} >Напишіть кілька речень про стан, особливості вашого автомобіля</label>
    <textarea className={style.sellcar_add_description} value={form.description} name="description" rows="4" cols="50" placeholder="Короткий можна і не дуже опис ..." data-make-value="description"  onChange={handleInputChange}></textarea>
    </div>
    </div>
    <div className={style.dopfor_btn}>
    <button type="submit" className={style.add_car__btn}>Виставити авто на продаж</button>
    </div>
    
    </form>
    </div>


</div>
}
export default Sellcar;

