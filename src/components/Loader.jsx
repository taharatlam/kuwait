import React from "react";

const Loader = ({ color = "primary" }) => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "24px" }}
  >
    <div
      className={`spinner-border text-${color}`}
      role="status"
      style={{ width: "1.5rem", height: "1.5rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
