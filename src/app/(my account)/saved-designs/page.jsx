"use client";
import React, { useContext, useEffect, useState } from "react";
import api from "@/helpers/api";
import { GlobalDataContext } from "@/context/GlobalDataContext";
import ProductCard from "@/components/ProductCard";

const SavedDesignsPage = () => {
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(GlobalDataContext);
  useEffect(() => {
    const fetchSavedDesigns = async () => {
      try {
        const response = await api.get("/favorite/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("saved designs", response);
        setSavedDesigns(response.data?.data || []);
      } catch (error) {
        setSavedDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedDesigns();
  }, [token]);

  return (
    <div className="orders-page">
      <h3 className="sec-head sm">Saved Designs</h3>
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
        ) : savedDesigns.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="mb-0">No saved designs found</h4>
          </div>
        ) : (
          <div className="row row-gap-25">
            {savedDesigns.map((design) => (
              <div className="col-lg-6 col-12">
                <ProductCard
                  key={design.id}
                  data={{
                    image: design.image,
                    title: design.name,
                    price: `Starting at ₹ ${design.price}`,
                    slug: design.slug,
                    image_alt: design.name,
                    category: "Normal",
                    isFavorite: design.isFavorite,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedDesignsPage;
