"use client";
import React from "react";
import Sidebar from "@/components/sidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: pathname.split("/").pop(), url: pathname },
  ];

  return (
    <section className="my-acc-sec sec">
      <div className="container">
        <Breadcrumb data={breadcrumbData} />
        <div className="row">
          <div className="col-12 mb-5">
            <h3 className="h4 text-uppercase">My Account</h3>
          </div>
          <div className="col-lg-4 col-12">
            <Sidebar />
          </div>
          <div className="col-lg-8 col-12">
            <div className="my-acc-main">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
