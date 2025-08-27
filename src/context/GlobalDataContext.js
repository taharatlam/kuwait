"use client";
import React, { createContext, useState, useEffect } from "react";
import api from "@/helpers/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const GlobalDataContext = createContext({
  categories: [],
  setCategories: () => {},
  userLogout: () => {},
});

export const GlobalDataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [createCustomDesign, setCreateCustomDesign] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("user");
    const token = Cookies.get("token");
    if (user) {
      setUser(JSON.parse(user));
    }
    console.log("token on refresh", token);
    if (token) {
      console.log("token on refresh 2", token);
      setToken(token);
    }
  }, []);

  const userLogin = (user, token) => {
    setUser(user);
    setToken(token);
    Cookies.set("user", JSON.stringify(user));
    Cookies.set("token", token);
  };

  const userLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("wishlist");
    setUser(null);
    setToken(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        const data = response?.data?.data || [];
        setCategories(data);
      } catch (error) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        categories,
        setCategories,
        userLogout,
        user,
        token,
        userLogin,
        setUser,
        setToken,
        createCustomDesign,
        setCreateCustomDesign,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
