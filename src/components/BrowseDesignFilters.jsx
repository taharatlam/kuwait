import React, { useState } from 'react'
import searchIcon from '@/images/search-icon.svg'
import Image from 'next/image'
import { Collapse, Form } from 'react-bootstrap'
import downIcon from '@/images/dr.svg'

const BrowseDesignFilters = () => {
  const [openColor, setOpenColor] = useState(true)
  const [openIndustry, setOpenIndustry] = useState(false)
  const [openOrientation, setOpenOrientation] = useState(false)
  const [showAllIndustries, setShowAllIndustries] = useState(false)

  const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Black', hex: '#000000' }
  ]

  const industries = [
    'Healthcare', 'Education', 'Retail', 'Technology', 'Manufacturing',
    'Food & Beverage', 'Automotive', 'Construction', 'Entertainment',
    'Financial Services', 'Hospitality', 'Real Estate', 'Transportation'
  ]

  const displayedIndustries = showAllIndustries ? industries : industries.slice(0, 5)
  const orientations = ['Horizontal', 'Vertical', 'Square']

  return (
    <div className='br-flt-area'>
        <div className='search-ar'>
            <input placeholder='Explore Your Designs' />
            <Image src={searchIcon} alt="search-icon" />
        </div>
        
        <div className="filter-section">
            <h3 className='br-flt-title'>Filter By</h3>

            <div className="mb-4 br-flt-sec">
                <h5 
                    onClick={() => setOpenColor(!openColor)}
                    style={{cursor: 'pointer'}}
                >
                    <span>
                        Design Color
                    </span>
                    <Image src={downIcon} className={`${openColor ? 'rotate-180' : ''}`} alt="down-icon" />
                </h5>
                <Collapse in={openColor}>
                    <div >
                        <Form>
                            {colors.map((color, idx) => (
                                <Form.Check
                                    key={idx}
                                    type="radio"
                                    name="designColor"
                                    label={
                                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: color.hex,
                                                borderRadius: '50%',
                                                border: '1px solid #ddd'
                                            }}/>
                                            {color.name}
                                        </div>
                                    }
                                    id={`color-${idx}`}
                                />
                            ))}
                        </Form>
                    </div>
                </Collapse>
            </div>

            <div className="mb-4 br-flt-sec" >
                <h5
                    onClick={() => setOpenIndustry(!openIndustry)}
                    style={{cursor: 'pointer'}}
                >
                    
                    <span>
                        Industry
                    </span>
                    <Image src={downIcon} className={`${openIndustry ? 'rotate-180' : ''}`} alt="down-icon" />
                </h5>
                <Collapse in={openIndustry}>
                    <div >
                        <Form>
                            {displayedIndustries.map((industry, idx) => (
                                <Form.Check
                                    key={idx}
                                    type="radio"
                                    name="industry" 
                                    label={industry}
                                    id={`industry-${idx}`}
                                />
                            ))}
                            {!showAllIndustries && industries.length > 5 && (
                                <button
                                    onClick={() => setShowAllIndustries(true)}
                                    className="btn btn-link ps-0 pt-2"
                                    style={{textDecoration: 'none'}}
                                >
                                    Show More ({industries.length - 5} more)
                                </button>
                            )}
                        </Form>
                    </div>
                </Collapse>
            </div>

            <div className="mb-4 br-flt-sec">
                <h5
                    onClick={() => setOpenOrientation(!openOrientation)}
                    style={{cursor: 'pointer'}}
                >
                   <span>
                        Product Orientation
                    </span>
                    <Image src={downIcon} className={`${openOrientation ? 'rotate-180' : ''}`} alt="down-icon" />
                </h5>
                <Collapse in={openOrientation}>
                    <div >
                        <Form>
                            {orientations.map((orientation, idx) => (
                                <Form.Check
                                    key={idx}
                                    type="checkbox"
                                    label={orientation}
                                    id={`orientation-${idx}`}
                                />
                            ))}
                        </Form>
                    </div>
                </Collapse>
            </div>
        </div>
    </div>
  )
}

export default BrowseDesignFilters