'use client'
import React,{ useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../GlobalRedux/api/authApi';
import { logIn } from '../GlobalRedux/api/features/userSlice';
import {ToastContainer } from 'react-toastify';
import {notifyWarn,notifySuccess} from "../../helpers/toast";
import * as yup from 'yup';
import stayes from "./page.module.scss"
import styles from './page.module.scss';
import Link from 'next/link';
import { LoginHero } from '@/svgs';

const schema = yup.object().shape({
  email: yup.string().email('Введіть дійсну електронну адресу').required('Електронна адреса обов\'язкова'),
  password: yup.string().min(6, 'Пароль повинен містити  6 символів').required('Пароль обов\'язковий'),
});
export type LogInInput = typeof schema;

const LogIn:React.FC = () => {
  
   const [LoginUser, { isLoading, isError, error, isSuccess }] = 
   useLoginUserMutation();
   const dispatch = useDispatch();
  //  const [showLoginHero, setShowLoginHero] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      const user=await LoginUser({ email:email,password:password });
      console.log(user,"user------")
      if('error' in user){
        notifyWarn(`${email} ви маєте проблеми із входом!!!`);
      }
      else{
        dispatch(logIn(user));
        setEmail("");
        setPassword("");
        notifySuccess("Увійшли в кабінет");
        
        // const user = { username: 'example', token: 'yourAuthToken' };
localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err) {
      console.log(err);
      notifyWarn(`${email} ви маєте проблеми із входом!!!`);
    }
  };
  return (
    <div className={stayes.sigin_container}>
      <LoginHero className={styles.login_hero}/>
    <form onSubmit={handleSubmit} className={stayes.sigin_forma}>
      <div className={stayes.sigin_form__compon}>
        <label className={stayes.sigin_form__compon_label}>Електрона адреса:</label>
        <div className={stayes.sigin_form__compon_inp_elem}>
        <input type="email" value={email} onChange={handleEmailChange} className={stayes.sigin_form__compon_input} />
        {errors.email && <p className={stayes.sigin_form__compon__errtext}>{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className={stayes.sigin_form__compon_label}>Пароль:</label>
        <div className={stayes.sigin_form__compon_inp_elem}>
        <input type="password" value={password} onChange={handlePasswordChange} className={stayes.sigin_form__compon_input}/>
        {errors.password && <p className={stayes.sigin_form__compon__errtext}>{errors.password}</p>}
        </div>
      </div>
      <Link href="/signin" className={styles.registration_text}>Зареєструватися на CarShop</Link>
      <button type="submit" className={styles.sigin_form_submit}>Register</button>
    </form>
    </div>
  );
};



export default LogIn;