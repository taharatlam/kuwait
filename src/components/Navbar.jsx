"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import searchIcon from "@/images/search.svg";
import like from "@/images/like.svg";
import userImg from "@/images/user.svg";
import cart from "@/images/cart.svg";
import bookmark from "@/images/whishlist.svg";
import api from "@/helpers/api";
import Cookies from "js-cookie";
import { GlobalDataContext } from "@/context/GlobalDataContext";
import SearchBar from "./SearchBar";
import Select from "react-select";

// SVG for language icon
// White translate icon SVG
const LangIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    style={{ display: "block" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M7 12h10M12 7v10"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="12" rx="5" ry="10" stroke="#fff" strokeWidth="1.5" />
    </g>
  </svg>
);

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/products",
    text: "Products",
  },
  {
    href: "/products/12",
    text: "Product Single",
  },
  {
    href: "/profile",
    text: "Profile",
  },
  {
    href: "/",
    text: "Home Cleaning & Laundry",
  },
  {
    href: "/",
    text: "Household Tools",
  },
  {
    href: "/",
    text: "Home Organizers",
  },
  {
    href: "/",
    text: "Bathroom Essentials",
  },
];

// Language + G selector options
const langOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "gu", label: "ગુજરાતી" },
];

const Navbar = () => {
  // const [navLinks, setNavLinks] = useState([]);
  const { user, token } = useContext(GlobalDataContext);

  // Language selector state
  const [selectedLang, setSelectedLang] = useState(langOptions[0]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await api.get("/categories");
  //     const data = response?.data?.data?.map((itm) => ({
  //       href: "/products",
  //       text: itm?.name,
  //     }));
  //     setNavLinks(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <nav className="main-nav">
      <div className="container-fluid">
        <div className="nav-inner">
          <div className="top">
            <Link href="/" className="logo">
              <Image src={logo} alt="logo" />
            </Link>
            <SearchBar />
            <ul className="ot-links">
              {/* {user && ( */}
              <li>
                <Link href="/saved-designs">
                  <Image src={bookmark} alt="user" />
                  <span>Wishlist</span>
                </Link>
              </li>
              {/* )} */}
              <li>
                {user ? (
                  <Link href="/">
                    <Image src={userImg} alt="user" />
                    <span>Profile</span>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Image src={userImg} alt="user" />
                    <span>Login/Signup</span>
                  </Link>
                )}
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Link href="/">
                  <Image src={cart} alt="user" />
                  <span>Cart</span>
                </Link>
                {/* Lang selector beside cart, with icon and white bg */}
                <div
                  style={{
                    minWidth: 120,
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                    marginLeft: 8,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      opacity: 0.7,
                    }}
                  >
                    <LangIcon />
                  </span>
                  <Select
                    options={langOptions}
                    value={selectedLang}
                    onChange={setSelectedLang}
                    isSearchable={false}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: 32,
                        height: 32,
                        fontSize: 14,
                        borderRadius: 8,
                        borderColor: "transparent !important",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                        paddingLeft: 0,
                        color: "#fff",
                        boxShadow: "none",
                        paddingRight: 0,
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        height: 32,
                        padding: "0 8px",
                        background: "transparent",
                        color: "#fff",
                      }),
                      indicatorsContainer: (base) => ({
                        ...base,
                        height: 32,
                        background: "transparent",
                        color: "#fff",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        padding: 4,
                        color: "#fff",
                      }),
                      menu: (base) => ({
                        ...base,
                        zIndex: 9999,
                        backgroundColor: "green",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                        marginTop: 2,
                        color: "#fff",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#fff",
                        fontWeight: 500,
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#0A3C33"
                          : state.isFocused
                          ? "#0A3C33"
                          : "#0A3C33",
                        color: state.isSelected ? "#fff" : "#fff",
                        fontWeight: state.isSelected ? 600 : 400,
                        fontSize: 14,
                        cursor: "pointer",
                      }),
                      input: (base) => ({
                        ...base,
                        color: "#264796",
                        background: "transparent",
                      }),
                    }}
                    menuPlacement="auto"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="bottom">
            <ul
              style={{
                justifyContent: `${
                  navLinks.length < 6 ? "flex-start" : "space-between"
                }`,
              }}
            >
              {navLinks &&
                navLinks.length > 0 &&
                navLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              <li>
                <Link href={"/products?category=Neon Signs"}>Neon Signs</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
