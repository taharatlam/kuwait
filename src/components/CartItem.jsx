"use client";
import React, { useState } from "react";
import Image from "next/image";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        {item?.product?.image && (
          <Image
            src={item?.product?.image}
            alt={item?.product?.name}
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="cart-item-details">
        <div className="cart-item-left">
          <h3>{item?.product?.name}</h3>
          <p className="product-price">{item?.price}</p>
        </div>
        <div className="cart-item-right">
          <div className="quantity-counter">
            <button
              className="quantity-btn btn btn-outline-dark"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="quantity-value btn">{quantity}</span>
            <button
              className="quantity-btn btn btn-outline-dark"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <button className="remove-item">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
