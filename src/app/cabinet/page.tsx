"use client"
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import {EditUser} from '@/component/cabinetMenu/index';
import styles from "./page.module.scss";
import { Edit } from '@/svgs';
import { useSelector } from 'react-redux';
import React,{ useState } from 'react';
import Link from 'next/link';
import ClientSidebar from '@/component/ClientSidebar/ClientSidebar';
import { ClientChat, MyAvb, PersonalCabinet,DefultPages } from "@/component/ClientPages"
type UserState = {
    isLoggedIn: boolean;
    token: string;
    user: {
        name:string;
      email: string;
      subscription: string;
      avatarUrl?: string; 
      phoneNumber?:string;
    };
  };

interface RootState {
    userState:UserState;
  }

  

const Cabinet:React.FC=()=>{
  const [selectedPage, setSelectedPage] = useState("");

  const dispatch = useDispatch();
    const user= useSelector((state:RootState) => state.userState.user);
    console.log("useSelector",user);

    function renderPage():React.ReactElement{
        switch (selectedPage) {
            case "PersonalCabinet":
              return <PersonalCabinet/>
              case "MyAvb":
                return <MyAvb/>
                case "ClientChat":
                  return <ClientChat/>
        
            default:
              return <DefultPages/>
                
                break;
        }
       ;
    }




    return<div className={styles.cabinet_container}  >
      <ClientSidebar onSelect={setSelectedPage} />
      {renderPage()}
    </div>
}
export default Cabinet;