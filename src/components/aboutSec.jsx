import React from "react";
import Image from "next/image";
import aboutImg from "@/images/img20.png";
import Link from "next/link";

const aboutSec = () => {
  return (
    <section className="about-sec sec ">
      <div className="container">
        <div className="row align-items-center row-gap-25">
          <div className="col-lg-5 col-12">
            <Image src={aboutImg} className="w-100 h-auto" alt="about-img" />
          </div>
          <div className="col-lg-6 offset-lg-1 col-12">
            <h2 className="subtitle text-uppercase color-accent">About Us</h2>
            <h3 className="h2 text-uppercase">Making Every Home a Haven</h3>
            <p className="body-2">
              From the kitchen to the bathroom, we bring you thoughtfully
              designed products that combine style, quality, and functionality
              to elevate your everyday living.
            </p>
            <Link href="#" className="main-btn mt-4">
              <span>Learn More About Us</span>
            </Link>
            <div className="row mt-4 pt-4 ab-count-container">
              <div className="col-lg-6 col-12">
                <div className="about-count">
                  <h3 className="h2">100+</h3>
                  <p className="quote text-uppercase color-accent">
                    Luxury Items
                  </p>
                  <p className="body-2">
                    Indulge in the finest craftsmanship and timeless elegance,
                    with every detail thoughtfully designed to bring
                    sophistication, comfort, and exclusivity to your home.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="about-count">
                  <h3 className="h2">5000+</h3>
                  <p className="quote text-uppercase color-accent">
                    Orders Shipped
                  </p>
                  <p className="body-2">
                    Indulge in the finest craftsmanship and timeless elegance,
                    with every detail thoughtfully designed to bring
                    sophistication, comfort, and exclusivity to your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default aboutSec;
