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

const MainProductInner = ({ data, productSlug }) => {
  const [selectedCorner, setSelectedCorner] = useState(null);
  const [quantity, setQuantity] = useState({ value: 10, label: "10" });
  const [selectedVariation, setSelectedVariation] = useState(null);
  const router = useRouter();

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

  const handleVariationChange = (selectedOption) => {
    setSelectedVariation(selectedOption);
  };

  const handleQuantityChange = (selectedOption) => {
    setQuantity(selectedOption);
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

  return (
    <div className="pr-inner-page sec">
      <div className="container">
        <div className="row ">
          <div className="col-lg-5 col-12">
            <ProductSlider data={data?.extra_images} />
          </div>
          <div className="col-lg-7 col-12">
            <div className="pr-inner-right">
              <h3 className="sec-head">{data?.name}</h3>
              {/* <p className="para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <ul className="pr-list">
                <li>4000+ design options available</li>
                <li>Free delivery on all orders</li>
                <li>Secure payment</li>
              </ul> */}
              {data?.shortDescription && (
                <div
                  className="para html-content"
                  dangerouslySetInnerHTML={{ __html: data?.shortDescription }}
                ></div>
              )}
              <div className="pr-corners mt-4">
                {/* <div className="corner-select mb-4">
                  <label className="mb-2 label-text">
                    Select Corner Style:
                  </label>
                  <Select
                    value={selectedCorner}
                    onChange={handleCornerChange}
                    options={cornerOptions}
                    placeholder="Choose corner style..."
                  />
                </div> */}
                <div className="quantity-selector">
                  <label className="mb-2 label-text">Quantity:</label>
                  <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    options={quantityOptions}
                    placeholder="Select quantity..."
                  />
                </div>
                <VariationSelect
                  data={data}
                  setSelectedVariation={setSelectedVariation}
                />
                {/* <div className="variation-selector mb-4 mt-4">
                  <label className="mb-2 label-text">Select Variation:</label>
                  <div
                    className="variation-blocks"
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                  >
                    {data?.Pricing && data.Pricing.length > 0 ? (
                      data.Pricing.map((item) => {
                        const isSelected =
                          selectedVariation &&
                          selectedVariation?.value?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`variation-block${
                              isSelected ? " selected" : ""
                            }`}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flex: "1 1 auto",
                              minWidth: "150px",
                              padding: "16px",
                              border: isSelected
                                ? "1px solid #178a5a"
                                : "1px solid #ccc",
                              borderRadius: "8px",
                              background: isSelected
                                ? "rgb(250, 255, 253)"
                                : "#fff",
                              fontWeight: isSelected ? 700 : 400,
                              color: "#222",
                              cursor: "pointer",
                              transition: "border 0.2s, background 0.2s",
                            }}
                            onClick={() =>
                              handleVariationChange({
                                target: { value: item.id },
                                value: item,
                              })
                            }
                          >
                            <p
                              style={{
                                fontSize: "1rem",
                                marginBottom: "0px",
                                fontWeight: 500,
                                color: "#222",
                              }}
                            >
                              {item.size}
                            </p>
                            <div
                              style={{
                                fontSize: "1.1rem",
                                color: "#178a5a",
                                fontWeight: 700,
                              }}
                            >
                              ₹
                              {parseFloat(item.saleprice).toLocaleString(
                                "en-IN"
                              )}
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div>No variations available</div>
                    )}
                  </div>
                </div> */}

                <PrInnerBtm
                  data={data}
                  quantity={quantity}
                  selectedVariation={selectedVariation}
                  handleAddToCart={handleAddToCart}
                />
                {/* <button
                  className="main-btn blue wide w-100"
                  onClick={handleAddToCart}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ verticalAlign: "middle" }}
                    >
                      <path d="M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-8-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm8 1a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM3.22 4.22A1 1 0 0 1 4 4h1.22l.94 2H17a1 1 0 0 1 .96 1.27l-1.5 6A2 2 0 0 1 14.54 15H7a1 1 0 1 1 0-2h7.54a1 1 0 0 0 .98-.8l1.2-4.8H6.16l-.94-2H4a1 1 0 0 1-.78-1.62z" />
                    </svg>
                  </span>{" "}
                  <span>Add to Cart</span>
                </button> */}
                <WhatsappShare />
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
