import React, { useState, useContext, useEffect } from "react";
import ApplyCoupon from "./ApplyCoupon";
import Image from "next/image";
import rightArrow from "@/images/arr.svg";
import { GlobalDataContext } from "@/context/GlobalDataContext";
import api from "@/helpers/api";
import { toast } from "react-toastify";

const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "-";
  return `$${(amount / 100).toFixed(2)}`;
};

const OrderSummary = ({
  cart,
  cartTotal,
  buttonText,
  buttonClick,
  isLoading,
}) => {
  if (!cartTotal) return null;
  const [couponCode, setCouponCode] = useState("");
  const { token, user } = useContext(GlobalDataContext);

  const { subtotal, discount, total, coupon } = cartTotal;

  const handleApplyCoupon = async () => {
    if (couponCode === "") {
      toast.error("Please enter a coupon code");
      return;
    }
    try {
      if (!token || !user) {
        toast.error("Please login to apply coupon");
        return;
      }
      const response = await api.post(
        "cart/apply-coupon",
        { code: couponCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("apply coupon", response);
      return;
      if (response?.data?.success) {
        toast.success("Coupon applied successfully");
        setCouponCode("");
      } else {
        toast.error(response?.data?.message || "Failed to apply coupon");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply coupon");
      setCouponCode("");
    }
  };

  return (
    <div className="order-summary">
      <h3 className="mb-3">Order Summary</h3>
      <ApplyCoupon
        onApply={handleApplyCoupon}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
      />
      <div className="order-summary-item mt-3">
        <p>Subtotal</p>
        <p>{formatCurrency(subtotal)}</p>
      </div>
      {discount > 0 && (
        <div className="order-summary-item">
          <p>Discount{coupon ? ` (${coupon})` : ""}</p>
          <p>-{formatCurrency(discount)}</p>
        </div>
      )}
      <div className="order-summary-item total">
        <p>Total</p>
        <p>{formatCurrency(total)}</p>
      </div>
      <button className="main-btn blue wide mt-3" onClick={buttonClick}>
        {isLoading ? (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          >
            <span className="visually-hidden">Loading...</span>
          </span>
        ) : (
          <span className="text-white">
            {buttonText || "Continue to checkout"}
          </span>
        )}
        <Image src={rightArrow} alt="arrow-right" width={16} height={16} />
      </button>
    </div>
  );
};

export default OrderSummary;
