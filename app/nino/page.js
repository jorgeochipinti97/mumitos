"use client";
import React, { useEffect, useState } from "react";
import useSearchProducts from "../hook/UseSearchProducts";
import { ProductsFilterComponent } from "../components/Products/ProductsFilterComponent";

const Page = () => {
  const filteredProducts = useSearchProducts("genero", "niño");

  return (
    <div className="pt-20">
      <ProductsFilterComponent
        productos={filteredProducts}
        pageQuery={"niño"}
      />
    </div>
  );
};

export default Page;
