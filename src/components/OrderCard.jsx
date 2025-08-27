import React from "react";
import Image from "next/image";

const statusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "status pending";
    case "completed":
      return "status completed";
    case "cancelled":
      return "status cancelled";
    default:
      return "status";
  }
};

const formatCurrency = (amount) => {
  if (!amount) return "-";
  // Try to parse as float, fallback to string
  const num = typeof amount === "number" ? amount : parseFloat(amount);
  if (isNaN(num)) return amount;
  // You can adjust currency as needed
  return `₹ ${num.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
};

const OrderCard = ({ order }) => {
  // Defensive: fallback if order is not passed
  if (!order) return null;

  // Get first product for image
  const firstProduct =
    order.products && order.products.length > 0 ? order.products[0] : null;
  const productImage = firstProduct?.product?.image;
  const productAlt =
    firstProduct?.product?.alt ||
    firstProduct?.product?.name ||
    "Order Product";

  return (
    <div className="order-card">
      <div className="top">
        <div className="img">
          {productImage ? (
            <Image
              src={productImage}
              alt={productAlt}
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                background: "#f3f6fb",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#bbb",
                fontSize: 24,
              }}
            >
              No Image
            </div>
          )}
        </div>
        <button className="view-order-btn main-btn border-btn">
          <span>View Order</span>
        </button>
      </div>
      <div className="bottom">
        <ul className="order-details">
          <li>
            <p>Order Number</p>
            <span>{order.orderId || order.id}</span>
          </li>
          <li>
            <p>Order Date</p>
            <span>{order.orderDate || "-"}</span>
          </li>
          <li>
            <p>Total</p>
            <span>{formatCurrency(order.totalAmount)}</span>
          </li>
          <li>
            <p>Status</p>
            <span className={statusClass(order.orderStatus)}>
              {order.orderStatus
                ? order.orderStatus.charAt(0).toUpperCase() +
                  order.orderStatus.slice(1)
                : "-"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
