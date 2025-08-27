"use client";
import React, { useState, useRef, useEffect } from "react";
import searchIcon from "@/images/search.svg";
import Image from "next/image";
import Link from "next/link";
import api from "@/helpers/api";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showTray, setShowTray] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const trayRef = useRef(null);

  // Debounce the search input
  const debouncedSearch = useDebounce(search, 700);

  // Fetch search results from API on debounced input change
  useEffect(() => {
    const query = debouncedSearch.trim();
    if (query.length === 0) {
      setResults([]);
      setLoading(false);
      setShowTray(false);
      return;
    }
    setLoading(true);

    api
      .get(`/search?search=${encodeURIComponent(query)}`)
      .then((res) => {
        // Expecting res.data to be an array of products
        setResults(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch(() => {
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearch]);

  // Input change handler: open tray immediately, update search
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowTray(true);
      setLoading(true);
    } else {
      setShowTray(false);
      setLoading(false);
      setResults([]);
    }
  };

  // Show tray on focus if input is not empty
  const handleFocus = () => {
    if (search.trim().length > 0) setShowTray(true);
  };

  // Hide tray when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        trayRef.current &&
        !trayRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowTray(false);
      }
    };
    if (showTray) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTray]);

  return (
    <div className="search-bar-container" style={{ position: "relative" }}>
      <div className="search-bar" style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        <span>
          <Image src={searchIcon} alt="search" width={20} height={20} />
        </span>
      </div>
      {showTray && (
        <div className="search-results-tray" ref={trayRef}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "16px",
              }}
            >
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2rem", height: "2rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div
              style={{
                padding: "16px",
                color: "#888",
                textAlign: "center",
                fontSize: "15px",
                padding: "1.5em 16px",
              }}
            >
              No products found
              {search.trim().length > 0 ? ` for "${search.trim()}"` : "."}
            </div>
          ) : (
            results.map((prod) => (
              <Link
                href={`/products/${prod.slug}`}
                key={prod.id}
                onClick={() => setShowTray(false)}
                className="search-result-item"
              >
                <div className="search-result-image">
                  <Image
                    src={prod.image}
                    alt={prod.image_alt || prod.name}
                    width={500}
                    height={500}
                  />
                </div>
                <div className="search-result-details">
                  <h3 className="search-result-name">{prod.name}</h3>
                  <p className="search-result-category">
                    {prod.category?.name}
                  </p>
                  <p className="search-result-price">₹ {prod.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
