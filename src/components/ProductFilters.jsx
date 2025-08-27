import React, { useState } from 'react'
import Select from 'react-select'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 10000])
  
  const materialOptions = [
    { value: 'ceramic', label: 'Ceramic' },
    { value: 'steel', label: 'Steel' },
    { value: 'plastic', label: 'Plastic' }
  ]

  const indoorOptions = [
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' }
  ]

  return (
    <div className='flt-bar'>
      <h3>Filter By</h3>

      <div className='r-part'>
        {/* <div className='filter-section'>
            <h4>Price Range</h4>
            <div className='price-inputs'>
            <RangeSlider
                min={0}
                max={10000}
                value={priceRange}
                onInput={setPriceRange}
            />
            <div className='range-values'>
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
            </div>
            </div>
        </div> */}
        <div className='filter-section'>
            {/* <h4>Material</h4> */}
            <Select
            options={materialOptions}
            placeholder="Price"
            className="filter-select"
            />
        </div>
        <div className='filter-section'>
            {/* <h4>Location</h4> */}
            <Select
            options={indoorOptions}
            placeholder="Business Type"
            className="filter-select"
            />
        </div>
        <div className='filter-section'>
            {/* <h4>Location</h4> */}
            <Select
            options={indoorOptions}
            placeholder="Signage Category"
            className="filter-select"
            />
        </div>
      </div>
      
    </div>
  )
}

export default ProductFilters