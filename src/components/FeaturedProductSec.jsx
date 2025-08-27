import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

const FeaturedProductSec = () => {
  return (
    <section className="ft-pr-sec sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="subtitle text-uppercase color-accent">
              Elevate Your home
            </h2>
            <h3 className="h2 text-uppercase">Featured Products</h3>
            <p className="para">
              Reliable and practical equipment to make home maintenance easy.
            </p>
          </div>
        </div>
        <div className="row row-gap-25 mt-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="col-lg-4 col-12" key={index}>
              <ProductCard />
            </div>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <Link href="#" className="main-btn center">
              <span>Explore More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSec;
