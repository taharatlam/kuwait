import React from 'react'
import Sidebar from '@/components/sidebar'

export default function RootLayout({ children }) {
  return (
    <section className='my-acc-sec sec'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 mb-5'>
                    <h3 className='sec-head'>My Account</h3>
                </div>
                <div className='col-lg-4 col-12'>
                    <Sidebar />
                </div>
                <div className='col-lg-8 col-12'>
                    <div className='my-acc-main'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

