"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import logo1 from "@/images/logo1.png";
import logo2 from "@/images/logo2.png";
import logo3 from "@/images/logo3.png";
import logo4 from "@/images/logo4.png";
import logo5 from "@/images/logo5.png";

const LogoSlider = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={5}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 100,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 150,
        },
      }}
    >
      <SwiperSlide>
        <div className="logo-slider-item">
          <Image src={logo1} alt="Logo" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="logo-slider-item">
          <Image src={logo2} alt="Logo" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="logo-slider-item">
          <Image src={logo3} alt="Logo" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="logo-slider-item">
          <Image src={logo4} alt="Logo" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="logo-slider-item">
          <Image src={logo5} alt="Logo" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default LogoSlider;
