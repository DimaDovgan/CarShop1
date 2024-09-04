"use client"
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logIn,logOut } from './GlobalRedux/api/features/userSlice';
import { useReLoginUserMutation } from '@/app/GlobalRedux/api/authApi';
import {notifyWarn,notifySuccess} from "@/helpers/toast";
type UserState = {
    isLoggedIn: boolean;
    token: string;
    user: {
        name:string;
      email: string;
      subscription: string;
      avatarUrl?: string; 
    };
  };

interface RootState {
    userState:UserState;
  }

export const AuthReboot=()=>{
  const [ReLoginUser, { isLoading, isError, error, isSuccess }] = 
  useReLoginUserMutation();
    const dispatch = useDispatch();
    const user= useSelector((state:RootState) => state.userState.user);
  useEffect(() => {
    const reLogin=async()=>{
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
                const user1 = JSON.parse(storedUser);
                const foo=await dispatch(logIn(user1));
          const {user,token}= user1.data;
        const auth=await ReLoginUser({ email:user.email});
        if('error' in auth){
          dispatch(logOut)
          notifyWarn(`Ви маєте проблеми із входом в CarShop!!!`);
          localStorage.removeItem('user');
        }
        else{
          notifySuccess(`Все добре !!!`);
          dispatch(logIn(auth));
        }
      }
    }catch(err) {
      console.log(err);
      notifyWarn(`Ви маєте проблеми із входом в CarShop!!!`);
      localStorage.removeItem('user');
    }
  }
   reLogin();
    
   
  }, []);

  return null
}