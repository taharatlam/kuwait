"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function clearAllCookies() {
  // Remove all cookies using js-cookie
  if (typeof document !== "undefined") {
    const allCookies = document.cookie.split("; ");
    for (const cookie of allCookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      Cookies.remove(name, { path: "/" });
    }
  }
}

const api = axios.create({
  baseURL: "https://visicom.techmatrick.com/api",
  // baseURL: "http://147.93.103.209/visicom/api",
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      clearAllCookies();
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default api;
