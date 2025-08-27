import React from 'react'
import arrowRight from '@/images/arr.svg'
import Image from 'next/image'
import Link from 'next/link'

const ContactForm = () => {
  return (
    <div className='con-form'>
        <h3 className='sec-head'><span>Contact Us</span></h3>
        <div className='form-group mt-4'>
            <div className='inp-grp'>
                <input type="text" placeholder='Name' />
            </div>
        </div>
        <div className='form-group'>
            <div className='inp-grp'>
                <input type="text" placeholder='Email' />
            </div>
        </div>
        <div className='form-group'>
            <div className='inp-grp'>
                <input type="text" placeholder='Contact Number' />
            </div>
        </div>
        <div className='form-group'>
            <div className='inp-grp'>
                <input type="text" placeholder='Inquiry Type' />
            </div>
        </div>
        <div className='form-group'>
            <div className='inp-grp'>
                <textarea name="" rows={3} id="" placeholder='Message'></textarea>
            </div>
        </div>
        <div className='form-group'>
            <div className='inp-grp'>
                <button className="main-btn blue" >
                    <span>Submit </span>
                    <Image src={arrowRight} alt="" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default ContactForm