import React from 'react'
import Image from 'next/image'

const TeamSection = () => {
  return (
    <section className='team-sec sec'>
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h3 className="sec-head">
                        <span>The Team That Makes It Happen</span>
                    </h3>
                </div>
            </div>
            <div className="row row-gap-25">
                <div className="col-12">
                    <h4 className=''>Leadership</h4>
                </div>
                <div className="col-lg-3 col-12">
                    <div className="team-card">
                        {/* <Image /> */}
                        <div className="team-det">
                            <h3>Ravikumar Sharma</h3>
                            <p className="para">Chief Executive Officer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TeamSection