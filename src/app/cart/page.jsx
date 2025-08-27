"use client";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/helpers/api";
import Image from "next/image";
import fastIcon from "@/images/fast.svg";
import customerCareIcon from "@/images/customer-care.svg";
import Link from "next/link";
import { toast } from "react-toastify";

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      setIsLoggedIn(!!token);
      const fetchCart = async () => {
        const response = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        setCartLoading(false);
        setCart(response.data.data);
      };
      const fetchCartTotal = async () => {
        const response = await api.get("/cart/total", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log("cart total", response.data);
        setCartTotal(response.data);
      };
      if (token) {
        setCartLoading(true);
        fetchCart();
        fetchCartTotal();
      }
    }
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="cart-page sec">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2rem", height: "2rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="cart-page sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-12 text-center py-5">
              {/* Cart illustration SVG */}
              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: "2rem" }}
                aria-hidden="true"
              >
                <circle cx="90" cy="90" r="90" fill="#F3F6FB" />
                <ellipse cx="90" cy="140" rx="60" ry="18" fill="#E0E7EF" />
                {/* Cart body */}
                <rect
                  x="50"
                  y="70"
                  width="80"
                  height="40"
                  rx="8"
                  fill="#BFD4EA"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                {/* Cart handle */}
                <rect
                  x="120"
                  y="60"
                  width="8"
                  height="20"
                  rx="4"
                  fill="#BFD4EA"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                {/* Cart front */}
                <rect
                  x="45"
                  y="80"
                  width="10"
                  height="30"
                  rx="5"
                  fill="#BFD4EA"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                {/* Cart wheels */}
                <circle
                  cx="60"
                  cy="120"
                  r="8"
                  fill="#fff"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="8"
                  fill="#fff"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                {/* Cart lines */}
                <line
                  x1="60"
                  y1="80"
                  x2="120"
                  y2="80"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                <line
                  x1="60"
                  y1="90"
                  x2="120"
                  y2="90"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                <line
                  x1="60"
                  y1="100"
                  x2="120"
                  y2="100"
                  stroke="#A2B9CE"
                  strokeWidth="2"
                />
                {/* Cart content (boxes) */}
                <rect
                  x="70"
                  y="60"
                  width="16"
                  height="16"
                  rx="3"
                  fill="#E0E7EF"
                />
                <rect
                  x="92"
                  y="55"
                  width="14"
                  height="21"
                  rx="3"
                  fill="#E0E7EF"
                />
              </svg>
              <h2>You are not logged in</h2>
              <p>Please get login to view your cart.</p>
              <button
                className="main-btn center blue wide-l"
                onClick={() => router.push("/login?from=cart")}
                type="button"
              >
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12">
            <h2>Cart</h2>
            {cartLoading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : cart && cart.length > 0 ? (
              cart?.map((item, idx) => <CartItem key={idx} item={item} />)
            ) : (
              <div
                className="text-center py-5"
                style={{
                  minHeight: "30vh",
                  padding: "100px 20px",
                  backgroundColor: "#f3f6fb",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <h4 className="mb-0">No items in cart</h4>
                <Link href="/">
                  <button className="main-btn center blue wide-l">
                    <span>Shop Now</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="col-lg-4 col-12">
            {cartTotal ? (
              <OrderSummary
                cart={cart}
                cartTotal={cartTotal}
                buttonClick={() => {
                  if (cart?.length > 0) {
                    router.push("/checkout");
                  } else {
                    toast.error("Cart is empty");
                  }
                }}
              />
            ) : (
              <div className="text-center py-5" style={{ minHeight: "20vh" }}>
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="mt-4 extra-wrap">
              <div className="d-flex align-items-center gap-4">
                <Image src={fastIcon} alt="coupon" width={82} height={82} />
                <div>
                  <h5 className="mb-0 color-blue">Fast & Reliable Delivery</h5>
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    Get your signboards delivered on time, every time.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4">
                <Image
                  src={customerCareIcon}
                  alt="coupon"
                  width={82}
                  height={82}
                />
                <div>
                  <h5 className="mb-0 color-blue">24/7 Customer Care </h5>
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    We’re here to answer your queries and ensure a smooth
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
