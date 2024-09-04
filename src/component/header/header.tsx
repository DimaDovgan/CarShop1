"use client"
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { Emblem } from "../emblem/emblem"
import Menu from "../menu/menu"
import styles from "./styles.module.scss";
import { useLoginUserMutation } from '@/app/GlobalRedux/api/authApi';
import { logOut } from '@/app/GlobalRedux/api/features/userSlice';
import { useLogoutMutation } from '@/app/GlobalRedux/api/authApi';
import { useSelector } from 'react-redux';
import { Bell } from '@/svgs';
import { Char } from '@/svgs';
import { Heart } from '@/svgs';
import {Profile_default} from '@/svgs'
import Link from 'next/link';

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

export const Header:React.FC=()=>{
  const dispatch = useDispatch();
    const user= useSelector((state:RootState) => state.userState.user);
    console.log("useSelector",user);
    const [Logout,{isLoading}]=useLogoutMutation();

    const logOutFunc=()=>{
      Logout("") 
      dispatch(logOut());
      localStorage.removeItem('user');

    }

    return<div className={styles.header}>
      <div className={styles.container}>
      <div><Emblem width={110}/></div>
        <div className={styles.header_menu}>
          <Bell className={styles.menuIcon}/>
          <Char className={styles.menuIcon}/>
          <Link href="/sellcar">
            <p >+ Продайте авто</p>
            </Link>
          <Link href="/favoriteCar">
          <Heart className={`${styles.menuIcon} ${ user?.favoriteCar?.length>0 ? styles.heartIconActive : ''}`}/>
          </Link>
            {user.email ? <div className={styles.header_menu_user} ><img src={user.avatarUrl || ''} alt="user"
      className={styles.menuIcon} onClick={logOutFunc} /><Link href="/cabinet" className={styles.menu_text}>Особистий кабінет</Link></div>:
      <Link href="/login" className={styles.header_menu_user}><Profile_default className={styles.menuProfileIcon}/><p className={styles.menu_text}>Увійти в кабінет</p></Link>}
            <div className={styles.burger}><Menu width={"30"} /></div>
        </div>

      </div>
        
    </div>
}