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


const Timeline = () => {

    const slides = [
        {
          id: 1,
          title: 'The <br />Face of<br/> Every Space ',
          desc: 'From lobbies to big buildings, we craft signage that leaves a lasting impression—because your brand deserves nothing less. ',
          cta: {
            text: 'Browse Our Products',
            link: '/products'
          },
          image: banner1
        },
        {
          id: 1,
          title: 'The <br />Face of<br/> Every Space ',
          desc: 'From lobbies to big buildings, we craft signage that leaves a lasting impression—because your brand deserves nothing less. ',
          cta: {
            text: 'Browse Our Products',
            link: '/products'
          },
          image: banner1
        },
        {
          id: 1,
          title: 'The <br />Face of<br/> Every Space ',
          desc: 'From lobbies to big buildings, we craft signage that leaves a lasting impression—because your brand deserves nothing less. ',
          cta: {
            text: 'Browse Our Products',
            link: '/products'
          },
          image: banner1
        },
        {
          id: 1,
          title: 'The <br />Face of<br/> Every Space ',
          desc: 'From lobbies to big buildings, we craft signage that leaves a lasting impression—because your brand deserves nothing less. ',
          cta: {
            text: 'Browse Our Products',
            link: '/products'
          },
          image: banner1
        },
      
    ]

  return (
    <section className='sec timeline-sec pale-bg'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 text-center'>
                    <h3 className='sec-head'>Discover Our Story</h3>
                </div>
            </div>
        </div>
        <div className='container-left'>
            <div className='timeline-con'>
                <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        // navigation
                        // pagination={{ clickable: true }}
                        centeredSlides={true}
                        initialSlide={2}
                        loop={false}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 25
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            }
                        }}
                    >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className='timeline-card'>
                                <h3>2022</h3>
                                <p>
                                    We introduced Nova, our range of writing boards and signage that raised the bar.
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </section>
  )
}

export default Timeline