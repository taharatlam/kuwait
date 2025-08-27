import React from "react";
import TextSignProduct from "@/views/products/TextSignProduct";
const Page = ({ params }) => {
  return <TextSignProduct id={params.id} />;
};

export default Page;
