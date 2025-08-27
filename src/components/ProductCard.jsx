import React from "react";
import ProductCardImagesSlider from "./ProductCardImagesSlider";
import product1 from "@/images/product1.png";

const ProductCard = () => {
  const images = [product1, product1, product1, product1, product1];
  return (
    <div className="product-card-main">
      <div className="product-card-images">
        <ProductCardImagesSlider images={images} />
      </div>
      <div className="product-card-content py-3 px-3">
        <h3 className="h6 text-uppercase mb-0">Household Tools</h3>
        <p className="body2">
          Everything You Need for a Fresh, Organized Space
        </p>
        <div className="d-flex align-items-center gap-2 justify-content-between product-card-bottom">
          <span className="h6 color-accent">KWD59.99</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
