"use client"
import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styles from "./scrollBtn.module.scss"
const ScrollToTopButton: React.FC = () => {
  const scrollToTop:React.MouseEventHandler<HTMLButtonElement> = () => {
    scroll.scrollToTop({
      duration: 1000, 
      smooth: 'easeInOutQuart', 
    });
  };

  return (
    <button onClick={scrollToTop} className={styles.scroll_to_top_button}>
      ↑ Наверх
    </button>
  );
};

export default ScrollToTopButton;