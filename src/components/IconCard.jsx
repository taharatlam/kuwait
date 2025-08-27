import React from 'react'
import Image from 'next/image'

const IconCard = ({data}) => {
  return (
    <div className='why-card'>
        {
            data?.image &&
            <Image src={data?.image} alt="" />
        }
        <div>
          <h3>{data?.title}</h3>
          <p>{data?.desc}</p>
        </div>
    </div>
  )
}

export default IconCard