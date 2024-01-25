'use client';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import styles from './DropdownMenu.module.scss';
interface DropdownMenuProps {
  isOpenMenu: boolean;
  setisOpenMenu:Function;
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpenMenu,setisOpenMenu }) => {
  const [isOpen, setIsOpen] = useState(isOpenMenu);
  const [selectedOption, setSelectedOption] = useState('');
  useEffect(() => {
    setIsOpen(isOpenMenu);
  }, [isOpenMenu]);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div>
        {isOpen && <div className={styles.drop_down__menu}>
          <ul >
            <li className={styles.drop_down__menu__li}><Link href="/signin"><p className={styles.drop_down__menu__li__text}>Створити кабінет</p></Link></li>
            <li className={styles.drop_down__menu__li}><Link href="/login"><p className={styles.drop_down__menu__li__text}>Увійти в кабінет</p></Link></li>
            <li className={styles.drop_down__menu__li}><Link href="/sellcar"><p className={styles.drop_down__menu__li__text}>Продати авто</p></Link></li>
            <li className={styles.drop_down__menu__li}><Link href="/buycarZSU"><p className={styles.drop_down__menu__li__text}>Збір на авто для ЗСУ</p></Link></li>
          </ul>
            </div>}
    </div>
  );
};

export default DropdownMenu;

// <div className={styles.dropdown}>
    //   <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
    //     {selectedOption || 'Select an option'}
    //   </div>
    //   {isOpen && (
    //     <div className={styles.dropdownList}>
    //       <div
    //           className={styles.dropdownListItem}
    //           onClick={() => handleOptionClick("sig-in")}
    //         >Створити кабінет
    //         </div>
    //         <div
    //           className={styles.dropdownListItem}
    //           onClick={() => handleOptionClick("log-in")}
    //         >Увійдіти в кабінет
    //         </div>
    //     </div>
    //   )}
    // </div>