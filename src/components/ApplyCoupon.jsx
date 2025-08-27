import React from "react";

const ApplyCoupon = ({ onApply, couponCode, setCouponCode }) => {
  return (
    <div className="apply-coupon">
      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button className="apply-btn" onClick={onApply}>
        Apply
      </button>
    </div>
  );
};

export default ApplyCoupon;
