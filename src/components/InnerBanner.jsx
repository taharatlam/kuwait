import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import banner from '@/images/about.png'

const InnerBanner = () => {
  return (
    <header className='inner-banner'>
        <div className=''>
            <div className='row align-items-center'>
                <div className='col-lg-5 col-12'>
                    <div className='container-left'>
                        <div className='ban-con'>
                            <h1 className='ban-head'>
                            Meet <span>Visicom</span>
                            </h1>
                            <p>
                            Your Go-To Partner for Bespoke Signages and Writing Solutions
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-7 col-12'>
                    <Image src={banner} className='w-100 h-auto' alt="" />
                </div>
            </div>
        </div>
    </header>
  )
}

export default InnerBanner