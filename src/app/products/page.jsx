"use client";
import React, { useEffect, useState, useContext } from "react";
import productBanner from "@/images/products-banner.png";
import Image from "next/image";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import api from "@/helpers/api";
import { useSearchParams } from "next/navigation";
import { GlobalDataContext } from "@/context/GlobalDataContext";

const Spinner = () => (
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
);

const page = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { token } = useContext(GlobalDataContext);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const url = category == "Neon Signs" ? `/products/neon` : "/products";
      console.log("token", token);
      try {
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
        });
        setCategories(response.data.data || []);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [token]);

  return (
    <>
      <header className="inner-banner sec">
        <div className="container">
          <div className="row row-gap-25 align-items-center">
            <div className="col-lg-5 col-12">
              <div className="ban-con">
                <h1 className="ban-head">Let’s Connect!</h1>
                <p className="para">
                  At Visicom Systems, we’re always here to help! Whether you
                  have a question, need guidance or just want to chat about
                  writing boards and signages , we’d love to hear from you.
                </p>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-2 col-12">
              <Image
                src={productBanner}
                alt="contact-banner"
                className="w-100 h-auto"
              />
            </div>
          </div>
        </div>
      </header>
      <section className="sec pr-sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ProductFilters />
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : categories.length > 0 ? (
            categories.map((cat, idx) => (
              <div className="pr-row" key={cat.category?.id || idx}>
                <div className="row row-gap-25">
                  <div className="col-12">
                    <h3 className="pr-title">{cat.category?.name}</h3>
                  </div>
                  {(cat.products || []).map((product, pidx) => (
                    <div className="col-lg-4 col-12" key={product.id || pidx}>
                      <ProductCard
                        data={{
                          id: product.id,
                          image: product.image,
                          title: product.name,
                          price: `Starting at ₹ ${product.price}`,
                          slug: product.slug,
                          image_alt: product.image_alt,
                          category:
                            category == "Neon Signs" ? "Neon" : "Normal",
                          isFavorite: product.isFavorite,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p>No products found.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
