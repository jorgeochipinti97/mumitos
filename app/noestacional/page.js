"use client";
import React, { useEffect, useState } from "react";
import useSearchProducts from "../hook/UseSearchProducts";
import { ProductsFilterComponent } from "../components/Products/ProductsFilterComponent";

const Page = () => {
  const filteredProducts = useSearchProducts("genero", "no estacional");

  return (
    <div className="pt-20">
      <ProductsFilterComponent
        productos={filteredProducts}
        pageQuery={"no estacional"}
      />
    </div>
  );
};

export default Page;
