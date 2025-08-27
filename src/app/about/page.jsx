import InnerBanner from '@/components/InnerBanner'
import React from 'react'
import ab1 from '@/images/ab1.png'
import Image from 'next/image'
import Link from 'next/link'

import vs from '@/images/vs.jpg'

import why1 from '@/images/icv1.svg'
import why2 from '@/images/icv2.svg'
import why3 from '@/images/icv3.svg'
import why4 from '@/images/icv4.svg'
import arrowRight from '@/images/arr.svg'
import IconCard from '@/components/IconCard'
import TeamSection from '@/components/TeamSection'
import Timeline from '@/components/Timeline'
import hotel from '@/images/hotel.png'
import writing from '@/images/writing.png'
import GallerySec from '@/components/GallerySec'

const page = () => {

  const data = [
    {
        image: why1,
        title: 'Top-Notch Quality',
        desc: 'We don’t cut corners, ever'
    },
    {
        image: why2,
        title: 'Fresh Ideas',
        desc: 'Think modern designs that will have you standing out, not blending in.'
    },
    {
        image: why3,
        title: 'You Come First',
        desc: 'We provide seamless installation, expert guidance, and dedicated after-sales support, ensuring a hassle-free experience from start to finish.'
    },
    {
        image: why4,
        title: 'Proven Track Record',
        desc: "Trusted by leading enterprises and educational institutions across India, we've collaborated with some of the most recognized and respected brands and schools."
    },
]
  return (
    <>
        <InnerBanner />
        <section className='sec why-ch-sec'>
          <div className='container'>
            <div className='row row-gap-25 align-items-center'>
              <div className='col-lg-6 col-12'>
                <Image src={ab1} />
              </div>
              <div className='col-lg-6 col-12'>
                <h3 className='sec-head '>
                  <span>Why Choose Us</span>
                </h3>
                <p className='para mt-4'>
                  At Visicom Systems LLP, we don’t just make signs. We help you craft spaces that showcase your identity,brand, and leave a lasting impression. 
                  <br /><br />
                  Whether it’s a classroom, office, or storefront, we provide tailor-made signage and display solutions that align with your brand and space. 
                  <br /><br />
                  For over 30 years, we have combined innovation, craftsmanship, and technology to create products that do more than just serve a purpose—they inspire, inform, and transform spaces. 
                  <br /><br />
                  As a trusted partner for schools, offices, and enterprises across India, we design premium custom signage and writing boards that enhance communication and efficiency.
                </p>
                <Link className="main-btn blue" href="">
                    <span>Read More</span>
                    <Image src={arrowRight} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center'>
                <h3 className='sec-head'><span>What Drives Us</span></h3>
              </div>
            </div>
          </div>
          <div className='vs-container sec'>
            <Image src={vs} alt="" />
            <div className='container'>
              <div className='row'>
                <div className='col-lg-6 col-12'>
                  <h3 className='sec-head white'>Our Vision</h3>
                  <p className='para white mt-4'>
                    We're here to deliver products that do more than just the job—they make an impact. 
                    <br /><br />
                    From consulting on the right materials and suggesting eye-catching designs to precision manufacturing and seamless installation, we handle it all. Our goal is to create signage that not only represents your brand but elevates it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center'>
                <h3 className='sec-head'><span>Why Visicom</span></h3>
                <p className='para'>We’re here to deliver products that do more than just their job. Here’s how we do it</p>
              </div>
            </div>
            <div className='row row-gap-25 mt-4'>
              {
                data?.map((item,index)=>{
                  return(
                  <div className='col-lg-3 col-12' key={index}>
                    <IconCard data={item} />
                  </div>
                  )
                })
              }
            </div>
          </div>
         
        </section>
        {/* <Timeline /> */}

        <GallerySec />

        <section className='sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center'>
                <h3 className='sec-head'><span>Our Product Categories</span></h3>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-lg-6 col-12'>
                <div className='cu-card'>
                  <div className='con'>
                    <h3>Custom Signage Solutions</h3>
                    <p className='para'>
                     From hotels to restaurants, we create signage that makes your space stand out. Plus, we’ll handle the installation—wherever you are in India.
                    </p>
                  </div>
                  <Image src={hotel} alt="" />
                </div>
              </div>
              <div className='col-lg-6 col-12'>
                <div className='cu-card'>
                  <div className='con'>
                    <h3>Custom Signage Solutions</h3>
                    <p className='para'>
                     From hotels to restaurants, we create signage that makes your space stand out. Plus, we’ll handle the installation—wherever you are in India.
                    </p>
                  </div>
                  <Image src={writing} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <TeamSection />
    </>
  )
}

export default page