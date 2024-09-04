'use client'
import React,{ useState } from 'react';
import * as yup from 'yup';
import stayes from "./page.module.scss"
import styles from './page.module.scss';
import { notifySuccess } from '@/helpers/toast';
import { notifyWarn } from '@/helpers/toast';
import { LoginHero } from '@/svgs';
// import { useDispatch } from 'react-redux';

import { useRegisterUserMutation } from '../GlobalRedux/api/authApi';

const schema = yup.object().shape({
    name:yup.string().min(2,'Імя повино містити мінімум 2 букви').required('Ім\'я обов\'язковe'),
  email: yup.string().email('Введіть дійсну електронну адресу').required('Електронна адреса обов\'язкова'),
  password: yup.string().min(6, 'Пароль повинен містити  6 символів').required('Пароль обов\'язковий'),
});

export type SignInInput = typeof schema;

const SignIn:React.FC = () => {
  const [RegisterUser, { isLoading, isError, error, isSuccess }] =
  useRegisterUserMutation();
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate({ email, password,name }, { abortEarly: false });
      const user=await RegisterUser({ email: email, password:password,name:name });
      console.log("send form")
      if('error' in user){
        notifyWarn(`${email} виникла проблема із реєстрацією!!!`);
      }
      else{
        notifySuccess("Ви зареєстровані");
      }
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error: yup.ValidationError) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
    }
  };
  return (
    <div className={stayes.sigin_container}>
      <LoginHero className={styles.login_hero}/>
    <form onSubmit={handleSubmit} className={stayes.sigin_forma}>
        <div className={stayes.sigin_form__compon}>
        <label className={stayes.sigin_form__compon_label}>Ім'я:</label>
        <div className={stayes.sigin_form__compon_inp_elem}>
        <input type="text" value={name} onChange={handleNameChange}  className={stayes.sigin_form__compon_input}/>
        {errors.name && <p className={stayes.sigin_form__compon__errtext}>{errors.name}</p>}
        </div>
        
      </div>
      <div className={stayes.sigin_form__compon}>
        <label className={stayes.sigin_form__compon_label}>Електрона адреса:</label>
        <div className={stayes.sigin_form__compon_inp_elem}>
        <input type="email" value={email} onChange={handleEmailChange} className={stayes.sigin_form__compon_input} />
        {errors.email && <p className={stayes.sigin_form__compon__errtext}>{errors.email}</p>}
        </div>
      </div>
      <div>
        <label>Пароль:</label>
        <div className={stayes.sigin_form__compon_inp_elem}>
        <input type="password" value={password} onChange={handlePasswordChange} className={stayes.sigin_form__compon_input}/>
        {errors.password && <p className={stayes.sigin_form__compon__errtext}>{errors.password}</p>}
        </div>
      </div>
      <button type="submit" className={styles.sigin_form_submit}>Register</button>
    </form>
    </div>
  );
};


export default SignIn;