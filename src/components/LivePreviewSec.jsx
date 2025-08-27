import React from 'react'
import Image from 'next/image'
import live from '@/images/live.png'
import arrowRight from '@/images/arr.svg'
import Link from 'next/link'

const LivePreviewSec = () => {
  return (
    <section className='sec live-sec'>
        <div className='container'>
            <div className='row row-gap-25'>
                <div className='col-lg-6 col-12'>
                    <Image src={live} alt="" className="w-100 h-auto"  />
                </div>
                <div className='col-lg-6 col-12'>
                    <div className='live-wrap'>
                        <h3 className='sec-head'>Live Preview</h3>
                        <p className='para'>
                        We focus on crafting high-quality signs beyond just displays—they represent your brand and create impactful first impressions.
                        </p>
                        <Link href="" className="main-btn blue" >
                            <span>Get Started</span>
                            <Image src={arrowRight} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LivePreviewSec