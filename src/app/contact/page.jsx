import React from 'react'
import Image from 'next/image'
import contactBanner from '@/images/contact-banner.png'
import ContactForm from '@/components/ContactForm'
import IconCard from '@/components/IconCard'
import loc from '@/images/loc.svg'

const page = () => {

    const data= [
        {
            image: loc,
            title: 'Ask Us Anything!',
            desc: 'Because we believe communication should be as seamless as our solutions!'
        },
        {
            image: loc,
            title: ' Visit Us',
            desc: '6 Rani Jhansi Road, New Delhi Central Sadar Bazaar, New Delhi – 110055, Delhi, India'
        },
        {
            image: loc,
            title: 'Call Us',
            desc: '+91 9313043144'
        }
    ]
  return (
    <>
        <header className='inner-banner sec'>
            <div className='container'>
                <div className='row row-gap-25 align-items-center'>
                    <div className='col-lg-5 col-12'>
                        <div className='ban-con'>
                            <h1 className='ban-head'>Let’s Connect!</h1>
                            <p className='para'>
                                At Visicom Systems, we’re always here to help! Whether you have a question, need guidance or just want to chat about writing boards and signages , we’d love to hear from you.
                            </p>
                        </div>
                    </div>
                    <div className='col-lg-5 offset-lg-2 col-12'>
                        <Image src={contactBanner} alt="contact-banner" className='w-100 h-auto' />
                    </div>
                </div>
            </div>
        </header>
        <section className='sec con-sec'>
            <div className='container'>
                <div className='row row-gap-25'>
                    <div className='col-lg-7 col-12'>
                        <ContactForm />
                    </div>
                    <div className='col-lg-5 col-12'>
                        <div className='con-li'>
                            {
                                data.map((item, index)=>(
                                    <IconCard key={index} data={item} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='sec faq-sec pale-bg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h3 className='sec-head'>
                            <span>You Ask, We Answer</span>
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default page