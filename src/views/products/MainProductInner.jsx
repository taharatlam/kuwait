"use client";
import React, { useState } from "react";
import ProductSlider from "@/components/ProductSlider";
import Select from "react-select";
import WhatsappShare from "@/components/WhatsappShare";
import PrInnerBtm from "@/components/PrInnerBtm";
import PrTabSec from "@/components/PrTabSec";
const MainProductInner = ({ data }) => {
  const [selectedCorner, setSelectedCorner] = useState(null);
  const [quantity, setQuantity] = useState({ value: 10, label: "10" });

  const cornerOptions = [
    { value: "rounded", label: "Rounded" },
    { value: "square", label: "Square" },
    { value: "pointed", label: "Pointed" },
  ];

  const quantityOptions = [
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
    { value: 30, label: "30" },
  ];

  const handleCornerChange = (selectedOption) => {
    setSelectedCorner(selectedOption);
  };

  const handleQuantityChange = (selectedOption) => {
    setQuantity(selectedOption);
  };

  return (
    <div className="pr-inner-page sec">
      <div className="container">
        <div className="row ">
          <div className="col-lg-5 col-12">
            <ProductSlider />
          </div>
          <div className="col-lg-7 col-12">
            <div className="pr-inner-right">
              <h3 className="sec-head">{data?.name}</h3>
              <p className="para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <ul className="pr-list">
                <li>4000+ design options available</li>
                <li>Free delivery on all orders</li>
                <li>Secure payment</li>
              </ul>
              <div className="pr-corners mt-4">
                <div className="corner-select mb-4">
                  <label className="mb-2 label-text">
                    Select Corner Style:
                  </label>
                  <Select
                    value={selectedCorner}
                    onChange={handleCornerChange}
                    options={cornerOptions}
                    placeholder="Choose corner style..."
                  />
                </div>
                <div className="quantity-selector">
                  <label className="mb-2 label-text">Quantity:</label>
                  <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    options={quantityOptions}
                    placeholder="Select quantity..."
                  />
                </div>
                {data?.Pricing && data.Pricing.length > 0 && (
                  <div className="product-pricing mt-4 mb-3">
                    <div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "1.5rem",
                          color: "#000",
                          display: "block",
                        }}
                      >
                        ₹
                        {parseFloat(data.Pricing[0].saleprice).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                      <span
                        style={{
                          color: "#888",
                          fontSize: "0.85rem",
                          display: "block",
                          marginTop: "0px",
                        }}
                      >
                        ₹
                        {(
                          parseFloat(data.Pricing[0].saleprice) / quantity.value
                        ).toLocaleString("en-IN")}{" "}
                        each / {quantity.value} units
                      </span>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      <span
                        style={{
                          color: "#178a5a",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          textDecoration: "none",
                        }}
                      >
                        Free shipping by{" "}
                        <span style={{ fontWeight: 700 }}>23 July</span> to
                        110001
                      </span>
                    </div>
                  </div>
                )}
                <WhatsappShare />
                <PrInnerBtm />
              </div>
            </div>
          </div>
        </div>
        <PrTabSec data={data} />
      </div>
    </div>
  );
};

export default MainProductInner;
