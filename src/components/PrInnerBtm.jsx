"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import wh from "@/images/add-img.svg";
import upIcon from "@/images/up-iconn.svg";
import bookmarkWhite from "@/images/bookmark-white.svg";
import cartWhite from "@/images/cart-white.svg";
import gua from "@/images/gua.svg";
import { useRouter } from "next/navigation";
import { GlobalDataContext } from "@/context/GlobalDataContext";

const PrInnerBtm = ({ data, handleAddToCart, quantity, selectedVariation }) => {
  const router = useRouter();
  const { setCreateCustomDesign, token, createCustomDesign } =
    useContext(GlobalDataContext);
  console.log("selectedVariation inner", selectedVariation);
  const handleCreateCustomDesign = () => {
    if (selectedVariation?.value?.attributes?.Size) {
      const size = handleSizeSeprate(
        selectedVariation?.value?.attributes?.Size
      );
      setCreateCustomDesign((prev) => ({
        ...prev,
        productId: data.id,
        pricingId: selectedVariation?.value?.id || null,
        quantity: quantity?.value,
        isCustom: false,
        customization: "",
        addonIds: JSON.stringify([]),
        width: size.width,
        height: size.height,
      }));
      router.push(`/editor/${data.slug}`);
      return;
    }
  };
  useEffect(() => {
    console.log("createCustomDesign on product page", createCustomDesign);
  }, [createCustomDesign]);

  const handleSizeSeprate = (size) => {
    // Expecting size in format "150 x 150 MM"
    const sizeStr = size;
    // Extract numbers and unit (e.g., "150 x 150 MM")
    const match = sizeStr.match(/(\d+)\s*x\s*(\d+)\s*([a-zA-Z]+)/i);
    if (match) {
      const width = parseInt(match[1], 10);
      const height = parseInt(match[2], 10);
      const unit = match[3].toUpperCase();

      // Conversion factors
      let widthPx = width;
      let heightPx = height;

      if (unit === "MM") {
        // 1 mm = 3.7795275591 px
        widthPx = Math.round(width * 3.7795275591);
        heightPx = Math.round(height * 3.7795275591);
      } else if (unit === "CM") {
        // 1 cm = 37.795275591 px
        widthPx = Math.round(width * 37.795275591);
        heightPx = Math.round(height * 37.795275591);
      } else if (unit === "IN" || unit === "INCH" || unit === "INCHES") {
        // 1 inch = 96 px
        widthPx = Math.round(width * 96);
        heightPx = Math.round(height * 96);
      }
      console.log(
        `Width: ${width} ${unit} (${widthPx}px), Height: ${height} ${unit} (${heightPx}px)`
      );
      return {
        width: widthPx,
        height: heightPx,
      };
    }
  };

  return (
    <>
      {token && (
        <>
          <button
            className="browse-btn mb-2"
            onClick={() => {
              router.push("/browse-designs/12");
            }}
          >
            <div className="l-part">
              <h3>Browse Designs</h3>
              <p>Choose one of our templates</p>
            </div>
            <div className="r-part">
              <Image src={wh} alt="whatsapp" />
            </div>
          </button>
          <button
            className="up-btn"
            onClick={() => {
              handleCreateCustomDesign();
            }}
          >
            <div className="l-part">
              <h3>Create Your Own Design</h3>
              <p>Create your own design with our editor</p>
            </div>
            <div className="r-part">
              <Image src={upIcon} alt="whatsapp" />
            </div>
          </button>
        </>
      )}
      <div className="btn-group mt-4">
        {/* <button className="main-btn-2 save-btn">
          <Image src={bookmarkWhite} alt="whatsapp" />
          <span>Save for Later</span>
        </button> */}
        <button
          className="main-btn-2 add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <Image src={cartWhite} alt="whatsapp" />
          <span>Add to Cart</span>
        </button>
      </div>
      <p className="guarantee-text mt-4">
        <Image src={gua} alt="whatsapp" />
        <span>100% satisfaction guaranteed</span>
      </p>
    </>
  );
};

export default PrInnerBtm;
