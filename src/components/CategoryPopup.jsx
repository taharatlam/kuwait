"use client";
import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import closeBtn from "@/images/close.svg";
import Image from "next/image";

// Dummy categories grouped by first letter
const dummyCategories = {
  A: ["Apple", "Apricot", "Avocado", "Artichoke", "Asparagus"],
  B: ["Banana", "Blueberry", "Broccoli", "Brussels Sprout", "Beetroot"],
  C: ["Carrot", "Cabbage", "Cauliflower", "Celery", "Cherry"],
  D: ["Date", "Durian", "Dragonfruit", "Dill", "Daikon"],
  E: ["Eggplant", "Endive", "Elderberry", "Escarole", "Edamame"],
  F: ["Fig", "Fennel", "Feijoa", "Finger Lime", "French Bean"],
  G: ["Grape", "Guava", "Gooseberry", "Ginger", "Garlic"],
  H: ["Honeydew", "Horseradish", "Huckleberry", "Hazelnut", "Herb"],
  I: ["Iceberg Lettuce", "Indian Fig", "Italian Plum", "Ivy Gourd", "Ilama"],
  J: [
    "Jackfruit",
    "Jalapeno",
    "Jicama",
    "Juniper Berry",
    "Jerusalem Artichoke",
  ],
};

const alphabet = Object.keys(dummyCategories);

const CategoryPopup = ({ show, handleClose, title }) => {
  // For scrolling to letter sections
  const sectionRefs = useRef({});
  // For search
  const [search, setSearch] = useState("");
  // For checkbox selection
  const [selected, setSelected] = useState([]);

  // Filtered categories based on search
  const filteredCategories = {};
  alphabet.forEach((letter) => {
    const cats = dummyCategories[letter].filter((cat) =>
      cat.toLowerCase().includes(search.toLowerCase())
    );
    if (cats.length > 0) filteredCategories[letter] = cats;
  });

  // Scroll to section
  const handleScrollTo = (letter) => {
    if (sectionRefs.current[letter]) {
      sectionRefs.current[letter].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle checkbox change
  const handleCheckbox = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="category-popup-modal"
    >
      {/* {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )} */}
      <Modal.Body>
        <div
          className="category-popup-body"
          style={{ maxHeight: 500, overflow: "auto" }}
        >
          <div className="category-popup-top-bar">
            {/* Search Bar */}
            <div>
              <Form.Control
                type="text"
                placeholder="Search Categories"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: 220 }}
                className="category-popup-search-bar"
              />
            </div>
            {/* Alphabet Navigation */}
            <div className="category-popup-alphabet-nav">
              {alphabet.map((letter) => (
                <span
                  key={letter}
                  style={{
                    cursor: filteredCategories[letter]
                      ? "pointer"
                      : "not-allowed",
                    color: filteredCategories[letter] ? "#1d1d1d" : "#ccc",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: 2,
                  }}
                  onClick={() =>
                    filteredCategories[letter] && handleScrollTo(letter)
                  }
                >
                  {letter}
                </span>
              ))}
            </div>
            <button onClick={handleClose} className="category-popup-close-btn">
              <Image src={closeBtn} alt="close" width={24} height={24} />
            </button>
          </div>
          <hr style={{ margin: "8px 0 16px 0" }} />
          {/* Categories Grid */}
          <div style={{ minWidth: 700, overflowX: "auto" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 32 }}>
              {alphabet.map((letter) =>
                filteredCategories[letter] ? (
                  <div
                    key={letter}
                    ref={(el) => (sectionRefs.current[letter] = el)}
                    style={{ minWidth: 140 }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>
                      {letter}
                    </div>
                    <div>
                      {filteredCategories[letter].map((cat) => (
                        <Form.Check
                          key={cat}
                          type="checkbox"
                          id={`cat-${cat}`}
                          label={cat}
                          checked={selected.includes(cat)}
                          onChange={() => handleCheckbox(cat)}
                          style={{ marginBottom: 6 }}
                        />
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default CategoryPopup;
