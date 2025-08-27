"use client";
import React, { useEffect, useState, useContext } from "react";
import OrderCard from "@/components/OrderCard";
import api from "@/helpers/api";
import { GlobalDataContext } from "@/context/GlobalDataContext";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(GlobalDataContext);

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
        });
        // Assuming the API response structure matches the example
        console.log("orders", response);
        setOrders(response.data?.data?.pending || []);
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <h3 className="sec-head sm">Your Orders</h3>
      <div className="orders-list mt-4">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "2rem", height: "2rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="mb-0">No orders found</h4>
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
