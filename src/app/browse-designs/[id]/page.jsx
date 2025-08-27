'use client'
import React from 'react'
import productBanner from '@/images/products-banner.png'
import Image from 'next/image'
import ProductFilters from '@/components/ProductFilters'
import ProductCard from '@/components/ProductCard'
import BrowseDesignFilters from '@/components/BrowseDesignFilters'
import upIcon from '@/images/up-icon.svg'

const page = () => {
    const data = [
        {
            title: 'Façade Signage',
            products: [
                {
                    image: null,
                    title: 'Product name',
                    price: '1 Starting at ₹ 500.'
                },
                {
                    image: null,
                    title: 'Product name',
                    price: '1 Starting at ₹ 500.'
                },
                {
                    image: null,
                    title: 'Product name',
                    price: '1 Starting at ₹ 500.'
                },
                    
            ]
        }
    ]
  return (
    <>
        <header className='inner-banner sec'>
            <div className='container'>
                <div className='row row-gap-25 align-items-center'>
                    <div className='col-lg-5 col-12'>
                        <div className='ban-con'>
                            <h1 className='ban-head'>Lorem ipsum dolor</h1>
                        </div>
                    </div>
                    <div className='col-lg-5 offset-lg-2 col-12'>
                        <Image src={productBanner} alt="contact-banner" className='w-100 h-auto' />
                    </div>
                </div>
            </div>
        </header>
        <section className='br-sec sec'>
            <div className='container'>
                <div className='row row-gap-25'>
                    <div className='col-lg-4 col-12'>
                        <BrowseDesignFilters />
                    </div>
                    <div className='col-lg-8 col-12'>
                        <div className='row row-gap-25'>
                            <div className='col-lg-6 col-12'>
                                <div className='br-up-wrap'>
                                    <Image src={upIcon} alt="up-icon" />
                                    <div>
                                        <h3>Upload Your  Own Design</h3>
                                        <p>1 Starting at ₹ 500. </p>
                                    </div>
                                </div>
                            </div>
                            {
                                data?.map((item, index) => (
                                    <div className='col-lg-6 col-12' key={index}>
                                        <ProductCard data={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
    </>
  )
}

export default page