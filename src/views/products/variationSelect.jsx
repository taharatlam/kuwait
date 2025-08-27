"use client";
import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";

/**
 * variationSelect dynamically renders select inputs for all unique attributes
 * found in the Pricing array of the data prop.
 *
 * Example data prop:
 * {
 *   Pricing: [
 *     { id: 1, saleprice: "280.00", attributes: { Size: "150 x 150 MM", Material: "Fiber" } },
 *     { id: 2, saleprice: "400.00", attributes: { Size: "150 x 150 MM", Material: "Metal" } }
 *   ]
 * }
 */
const VariationSelect = ({ data, onChange, setSelectedVariation }) => {
  // Extract all unique attribute keys and their possible values
  const attributeOptions = useMemo(() => {
    const options = {};
    if (data?.Pricing?.length) {
      data.Pricing.forEach((pricing) => {
        if (pricing.attributes) {
          Object.entries(pricing.attributes).forEach(([key, value]) => {
            if (!options[key]) options[key] = new Set();
            options[key].add(value);
          });
        }
      });
    }
    // Convert sets to arrays of { value, label }
    return Object.fromEntries(
      Object.entries(options).map(([key, values]) => [
        key,
        Array.from(values).map((v) => ({ value: v, label: v })),
      ])
    );
  }, [data]);

  // Find the first valid combination from Pricing
  const firstCombination = useMemo(() => {
    if (!data?.Pricing?.length) return {};
    const first = data.Pricing[0];
    if (!first?.attributes) return {};
    const attrs = {};
    Object.entries(first.attributes).forEach(([key, value]) => {
      // Find the matching option object for this value
      const option = (attributeOptions[key] || []).find(
        (opt) => opt.value === value
      );
      if (option) {
        attrs[key] = option;
      }
    });
    return attrs;
  }, [data, attributeOptions]);

  // State for each attribute selection
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Find the matching pricing based on selected attributes
  const matchingPricing = useMemo(() => {
    if (!data?.Pricing?.length) return null;
    return data.Pricing.find((pricing) => {
      if (!pricing.attributes) return false;
      return Object.entries(selectedAttributes).every(
        ([attr, selected]) => pricing.attributes[attr] === selected?.value
      );
    });
  }, [data, selectedAttributes]);

  // Pre-select the first combination on mount or when data changes
  useEffect(() => {
    if (
      Object.keys(attributeOptions).length > 0 &&
      Object.keys(firstCombination).length > 0
    ) {
      setSelectedAttributes(firstCombination);
      // Optionally call onChange with the initial selection and matching pricing
      if (onChange) {
        // Find the matching pricing for the first combination
        const matching = data?.Pricing?.find((pricing) => {
          if (!pricing.attributes) return false;
          return Object.entries(firstCombination).every(
            ([attr, selected]) => pricing.attributes[attr] === selected?.value
          );
        });
        onChange(firstCombination, matching);
      }
      // Set the selected variation as the combination object + pricing info
      if (setSelectedVariation) {
        const matching = data?.Pricing?.find((pricing) => {
          if (!pricing.attributes) return false;
          return Object.entries(firstCombination).every(
            ([attr, selected]) => pricing.attributes[attr] === selected?.value
          );
        });

        setSelectedVariation({
          value: matching,
          attributes: firstCombination,
          saleprice: matching?.saleprice,
          regularprice: matching?.regularprice,
          id: matching?.id,
          ...matching,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, attributeOptions, firstCombination]);

  // Whenever selectedAttributes changes, update setSelectedVariation
  useEffect(() => {
    if (setSelectedVariation) {
      const matching = data?.Pricing?.find((pricing) => {
        if (!pricing.attributes) return false;
        return Object.entries(selectedAttributes).every(
          ([attr, selected]) => pricing.attributes[attr] === selected?.value
        );
      });
      setSelectedVariation(
        matching
          ? {
              value: matching,
              attributes: selectedAttributes,
              saleprice: matching.saleprice,
              regularprice: matching.regularprice,
              id: matching.id,
              ...matching,
            }
          : null
      );
    }
  }, [selectedAttributes, setSelectedVariation, data]);

  // Handle attribute select change
  const handleAttributeChange = (attr, selectedOption) => {
    setSelectedAttributes((prev) => {
      const updated = { ...prev, [attr]: selectedOption };
      if (onChange) {
        // Find the matching pricing for the updated selection
        const matching = data?.Pricing?.find((pricing) => {
          if (!pricing.attributes) return false;
          return Object.entries(updated).every(
            ([a, sel]) => pricing.attributes[a] === sel?.value
          );
        });
        onChange(updated, matching);
      }
      // setSelectedVariation will be triggered by useEffect above
      return updated;
    });
  };

  return (
    <div className="variation-selection-container">
      {Object.entries(attributeOptions).map(([attr, options]) => (
        <div
          className="variation-attribute-selector"
          key={attr}
          style={{ marginTop: 12 }}
        >
          <label className="mb-2 label-text">{`Select ${attr}:`}</label>
          <Select
            value={selectedAttributes[attr] || null}
            onChange={(option) => handleAttributeChange(attr, option)}
            options={options}
            placeholder={`Select ${attr}...`}
            isClearable
          />
        </div>
      ))}
      {matchingPricing && (
        <div
          className="variation-price-info"
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          <span>
            {/* <strong>Price:</strong>{" "} */}
            <span
              style={{ color: "#178a5a", fontWeight: 700, fontSize: "1.5rem" }}
            >
              ₹{parseFloat(matchingPricing.saleprice).toLocaleString("en-IN")}
            </span>
            {matchingPricing.regularprice && (
              <span
                style={{
                  marginLeft: 8,
                  textDecoration: "line-through",
                  color: "#888",
                  fontSize: "1.2rem",
                }}
              >
                ₹
                {parseFloat(matchingPricing.regularprice).toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default VariationSelect;
