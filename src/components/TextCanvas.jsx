'use client'
import React, { useState, useEffect, useRef } from 'react'
// import Image from 'next/image'
import Image1 from '@/images/sofa.jpg'
const TextCanvas = ({ color, fontFamily, text }) => {
  const canvasRef = useRef(null);
  
  const [bgImage, setBgImage] = useState('/images/sofa.jpg'); // Default background image path

 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Clear canvas
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Set text properties
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw neon glow effect
      ctx.font = `bold 36px ${fontFamily}`;
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
      ctx.fillStyle = 'white';

      ctx.fillText(text, canvas.width / 2, canvas.height / 3);
      
      // Draw main text
      ctx.shadowBlur = 10;
      ctx.fillStyle = color;
      ctx.fillText(text, canvas.width / 2, canvas.height / 3);
    };
    
    img.src = bgImage;
  }, [text, fontFamily, color, bgImage]);

  // Update state when props change


  const handleTextChange = (e) => {
    if(e.target.value === ''){
      setText('Your Text Here')
    }else{
      setText(e.target.value);
    }
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className='text-canvas'>
        <div className='text-canvas-inner'>
            <div className='text-canvas-inner-left'>
                <div className='text-canvas-inner-left-top'>
                    <canvas 
                      ref={canvasRef} 
                      width={500} 
                      height={500} 
                      style={{ border: '1px solid #ccc' }}
                    />
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default TextCanvas