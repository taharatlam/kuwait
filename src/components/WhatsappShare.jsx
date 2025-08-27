import React from 'react'
import Image from 'next/image'
import wh from '@/images/wht.svg'

const WhatsappShare = () => {
  return (
    <button className='whatsapp-share mt-4 mb-4'>
        <div className='l-part'>
            <h3>Share design on Whatsapp</h3>
            <p>Get design support to place your order</p>
        </div>
        <Image src={wh} alt='whatsapp'  />
    </button>
  )
}

export default WhatsappShare