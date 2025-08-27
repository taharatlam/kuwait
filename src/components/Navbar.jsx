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

const navLinks = [
  {
    href: "/",
    text: "All Products",
  },
  {
    href: "/",
    text: "Kitchen Tools",
  },
  {
    href: "/",
    text: "Dining",
  },
  {
    href: "/",
    text: "Home Decor",
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

const Navbar = () => {
  // const [navLinks, setNavLinks] = useState([]);
  const { user, token } = useContext(GlobalDataContext);

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
                  <Link href="/">
                    <Image src={userImg} alt="user" />
                    <span>Login/Signup</span>
                  </Link>
                )}
              </li>
              <li>
                <Link href="/">
                  <Image src={cart} alt="user" />
                  <span>Cart</span>
                </Link>
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
