"use client"
import style from "./page.module.scss";
import {useEffect,useState} from "react";
import { redirect } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import { CharecteristikList } from "@/component/CharacteristikList/CharecteristikList";
import Joi from "joi";
import {notifyWarn,notifySuccess} from "../../helpers/toast";
import { useCreateSellCarMutation,useFixSellCarMutation } from "../GlobalRedux/api/carApi";
import { useGetBrendsMutation ,useGetModelsMutation,useGetModificationMutation,useGetCharacteristicsMutation} from "../GlobalRedux/api/characteristicsApi";
import { getBrend,getModel,getModifications } from "../GlobalRedux/api/features/carCharacteristicsSlice";
import Image from "next/image";
import  Axios  from "axios";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DropDownList from "@/component/DropDownList/DropDownList";
import FileInput from "@/component/inputImg/inputImg";
import { uploadImgs } from "@/helpers/uploadImagesCload";
import {InputWithRequest,InputWithRequestYear,ModificatonsInput,RegionInput,ModelInput} from "@/component/InputWithRequest";
// import req from "./requests";
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
  body:"",
  range:""
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
  range:Joi.string(),
})
interface SellCarProps {
  optionalProp?: string;
  optionId?:string;
}

export type  SellcarImput = typeof schema;

const Sellcar: React.FC<SellCarProps> = ({ optionalProp ,optionId})=>{
  const dispatch = useDispatch();
  const brends = useSelector((state:RootState) => state.characteristicsState.brends);
  const models = useSelector((state:RootState) => state.characteristicsState.models);
  const modifications = useSelector((state:RootState) => state.characteristicsState.modifications);
  const[showListFuel,setShowListFuel]=useState(false);
  const [choosedModel,setChoosedModel]=useState(null);
  const [chooseBrend,setChoosBrend]=useState(null);
  const [choosModel,setChoosModel]=useState(null);
  const [choosModification,setChoosModification]=useState(null);
  const [choosYear,setChoosYear]=useState(null);
  const [imageList,setImageList]=useState<string[]>([]);;
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadedImageList, setUploadedImageList]=useState<UploadedImage[]>([]);
  const [addSellCar, { isLoading, isError, error, isSuccess }] = 
  useCreateSellCarMutation();
  const [fixSellCar, { isLoading:isLoadingFixSellCar, isError:isErrorFixSellCar, error:errorFixSellCar, isSuccess:isSuccessFixSellCar }] = 
  useFixSellCarMutation();
    const [form, setForm] = useState(defultform);
   
    const [getAllBrend, { isLoading:isLoadingGetBrend, isError:isErrorGetBrend, error:errorGetBrend, isSuccess:isSuccessGetBrend }] = useGetBrendsMutation();
    const [getAllModel, { isLoading:isLoadingGetModel, isError:isErrorGetModel, error:errorGetModel, isSuccess:isSuccessGetModel }] =useGetModelsMutation();
    const [getAllModification, { isLoading:isLoadingGetModification, isError:isErrorGetModification, error:errorGetModification, isSuccess:isSuccessGetModification }] = useGetModificationMutation();
    const [getAllCharacteristics, { isLoading:isLoadingGetCharacteristics, isError:isErrorGetCharacteristics, error:errorGetCharacteristics, isSuccess:isSuccessGetCharacteristics }] = useGetCharacteristicsMutation();
    useEffect(()=>{
    console.log(form,"formmm 1212")
    },[form])
    
    const getModification = async () => {
      try {
        if(choosModel){
          console.log(choosModel,"choose modell");
          const{data}= await getAllModification(choosModel)
          console.log(data.cars,"data.cars");
          if(data.cars.length>0){
            dispatch(getModifications({cars:data.cars}));
          }
        }
      } catch (error) {
        console.error("Error in getModifications:", error);
        dispatch(getModifications({cars:[]}));
      }
    }
    const getCharacteristics=async ()=>{
      try {
        if(choosModification){
          const { data } = await getAllCharacteristics(choosModification);;
          const carCharact=data.cars[0];
          setForm({ ...form,engineV:carCharact.Engine.EngineCapacity,
            power:carCharact.Engine.Power,fuel:carCharact.Engine.Fuel,body:carCharact.Body.Body});
        }
        
      } catch (error) {
        console.error("Error in getModel:", error);
      }
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
    setChoosModification(null);
   },[chooseBrend])
   useEffect(()=>{
      getModification();
   },[choosModel])
   useEffect(()=>{
    if(choosModification)getCharacteristics();
   },[choosModification])
  const submiteForm=async(event: React.MouseEvent<HTMLInputElement>)=>{
    event.preventDefault();
    if(optionalProp && optionId){
      try {
        const uploadedUrls = await uploadImgs(uploadedImageList)
        await schema.validate({...form,imagesList:uploadedUrls}, { abortEarly: false });
        console.log("add sell car");
        const car= await fixSellCar({ id: optionId, data: {...form,imagesList:uploadedUrls} });
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
    else{
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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const data=event.target.value;
      const pole=event.target.getAttribute('data-make-value')as string;
      setForm({...form,[pole]:data})
    };
    const cansleBrend=(event: React.ChangeEvent<HTMLInputElement>)=>{
      event.preventDefault();
      const pole=event.target.getAttribute('data-make-value')as string;
      setForm({ ...form, [pole]:""});
    }
    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      const atribute=event.target.getAttribute('data-make-value')as string;
      switch (atribute) {
        case "fuel":
          setShowListFuel(true);
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
        default:
          break;
          }
        } else {
          console.log("Selected option is null");
        }
      };
    return <div className={style.sellcar} >
    <div className={style.sellcar_title}>
    <p className={style.sellcar_title__text}>Введіть опис автомобіля</p>
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
    <form  className={style.forma}>
    <InputWithRequest brends={brends} setForm={setForm} form={form} type="brend" setChoosed={setChoosBrend} listTitle="titlebrend" ukrTitle="Марка"/>
    <ModelInput brends={models} setForm={setForm} form={form} type="model" setChoosed={setChoosModel} listTitle="name" ukrTitle="Модель" setChoosedModel={setChoosedModel}/>
    {/* <InputWithRequest /> */}
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Колір</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.color } data-make-value="color" 
     placeholder="Колір" onChange={handleInputChange}/>
      <button onClick={cansleBrend} data-make-value="color"  className={style.cansleBrendBtn}>&times;</button>
    </div>
    <InputWithRequestYear model={choosedModel} setForm={setForm} form={form} type="year" setChoosed={setChoosYear} listTitle="name" ukrTitle="Рік"/>
    <ModificatonsInput modifications={modifications} setForm={setForm} form={form}  setChoosed={setChoosModification} />
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Паливо</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.fuel} data-make-value="fuel"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Паливо необов'язково"/>
    <button onClick={(e)=>{ e.preventDefault();
    setShowListFuel(false);
    setForm({ ...form, fuel:""});}} className={style.cansleBrendBtn}>&times;</button>
    {showListFuel && <DropDownList options={[{value:"Дизель"},{value:"Бензин"},{value:"Газ"},{value:"Газ-бензин"},{value:"Гібрид"},{value:"Електрика"}]} setForm={setForm} form={form} lable="fuel" setShowList={setShowListFuel}   />}
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Пробіг тис.км</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.range } data-make-value="range"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="999 тис.км"/>
    <button onClick={(e)=>{ e.preventDefault(); setForm({...form,range:"" })}} className={style.cansleBrendBtn}>&times;</button>
    </div>
    <RegionInput setForm={setForm} form={form} />
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Місто</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.city } data-make-value="city"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="Вінниця"/>
     <button onClick={(e)=>{ e.preventDefault(); setForm({...form,city:"" })}} className={style.cansleBrendBtn}>&times;</button>
    </div>
    <div className={style.sellcar_add_characteristics__div}>
    <label className={style.sellcar_add_characteristics__lable}>Ціна</label>
    <input className={style.sellcar_add_characteristics__input} type="text" value={form.price } data-make-value="price"  onChange={handleInputChange}
    onClick={handleInputClick} placeholder="$$$"/>
     <button onClick={(e)=>{ e.preventDefault(); setForm({...form,price:"" })}} className={style.cansleBrendBtn}>&times;</button>
    </div>
    <div className={style.sellcar_add_description__container}>
    <div className={style.sellcar_addimg__title}>
    <div className={style.sellcar_addimg__title__circle}>3</div>Опис вашої автівки</div>
    <div >
    <label className={style.sellcar_add_description__lable} >Напишіть кілька речень про стан, особливості вашого автомобіля</label>
    <textarea onChange={handleInputChange} className={style.sellcar_add_description} value={form.description} name="description" rows="4" cols="50" placeholder="Короткий можна і не дуже опис ..." data-make-value="description"  ></textarea>
    </div>
    </div>
    <div className={style.dopfor_btn}>
    <button type="button" onClick={submiteForm} className={style.add_car__btn}>Опублікувати</button>
    </div>
    </form>
    </div>
</div>
}
export default Sellcar;

