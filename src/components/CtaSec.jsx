import React from "react";
import cta from "@/images/cta-bg.png";
import Image from "next/image";
import Link from "next/link";

const CtaSec = () => {
  return (
    <section className="cta-sec sec">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cta-container">
              <Image src={cta} className="w-100 h-auto" alt="" />
              <div className="row row-gap-25 align-items-center justify-content-center">
                <div className="col-lg-7 col-12">
                  <div className="cta-con text-center">
                    <h3 className="subtitle color-white text-uppercase">
                      Elevate Your home
                    </h3>
                    <h2 className="h2 color-white text-uppercase">
                      Everything Your Home Deserves
                    </h2>
                    <p className="body-2 color-white">
                      From everyday essentials to timeless accents, discover
                      premium products that bring comfort, style, and
                      functionality to every corner of your home.
                    </p>
                    <div className="d-flex justify-content-center mt-2 flex-wrap gap-2 align-items-center">
                      <Link href="" className="main-btn ">
                        <span>Shop Now</span>
                      </Link>
                      <Link href="" className="main-btn ">
                        <span>Explore Our Category</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSec;
