"use client";
import React, { useEffect, useState } from "react";
import useSearchProducts from "../hook/UseSearchProducts";
import { ProductsFilterComponent } from "../components/Products/ProductsFilterComponent";

const Page = () => {
  const filteredProducts = useSearchProducts("genero", "niña");

  return (
    <div className="py-20 min-h-screen">
      <ProductsFilterComponent
        productos={filteredProducts}
        pageQuery={"niña"}
      />
    </div>
  );
};

export default Page;
