"use client";
import React, { useState, useEffect, useMemo, useContext } from "react";
import ProductSlider from "@/components/ProductSlider";
import Select from "react-select";
import WhatsappShare from "@/components/WhatsappShare";
import PrTabSec from "@/components/PrTabSec";
import TextCanvas from "@/components/TextCanvas";
import api from "@/helpers/api";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { GlobalDataContext } from "@/context/GlobalDataContext";
import { useRouter } from "next/navigation";

const TextSignProduct = ({ id }) => {
  const { token, user } = useContext(GlobalDataContext);
  const router = useRouter();
  const [quantity, setQuantity] = useState({ value: 1, label: "1" });
  const [selectedSize, setSelectedSize] = useState(null);

  const [text, setText] = useState("VISICOM");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("#ff00ff");
  const [pageData, setPageData] = useState(null);
  const [addingToCartLoading, setAddingToCartLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/product/${id}`);
      setPageData(response.data.data);
      if (response.data.data.Pricing && response.data.data.Pricing.length > 0) {
        setSelectedSize(response.data.data.Pricing[0].attributes.Size);
      }
    };
    fetchData();
  }, []);

  const quantityOptions = [
    { value: 1, label: "1" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
    { value: 30, label: "30" },
  ];

  const handleQuantityChange = (selectedOption) => {
    setQuantity(selectedOption);
  };

  // Font options
  const fontOptions = [
    { value: "Arial", label: "Arial" },
    { value: "Verdana", label: "Verdana" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Courier New", label: "Courier New" },
    { value: "cursive", label: "Cursive (System)" },
    { value: "Pacifico", label: "Pacifico" },
  ];

  // Color options
  const colorOptions = [
    { value: "#ffffff", label: "White" },
    { value: "#ff00ff", label: "Neon Pink" },
    { value: "#00ffff", label: "Neon Blue" },
    { value: "#ffff00", label: "Neon Yellow" },
    { value: "#00ff00", label: "Neon Green" },
    { value: "#ff0000", label: "Neon Red" },
  ];

  const handleTextChange = (e) => {
    if (e.target.value === "") {
      setText("Your Text Here");
    } else {
      setText(e.target.value);
    }
  };

  const handleFontChange = (e) => {
    if (e.target.value === "") {
      setFontFamily("Arial");
    } else {
      setFontFamily(e.target.value);
    }
  };

  const handleColorChange = (e) => {
    if (e.target.value === "") {
      setColor("#ff00ff");
    } else {
      setColor(e.target.value);
    }
  };

  // Calculate price based on selected size and text length (percharacterprice)
  const priceInfo = useMemo(() => {
    if (!pageData?.Pricing || !selectedSize) return null;
    const pricingObj = pageData.Pricing.find(
      (p) => p.attributes.Size === selectedSize
    );
    if (!pricingObj) return null;

    // Count characters, ignore spaces for price calculation if needed
    // Here, let's count all characters except spaces
    const effectiveText = text && text !== "Your Text Here" ? text : "";
    const charCount = effectiveText.replace(/\s/g, "").length;

    // If percharacterprice is present and charCount > 0, use it, else use saleprice
    let totalPrice = 0;
    let perCharPrice = parseFloat(pricingObj.percharacterprice || "0");
    let salePrice = parseFloat(pricingObj.saleprice || "0");
    let regularPrice = parseFloat(pricingObj.regularprice || "0");

    if (perCharPrice > 0 && charCount > 0) {
      totalPrice = perCharPrice * charCount * quantity.value;
    } else {
      totalPrice = salePrice * quantity.value;
    }

    let totalRegularPrice = 0;
    if (perCharPrice > 0 && charCount > 0) {
      totalRegularPrice = regularPrice * charCount * quantity.value;
    } else {
      totalRegularPrice = regularPrice * quantity.value;
    }

    return {
      totalPrice,
      totalRegularPrice: regularPrice ? totalRegularPrice : null,
      perCharPrice,
      charCount,
      salePrice,
      regularPrice,
      pricingObj,
    };
  }, [pageData, selectedSize, text, quantity.value]);

  const handleAddToCart = async () => {
    if (!token || !user) {
      toast.error("Please login to add to cart");
      router.push("/login");
      return;
    }
    if (!pageData || !priceInfo) return;
    setAddingToCartLoading(true);

    // Find the selected pricing object
    const pricingObj = priceInfo.pricingObj;
    if (!pricingObj) return;

    // Prepare the payload as per the image
    const payload = {
      productId: pageData.id,
      pricingId: pricingObj.id,
      quantity: quantity.value,
      isCustom: true,
      customization: {
        text: text,
        color: color,
        font: fontFamily,
      },
    };

    try {
      const response = await api.post("/cart/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("text sign product", response);
      // return;
      if (response?.data?.success) {
        toast.success("Added to cart");
        setAddingToCartLoading(false);
        router.push("/cart");
      } else {
        toast.error("Failed to add to cart");
        setAddingToCartLoading(false);
      }
    } catch (error) {
      toast.error("Error adding to cart");
      setAddingToCartLoading(false);
    }
  };

  return (
    <div className="pr-inner-page sec">
      <div className="container">
        <div className="row ">
          <div className="col-lg-5 col-12">
            <TextCanvas color={color} fontFamily={fontFamily} text={text} />
          </div>
          <div className="col-lg-7 col-12">
            <div className="pr-inner-right">
              <h3 className="sec-head">{pageData?.name}</h3>
              <div
                className="para"
                dangerouslySetInnerHTML={{
                  __html: pageData?.shortDescription,
                }}
              ></div>
              {/* Price Section */}
              {priceInfo && (
                <div className="price-info mb-3">
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.35em",
                      color: "#0070f3",
                    }}
                  >
                    {/* Price: */}₹ &nbsp;
                    {priceInfo.totalPrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {priceInfo.totalRegularPrice &&
                      priceInfo.totalRegularPrice > priceInfo.totalPrice && (
                        <span
                          style={{
                            color: "#888",
                            textDecoration: "line-through",
                            marginLeft: 8,
                            fontWeight: 400,
                            fontSize: "0.75em",
                          }}
                        >
                          ₹
                          {priceInfo.totalRegularPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                  </div>
                  {/* {priceInfo.perCharPrice > 0 && (
                    <div style={{ fontSize: "0.95em", color: "#555" }}>
                      {priceInfo.charCount} character
                      {text && priceInfo.charCount !== 1 ? "s" : ""} × ₹
                      {priceInfo.perCharPrice} per character × {quantity.value}{" "}
                      qty
                    </div>
                  )}
                  {priceInfo.perCharPrice === 0 && (
                    <div style={{ fontSize: "0.95em", color: "#555" }}>
                      {quantity.value} qty × ₹{priceInfo.salePrice} per unit
                    </div>
                  )} */}
                </div>
              )}
              <div className="text-controls mt-2">
                <div className="form-group mb-3">
                  <label htmlFor="text-input">Text:</label>
                  <input
                    type="text"
                    id="text-input"
                    className="form-control"
                    value={text !== "Your Text Here" ? text : ""}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="font-select">Pick Your Font</label>
                  <div className="font-grid">
                    {fontOptions.map((font, index) => (
                      <label
                        className="font-label"
                        htmlFor={index + "cc"}
                        key={index}
                      >
                        <input
                          type="radio"
                          id={index + "cc"}
                          value={font.value}
                          checked={fontFamily === font.value}
                          onChange={handleFontChange}
                        />
                        <div className="inner">
                          <span style={{ fontFamily: font.value }}>
                            {font.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="color-select">Select Your Colour</label>
                  <div className="color-grid">
                    {colorOptions.map((colorOpt, index) => (
                      <label
                        className="color-label"
                        htmlFor={index + "ccd"}
                        key={index}
                      >
                        <input
                          type="radio"
                          id={index + "ccd"}
                          value={colorOpt.value}
                          checked={color === colorOpt.value}
                          onChange={handleColorChange}
                        />
                        <span
                          style={{ backgroundColor: colorOpt.value }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="mb-2 label-text">Select Size</label>
                <div
                  className="size-grid"
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                >
                  {pageData?.Pricing &&
                    pageData.Pricing.length > 0 &&
                    pageData.Pricing.map((sz, idx) => (
                      <label
                        key={idx}
                        htmlFor={`size-${sz.attributes.Size}`}
                        className={`size-box${
                          selectedSize === sz.attributes.Size ? " selected" : ""
                        }`}
                        style={{
                          border:
                            selectedSize === sz.attributes.Size
                              ? "1px solid #0070f3"
                              : "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "1rem",
                          flex: "1 1 auto",
                          cursor: "pointer",
                          minWidth: "120px",
                          textAlign: "center",
                          background:
                            selectedSize === sz.attributes.Size
                              ? "#f0f8ff"
                              : "#fff",
                          transition: "border 0.2s, background 0.2s",
                        }}
                      >
                        <input
                          type="radio"
                          id={`size-${sz.attributes.Size}`}
                          name="size"
                          value={sz.attributes.Size}
                          checked={selectedSize === sz.attributes.Size}
                          onChange={() => setSelectedSize(sz.attributes.Size)}
                          style={{ display: "none" }}
                        />
                        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                          {sz.attributes.Size}
                        </div>
                        <div style={{ fontSize: "0.95em", margin: "0.25em 0" }}>
                          {/* No explicit height/width, so just show the size string */}
                        </div>
                        <div style={{ color: "#0070f3", fontWeight: 500 }}>
                          ₹{sz.saleprice}
                        </div>
                        {sz.regularprice && (
                          <div
                            style={{
                              color: "#888",
                              textDecoration: "line-through",
                              fontSize: "0.95em",
                            }}
                          >
                            ₹{sz.regularprice}
                          </div>
                        )}
                      </label>
                    ))}
                </div>
              </div>
              {/* No Add-on selection, as per the data */}
              <div className="pr-corners mt-4">
                <div className="quantity-selector">
                  <label className="mb-2 label-text">Quantity:</label>
                  <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    options={quantityOptions}
                    placeholder="Select quantity..."
                  />
                </div>
                <WhatsappShare />
                <button
                  className="main-btn blue wide w-100"
                  onClick={handleAddToCart}
                  disabled={addingToCartLoading}
                >
                  {addingToCartLoading ? (
                    <span>
                      <Loader color="white" />
                    </span>
                  ) : (
                    <>
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
                      <span>
                        {user ? "Add to Cart" : "Login to Add to Cart"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <PrTabSec data={pageData} />
      </div>
    </div>
  );
};

export default TextSignProduct;
