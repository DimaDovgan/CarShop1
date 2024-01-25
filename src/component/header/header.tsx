"use client"
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { Emblem } from "../emblem/emblem"
import { Menu } from "../menu/menu"
import styles from "./styles.module.scss";
import { useLoginUserMutation } from '@/app/GlobalRedux/api/authApi';
import { logOut } from '@/app/GlobalRedux/api/features/userSlice';
// import  BellIcon  from '../../images/bell.svg';
// import bell from "../../images/bell.svg";
// import chat from "../../images/chat.svg";
// import heart from "../../images/heart.svg";
import { useLogoutMutation } from '@/app/GlobalRedux/api/authApi';
import { useSelector } from 'react-redux';
import { Bell } from '@/svgs';
import { Char } from '@/svgs';
import { Heart } from '@/svgs';
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

    return<div className={styles.header}>
      <div className={styles.container}>
      <div><Emblem width={110}/></div>
        <div className={styles.header_menu}>
          {user.email && <img
      src={user.avatarUrl || ''}
      alt="user"
      className={styles.menuIcon}
      onClick={()=>{ Logout("") 
      dispatch(logOut());
    }}
    />}
          <Bell className={styles.menuIcon}/>
          <Char className={styles.menuIcon}/>
          <Link href="/favoriteCar">
          <Heart className={`${styles.menuIcon} ${ user?.favoriteCar?.length>0 ? styles.heartIconActive : ''}`}/>
          </Link>
          {/* <div onClick={(event) => addFavCar(event)} className={styles.heart_component}> */}
          
           {/* </div> */}

          
            <Menu />
        
        </div>

      </div>
        
    </div>
}