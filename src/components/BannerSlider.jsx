"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import banner1 from "@/images/banner1.png";
import arrowRight from "@/images/arr.svg";
import api from "@/helpers/api";
import rewImage from "@/images/rew-img.png";

const BannerSlider = () => {
  const dataSlides = [
    {
      id: 1,
      subHeading: "Shine With Purpose",
      title: "Crafted For Your Every Moment",
      desc: "Discover quality essentials, stylish accents, and smart solutions to make every space feel just right.",
      cta: {
        text: "Shop Now",
        link: "/",
      },
      image: banner1,
    },
  ];

  const [slides, setSlides] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/homebanner");
      setSlides(response.data.data);
    };
    // fetchData();
  }, []);

  return (
    <section className="banner-sec">
      <div className="container">
        <div className="banner-slider">
          {dataSlides && dataSlides.length > 0 && (
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              // pagination={{ clickable: true }}
              centeredSlides={false}
              initialSlide={2}
              loop={false}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
              }}
            >
              {dataSlides &&
                dataSlides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="banner-slide">
                      <div className="row align-items-center">
                        <div className="col-lg-6 col-12">
                          <div className="banner-content">
                            <div className="ban-con">
                              <h2
                                dangerouslySetInnerHTML={{
                                  __html: slide.subHeading,
                                }}
                                className="subtitle"
                              />
                              <h1
                                dangerouslySetInnerHTML={{
                                  __html: slide.title,
                                }}
                                className="h1"
                              />
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: slide.desc,
                                }}
                              />
                              <Link
                                href={slide.cta.link || "#"}
                                className="main-btn"
                              >
                                <span>{slide.cta.text}</span>
                              </Link>
                            </div>
                            <div className="rew-container">
                              <Image src={rewImage} alt="arrow-right" />
                              <div>
                                <h3 className="h2">125 K+</h3>
                                <p className="body2">Satisfied Customers</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1 col-12">
                          <div className="banner-img">
                            <Image
                              src={slide.image}
                              className="w-100 h-auto"
                              alt={slide.subHeading || ""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
