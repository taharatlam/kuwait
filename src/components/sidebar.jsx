"use client";
import React, { useContext } from "react";
import Profile from "./icons/Profile";
import Link from "next/link";
import { ArrowRight } from "./icons/ArrowRight";
import { usePathname } from "next/navigation";
import { GlobalDataContext } from "@/context/GlobalDataContext";

const sidebar = () => {
  const { userLogout } = useContext(GlobalDataContext);
  const links = [
    {
      name: "Profile",
      path: "/profile",
      icon: <Profile />,
    },
    {
      name: "Your Orders",
      path: "/orders",
      icon: <Profile />,
    },
    {
      name: "Returns and Refunds",
      path: "/returns",
      icon: <Profile />,
    },
    {
      name: "Saved Designs",
      path: "/saved-designs",
      icon: <Profile />,
    },

    {
      name: "Sign Out",
      path: "/logout",
      onClick: () => {
        if (!window.confirm("Are you sure you want to sign out?")) {
          userLogout();
          return;
        }
        userLogout();
      },
      icon: <Profile />,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="sidebar">
      <h3 className="sec-head sm">Welcome, Lorem Ipsum</h3>
      <ul className="sidebar-links">
        {links.map((link) => (
          <li key={link.name}>
            {link.onClick ? (
              <button onClick={link.onClick}>
                <div className="sidebar-link-content">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <ArrowRight />
              </button>
            ) : (
              <Link
                href={link.path}
                className={`sidebar-link ${
                  link.path === pathname ? "active" : ""
                }`}
              >
                <div className="sidebar-link-content">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <ArrowRight />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default sidebar;
