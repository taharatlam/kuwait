import React from 'react'
import IconCard from './IconCard'

import why1 from '@/images/why1.svg'
import why2 from '@/images/why2.svg'
import why3 from '@/images/why3.svg'
import arrowRight from '@/images/arr.svg'
import Link from 'next/link'
import Image from 'next/image'

const WhyChooseSec = () => {

    const data = [
        {
            image: why1,
            title: 'See Your Sign Before Buying',
            desc: 'Get a clear preview of your custom sign before it goes into production.'
        },
        {
            image: why2,
            title: 'Delivered to Your Doorstep',
            desc: 'Hassle-free delivery ensures your sign reaches you ready to shine.'
        },
        {
            image: why3,
            title: 'High Quality',
            desc: 'Crafted with precision and premium materials for lasting impact.'
        },
    ]

  return (
    <section className='sec why-sec'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 text-center'>
                    <h3 className='sec-head'>
                        <span>The Signage Partner You Can Trust</span>
                    </h3>
                </div>
            </div>
            <div className='row-gap-25 row mt-5'>
            {
                data?.map((item,index)=>{
                    return(
                        <div className='col-lg-4 col-12' key={index}>
                            <IconCard data={item} />
                        </div>
                    )
                })
            }
            </div>
            <div className='row justify-content-center mt-5'>
                <div className='text-center col-lg-6 col-12'>
                    <p className='para'>
                    We focus on crafting high-quality signs beyond just displays—they represent your brand and create impactful first impressions.
                    </p>
                    <Link className="main-btn blue center" href="">
                        <span>Read More</span>
                        <Image src={arrowRight} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WhyChooseSec