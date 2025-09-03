"use client";
import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
// import "../scss/main.scss";

// Inline style for custom range slider bar color
const rangeSliderStyles = `
  .range-slider .range-slider__range {
    background: #1d1d1d !important;
  }
  .range-slider .range-slider__thumb {
    border-color: #1d1d1d !important;
  }
    .range-slider .range-slider__thumb{
    background: #1d1d1d !important;
    }
`;

const categories = [
  {
    name: "Kitchen Tools",
    subcategories: [
      "Cutlery",
      "Utensils",
      "Chopping Boards",
      "Measuring Tools",
    ],
  },
  {
    name: "Dining",
    subcategories: [
      "Dinner Sets",
      "Serving Bowls",
      "Glassware",
      "Table Accessories",
    ],
  },
  {
    name: "Home Decor",
    subcategories: ["Wall Art", "Vases", "Candles", "Photo Frames"],
  },
  {
    name: "Home & Life",
    subcategories: ["Bedding", "Cushions", "Throws", "Clocks"],
  },
  {
    name: "Home Cleaning & Laundry",
    subcategories: ["Cleaning Tools", "Laundry Baskets", "Detergents", "Mops"],
  },
  {
    name: "Household Tools",
    subcategories: [
      "Tool Kits",
      "Screwdrivers",
      "Measuring Tape",
      "Flashlights",
    ],
  },
  {
    name: "Home Organizers",
    subcategories: ["Storage Boxes", "Shelves", "Drawer Organizers", "Hooks"],
  },
  {
    name: "Bathroom Essentials",
    subcategories: [
      "Towels",
      "Soap Dispensers",
      "Shower Curtains",
      "Bath Mats",
    ],
  },
];

const brands = ["PARATI", "XIANJU", "GREEN ROAD", "GSD"];

const moreBrands = [
  "Brand 5",
  "Brand 6",
  "Brand 7",
  "Brand 8",
  "Brand 9",
  "Brand 10",
];

const colors = [
  "#1d4d1a", // green
  "#e94e3c", // red
  "#f7b500", // yellow
  "#1a3e6b", // blue
  "#f7a7c0", // pink
  "#f7e06b", // light yellow
  "#f7b500", // orange
  "#b7a7e7", // purple
];

const ProductsFilterSidebar = () => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState("0");
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [price, setPrice] = useState([0, 1000]);

  // Handlers
  const handleSubcategory = (subcat) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcat)
        ? prev.filter((c) => c !== subcat)
        : [...prev, subcat]
    );
  };

  const handleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleColor = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  const handleAccordionToggle = (eventKey) => {
    setExpandedCategory((prev) => (prev === eventKey ? null : eventKey));
  };

  return (
    <div className="p-3 filter-sidebar">
      {/* Inject custom styles for the range slider */}
      <style>{rangeSliderStyles}</style>
      <h2 className="h6">FILTERS</h2>

      {/* CATEGORY */}
      <p className="body-3 mt-4">CATEGORY</p>
      <Accordion activeKey={expandedCategory} className="cat-acc" alwaysOpen>
        {categories.map((cat, idx) => (
          <Accordion.Item
            eventKey={String(idx)}
            key={cat.name}
            style={{ border: "none", background: "none" }}
          >
            <Accordion.Header
              style={{
                fontWeight: 500,
                fontSize: 15,
                background: "none",
                border: "none",
                boxShadow: "none",
                padding: 0,
                cursor: "pointer",
              }}
              onClick={() => handleAccordionToggle(String(idx))}
            >
              {cat.name}
            </Accordion.Header>
            <Accordion.Body
              style={{ paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}
            >
              {cat.subcategories.map((subcat) => (
                <Form.Check
                  key={subcat}
                  type="checkbox"
                  id={`subcat-${subcat}`}
                  label={subcat}
                  checked={selectedSubcategories.includes(subcat)}
                  onChange={() => handleSubcategory(subcat)}
                  style={{
                    fontWeight: 400,
                    fontSize: 14,
                    marginBottom: 4,
                    marginRight: 8,
                    cursor: "pointer",
                  }}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* BRANDS */}
      <h6 className="h6 mt-4"> BRANDS</h6>
      <div>
        {[...brands, ...(showMoreBrands ? moreBrands : [])].map((brand) => (
          <div
            key={brand}
            style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
          >
            <Form.Check
              type="checkbox"
              id={`brand-${brand}`}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrand(brand)}
              style={{
                fontWeight: 400,
                fontSize: 14,
                marginBottom: 0,
                marginRight: 8,
                cursor: "pointer",
              }}
            />
          </div>
        ))}
        {!showMoreBrands && (
          <Button
            variant="link"
            style={{ padding: 0, fontSize: 14, marginTop: 4 }}
            onClick={() => setShowMoreBrands(true)}
          >
            Show more
          </Button>
        )}
      </div>

      {/* COLORS */}
      <h6 className="h6 mt-4">COLORS</h6>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}
      >
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => handleColor(color)}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: color,
              border:
                selectedColor === color
                  ? "2px solid #1d1d1d"
                  : "2px solid #eee",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
            title={color}
          />
        ))}
      </div>

      {/* PRICE RANGE */}
      <h6 className="h6 mt-4">PRICE</h6>

      <div style={{ marginBottom: 16 }}>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={price}
          onInput={setPrice}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            marginTop: 6,
          }}
        >
          <span>₹{price[0]}</span>
          <span>₹{price[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilterSidebar;
