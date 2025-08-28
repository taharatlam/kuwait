import React from "react";
import Link from "next/link";

const Breadcrumb = ({ data }) => {
  return (
    <ul className="breadcrumb">
      {data.map((item, index) => (
        <li key={index}>
          <Link href={item.url}>{item.name}</Link>
          {index !== data.length - 1 && <span> / </span>}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
