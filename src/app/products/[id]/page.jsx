"use client";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import MainProductInner from "@/views/products/MainProductInner";
import TextSignProduct from "@/views/products/TextSignProduct";
import api from "@/helpers/api";
import SimpleProduct from "@/views/products/SimpleProduct";

const Page = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const isTextProduct = pathname.includes("/text");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await api.get(`/product/${id}`);
      setProduct(response.data.data);
    };
    getProduct();
  }, [id]);

  return (
    <>
      {isTextProduct ? (
        <TextSignProduct />
      ) : (
        <>
          <SimpleProduct data={product} productSlug={id} />
          {/* <MainProductInner data={product} /> */}
        </>
      )}
    </>
  );
};

export default Page;
