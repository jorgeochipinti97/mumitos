"use client";
import React, { useEffect, useState } from "react";
import useSearchProducts from "../hook/UseSearchProducts";
import { ProductsFilterComponent } from "../components/Products/ProductsFilterComponent";

const Page = () => {
  const filteredProducts = useSearchProducts("genero", "colegiales");

  return (
    <div className="py-20 min-h-screen">
      <ProductsFilterComponent
        productos={filteredProducts}
        pageQuery={"colegiales"}
      />
    </div>
  );
};

export default Page;
