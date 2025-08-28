import React, { useRef } from "react";
import arrowLeft from "@/images/ar-left.svg";
import arrowRight from "@/images/ar-right.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import product1 from "@/images/product1.png";
import ProductCard from "./ProductCard";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Product One",
    image: product1,
    price: "$29.99",
  },
  {
    id: 2,
    name: "Product Two",
    image: product1,
    price: "$39.99",
  },
  {
    id: 3,
    name: "Product Three",
    image: product1,
    price: "$49.99",
  },
  {
    id: 4,
    name: "Product Four",
    image: product1,
    price: "$59.99",
  },
  {
    id: 5,
    name: "Product Five",
    image: product1,
    price: "$69.99",
  },
];

const YouMayAlsoLike = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="sec you-may-like-sec">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex mb-5 justify-content-between align-items-center">
              <h3 className="h4">You may also like</h3>
              <div className="like-navs d-flex align-items-center gap-2">
                <button className="like-nav-btn" ref={prevRef}>
                  <Image src={arrowLeft} alt="arrow-left" />
                </button>
                <button className="like-nav-btn" ref={nextRef}>
                  <Image src={arrowRight} alt="arrow-right" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Swiper
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1200: { slidesPerView: 3 },
              }}
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                // Swiper v8+ navigation fix for React refs
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
