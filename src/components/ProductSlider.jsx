"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import Prevnav from "@/images/prev-nav.svg";
import Nextnav from "@/images/next-nav.svg";

const ProductSlider = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="product-slider">
      {/* {JSON.stringify(data)} */}
      <Swiper
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          hideOnClick: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-slider-main mb-2"
      >
        <div className="swiper-button-prev">
          <Image src={Prevnav} alt="Previous" />
        </div>
        <div className="swiper-button-next">
          <Image src={Nextnav} alt="Next" />
        </div>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="product-slider-item">
              {item && (
                <Image
                  src={item}
                  alt={`Product ${index + 1}`}
                  width={500}
                  height={500}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-slider-thumbs"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="product-slider-item thumb-item">
              {item && (
                <Image
                  src={item}
                  alt={`Product ${index + 1}`}
                  width={500}
                  height={500}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
