"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Dummy images (replace with your own image imports or URLs)
const categories = [
  {
    title: "KITCHEN TOOLS",
    img: "/images/cat-kitchen.jpg", // Replace with your actual image path
  },
  {
    title: "DINING",
    img: "/images/cat-dining.jpg",
  },
  {
    title: "HOME DECOR",
    img: "/images/cat-decor.jpg",
  },
  {
    title: "HOUSEHOLD TOOLS",
    img: "/images/cat-household.jpg",
  },
];

const CatSlider = () => {
  return (
    <section className="py-5 cat-slider-bg">
      <div className="container">
        <h3 className="text-center mb-4 cat-slider-title">
          EXPLORE OUR COLLECTION
        </h3>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            nextEl: ".cat-slider-next",
            prevEl: ".cat-slider-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
          className="mb-3"
        >
          {categories.map((cat, idx) => (
            <SwiperSlide key={idx}>
              <div className="d-flex flex-column align-items-center">
                <div className="mb-2 cat-slider-img-wrap">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="cat-slider-img"
                  />
                </div>
                <div className="text-center cat-slider-label">{cat.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="cat-slider-prev btn btn-link p-0 cat-slider-arrow"
            aria-label="Previous"
          >
            <span className="cat-slider-arrow-icon">&larr;</span>
          </button>
          <button
            className="cat-slider-next btn btn-link p-0 cat-slider-arrow"
            aria-label="Next"
          >
            <span className="cat-slider-arrow-icon">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CatSlider;
