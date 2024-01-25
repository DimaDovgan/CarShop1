"use client"

import React ,{ useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
  // import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from "./slider.module.scss"
import "./slider.css"
interface SliderProps {
  imagesList: string[];
}
const Slider: React.FC<SliderProps> = ({ imagesList }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  console.log(imagesList,"imagesList");
  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
    console.log("handleSlideChange----",swiper.activeIndex)
  };
  const handleThumbnailClick = (index) => {
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(index);
    }
  };
  return (
    <section>
      <div className={styles.swiper_component}>
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,}}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper1"
           onSlideChange={(swiper) => handleSlideChange(swiper)}>
          {imagesList.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={styles.swiper_div}>
                <img
                  src={image}
                  alt="img"
                  className={styles.swiper_img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          // className="mySwiper"
          className={styles.swiper_thumbnail}
          >
          {imagesList.map((image, index) => (
            <SwiperSlide key={index} className={styles.thumbnail_component}> 
              <button
                className={index === activeSlide ? styles.active : ''}>
                <img className={styles.thumbnail_img}
                  src={image}
                  alt="img menu"/>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
