"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import FsLightbox from 'fslightbox-react'


const GallerySec = () => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  const images = [
    '/gallery/img1.jpg',
    '/gallery/img2.jpg', 
    '/gallery/img3.jpg',
    '/gallery/img4.jpg',
    '/gallery/img5.jpg',
    '/gallery/img6.jpg'
  ];

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number
    });
  }

  return (
    <section className='bg-pale gallery-sec sec'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='sec-head text-center'>
              <span>Our Gallery</span>
            </h3>
          </div>
        </div>
        <div className='row mt-4 g-4'>
          {images.map((image, index) => (
            <div className='col-lg-4 col-md-6 col-12' key={index}>
              <div className='gallery-item' onClick={() => openLightboxOnSlide(index + 1)}>
                <Image 
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={300}
                  style={{width: '100%', height: 'auto'}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images}
        slide={lightboxController.slide}
      />
    </section>
  )
}

export default GallerySec