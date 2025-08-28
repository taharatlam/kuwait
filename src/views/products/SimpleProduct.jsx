"use client";
import React, { useState, useEffect } from "react";
import ProductSlider from "@/components/ProductSlider";
import Select from "react-select";
import WhatsappShare from "@/components/WhatsappShare";
import PrInnerBtm from "@/components/PrInnerBtm";
import PrTabSec from "@/components/PrTabSec";
import Cookies from "js-cookie";
import api from "@/helpers/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import VariationSelect from "./variationSelect";
import product1 from "@/images/product1.png";
import Breadcrumb from "@/components/Breadcrumb";
import StarRatingViewOnly from "@/components/StarRatingViewOnly";
import Counter from "@/components/Counter";
import ShareSocial from "@/components/ShareSocial";
import fastIcon from "@/images/fast.svg";
import customerCareIcon from "@/images/customer-care.svg";
import Image from "next/image";
import CustomerReviews from "@/components/CustomerReviews";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";

const MainProductInner = ({ data, productSlug }) => {
  const [selectedSize, setSelectedSize] = useState({
    value: 1,
    label: "25cm x 15cm x 5cm",
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const router = useRouter();

  const renderIcon = (icon) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.304 4.75c-2.652 0-4.554 2.526-4.554 5.005 0 2.59 1.624 4.965 3.587 6.742.97.878 1.99 1.58 2.867 2.06.438.24.83.418 1.154.535.338.123.55.158.642.158.093 0 .304-.035.642-.158a8.482 8.482 0 0 0 1.154-.535 15.411 15.411 0 0 0 2.867-2.06c1.963-1.777 3.587-4.152 3.587-6.742 0-2.479-1.902-5.005-4.554-5.005-1.534 0-2.534.756-3.126 1.448a.75.75 0 0 1-1.14 0c-.592-.692-1.592-1.448-3.126-1.448ZM2.25 9.755c0-3.071 2.356-6.505 6.054-6.505 1.66 0 2.873.66 3.696 1.392a5.445 5.445 0 0 1 3.696-1.392c3.698 0 6.054 3.434 6.054 6.505 0 3.21-1.987 5.959-4.08 7.854a16.914 16.914 0 0 1-3.154 2.264 9.958 9.958 0 0 1-1.364.63c-.397.143-.8.247-1.152.247-.352 0-.755-.104-1.152-.247a9.962 9.962 0 0 1-1.364-.63 16.913 16.913 0 0 1-3.154-2.264c-2.093-1.895-4.08-4.643-4.08-7.854Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const sizeOptions = [
    { value: 1, label: "25cm x 15cm x 5cm" },
    { value: 2, label: "25cm x 15cm x 5cm" },
    { value: 3, label: "25cm x 15cm x 5cm" },
    { value: 4, label: "25cm x 15cm x 5cm" },
    { value: 5, label: "25cm x 15cm x 5cm" },
  ];

  const handleCornerChange = (selectedOption) => {
    setSelectedCorner(selectedOption);
  };

  const handleVariationChange = (selectedOption) => {
    setSelectedVariation(selectedOption);
  };

  const handleQuantityChange = (selectedOption) => {
    setQuantity(selectedOption);
  };

  const handleSizeChange = (selectedOption) => {
    setSelectedSize(selectedOption);
  };

  const handleAddToCart = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login?from=products/" + productSlug);
      return;
    }
    if (!data || !data.id || !data.Pricing || data.Pricing.length === 0) {
      alert("Product data is incomplete.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", data.id);
    formData.append("pricingId", selectedVariation?.value?.id);
    formData.append("quantity", quantity.value);
    formData.append("isCustom", false);
    formData.append("customization", "");
    formData.append("addonIds", JSON.stringify([]));

    console.log("order data", formData);

    // return;

    try {
      const response = await api.post("/cart/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error("Failed to add to cart");
      }

      toast.success(response.data.message);

      // Optionally, update cart state or redirect user here
    } catch (error) {
      alert("Error adding to cart: " + error.message);
    }
  };

  const breadcrumbData = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Products",
      url: "/products",
    },
  ];

  const productImages = [product1, product1, product1, product1];

  return (
    <div className="pr-inner-page pt-3">
      <div className="container">
        <Breadcrumb data={breadcrumbData} />
        <div className="row ">
          <div className="col-lg-5 col-12">
            <ProductSlider data={productImages} />
          </div>
          <div className="col-lg-7 col-12">
            <div className="pr-inner-right">
              <StarRatingViewOnly rating={4.5} reviews={832} />
              <p className="body-2 mb-0">Bathroom Essentials</p>
              <h3 className="h2 text-uppercase">Bathroom Essentials</h3>
              <div className="separator"></div>
              <h5 className="h6">KWD59</h5>
              <p className="body-2">
                Transform your daily routine into a refreshing experience with
                our premium bathroom essentials. From plush towels and stylish
                storage solutions to functional accessories and smart
                organizers, each piece is thoughtfully designed to combine
                comfort, elegance, and durability. Whether you’re creating a
                spa-like retreat or simply elevating everyday moments, our
                collection ensures your bathroom is as beautiful as it is
                practical.
              </p>
              <div className="pr-corners mt-4">
                <div className="quantity-selector">
                  <label className="mb-2 body-1">Select Size:</label>
                  <Select
                    value={selectedSize}
                    onChange={handleSizeChange}
                    options={sizeOptions}
                    placeholder="Select size..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "1px solid #1d1d1d",
                        borderRadius: "100px",
                        padding: "8px 15px",
                        cursor: "pointer",

                        "&:hover": {
                          borderColor: "#1d1d1d",
                          boxShadow: "none",
                        },

                        "&:focus": {
                          borderColor: "#1d1d1d",
                          boxShadow: "none",
                        },

                        "&:active": {
                          borderColor: "#1d1d1d",
                          boxShadow: "none",
                        },
                      }),
                    }}
                  />
                </div>

                <div className="qnty-wrapper mt-4">
                  <p className="body-1 mb-0">Amount:</p>
                  <div className="d-flex align-items-center gap-2">
                    <Counter
                      value={quantity}
                      onChange={handleQuantityChange}
                      min={1}
                      max={10}
                    />
                    <button className="main-btn">
                      <span>Add to cart</span>
                    </button>
                    <button className="cus-like-btn">{renderIcon(1)}</button>
                  </div>
                </div>

                <ShareSocial />

                {/* <WhatsappShare /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="separator mt-5 mb-5"></div>
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2 className="h6 text-uppercase">Description</h2>
            <p className="body-2">
              Transform your daily routine into a refreshing experience with our
              premium bathroom essentials. From plush towels and stylish storage
              solutions to functional accessories and smart organizers, each
              piece is thoughtfully designed to combine comfort, elegance, and
              durability. Whether you’re creating a spa-like retreat or simply
              elevating everyday moments, our collection ensures your bathroom
              is as beautiful as it is practical.
            </p>
            <div className="row row-gap-25">
              <div className="col-lg-6 col-12">
                <div className="stat-card d-flex align-items-center gap-2">
                  <div className="stat-card-icon">
                    <Image src={fastIcon} alt="product" />
                  </div>
                  <div>
                    <h3
                      className=" color-soft-mocha"
                      style={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Fast & Reliable
                    </h3>
                    <p className="body-2">
                      Quick delivery with easy returns policy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="stat-card d-flex align-items-center gap-2">
                  <div className="stat-card-icon">
                    <Image src={customerCareIcon} alt="product" />
                  </div>
                  <div>
                    <h3
                      className="color-soft-mocha"
                      style={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Customer Support
                    </h3>
                    <p className="body-2">
                      24/7 assistance to help with any order or product queries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 col-12">
            <h3 className="h6 text-uppercase">Customer Reviews</h3>
            <CustomerReviews />
          </div>
        </div>
      </div>
      <YouMayAlsoLike />
    </div>
  );
};

export default MainProductInner;
