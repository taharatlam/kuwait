'use client'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import banner1 from '@/images/banner1.jpg'
import arrowRight from '@/images/arr.svg'
import logo1 from '@/images/logo1.svg'

import test1 from '@/images/test1.png'
import stars from '@/images/stars.svg'

const TestSlider = () => {
  const slides = [
    {
      id: 1,
      title: 'Awesome quality!',
      desc: 'Awesome in every sense, weather it’s customise or anything. Visicom Rocks! read more ',
      cta: {
        text: 'Browse Our Products',
        link: '/products'
      },
      name: 'Surbhi singh',
      date: '5 mo ago',
      image: test1
    },
    {
      id: 1,
      title: 'Awesome quality!',
      desc: 'Awesome in every sense, weather it’s customise or anything. Visicom Rocks! read more ',
      cta: {
        text: 'Browse Our Products',
        link: '/products'
      },
      name: 'Surbhi singh',
      date: '5 mo ago',
      image: test1
    },
   
  
  ]

  return (
    <section className='test-sec pale-bg sec'>
        <div className="container">
            <div className='row'>
                <div className='col-12 text-center'>
                    <h3 className='sec-head'>What Our <span>Clients Are Saying</span></h3>
                </div>
                <div className='col-12'>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        // pagination={{ clickable: true }}
                        // centeredSlides={true}
                        // initialSlide={2}
                        // loop={false}c
                        className='test-slider'
                        breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        }
                        }}
                    >
                        {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                        <div className='test-card'>
                                <div className='test-top'>
                                    <div className='prof'>
                                        {
                                            slide?.image &&
                                            <Image src={slide?.image} alt="" />
                                        }
                                    </div>
                                    <div>
                                        <h3>{slide?.name}</h3>
                                        <p>{slide?.date}</p>
                                    </div>
                                </div>
                                <div className='test-body'>
                                    <h3>{slide?.title}</h3>
                                    <p className='para'>
                                        {slide?.desc}
                                    </p>
                                    <Image src={stars} alt="" /><br />
                                    <Image src={logo1} className='mt-4' alt="" />
                                </div>
                        </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TestSlider