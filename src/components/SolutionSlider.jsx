"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import img1 from "@/images/sol1.png";
import img2 from "@/images/sol2.png";
import img3 from "@/images/sol3.png";
import img4 from "@/images/sol4.png";
import nextNav from "@/images/next-icon.svg";
import prevNav from "@/images/prev-icon.svg";

const SolutionSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "KITCHEN TOOLS",
      image: img1,
    },
    {
      id: 2,
      title: "DINING",
      image: img2,
    },
    {
      id: 3,
      title: "HOME DECOR",
      image: img3,
    },
    {
      id: 4,
      title: "HOUSEHOLD TOOLS",
      image: img4,
    },
    {
      id: 5,
      title: "HOUSEHOLD TOOLS",
      image: img4,
    },
  ];

  return (
    <section className="sol-sec brown-bg sec">
      <div className="container">
        <div className="row text-center justify-content-center">
          <div className="col-lg-6 col-12">
            <h3 className="h5">Explore Our Collection</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {slides?.length > 0 && slides && (
              <>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  centeredSlides={false}
                  initialSlide={2}
                  loop={false}
                  className="sol-slider"
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    320: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 60,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 100,
                    },
                  }}
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Link href={`/`} className="sol-card">
                        {slide?.image && (
                          <Image
                            src={slide?.image}
                            width={200}
                            height={200}
                            alt=""
                          />
                        )}
                        <h3>{slide?.title}</h3>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button
                    ref={prevRef}
                    className="sol-slider-prev btn btn-link p-0"
                    aria-label="Previous"
                    type="button"
                  >
                    <Image
                      src={prevNav}
                      alt="Previous"
                      width={40}
                      height={40}
                    />
                  </button>
                  <button
                    ref={nextRef}
                    className="sol-slider-next btn btn-link p-0"
                    aria-label="Next"
                    type="button"
                  >
                    <Image src={nextNav} alt="Next" width={40} height={40} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSlider;
