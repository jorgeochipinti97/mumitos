"use client";
import { searchProducts } from "@/app/utils/products";
import React, { useEffect, useState } from "react";
import { CardProduct } from "../../Cards/CardProduct";
import { usePathname, useRouter } from "next/navigation";

export const ProductsFilterComponent = ({ productos, pageQuery }) => {
  const [products, setProducts] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const categories = [
    "todos",
    "Bodies y enteritos",
    "Buzos y sweaters",
    "Calzado",
    "Camperas",
    "Camperas y chalecos",
    "Pantalones",
    "Pantalones y enteritos",
    "Pantalones y leggins",
    "Pijamas",
    "Remeras blusas y bodies",
    "Remeras y blusas",
    "Remeras y bodies",
    "Ropa interior",
    "Trajes de bano",
    "Trajes de baño",
    "Vestidos y polleras",
  ];

  useEffect(() => {
    productos && setProducts(productos);
    productos && filterCategories(productos);
  }, [productos]);

  useEffect(() => {
    const newFilteredProducts = productos.filter(
      (e) => e.categoria.toLowerCase() == selectedCategory.toLowerCase()
    );
    selectedCategory == "todos"
      ? setProducts(productos)
      : setProducts(newFilteredProducts);
  }, [selectedCategory]);

  const filterCategories = () => {
    const filteredCategories = categories.filter((category) =>
      productos.some(
        (product) =>
          product.genero === pageQuery &&
          product.categoria.toLowerCase() === category.toLowerCase()
      )
    );
    setVisibleCategories(filteredCategories);
  };

  return (
    <div>
      <div>
        <div className="">
          <div
            className="flex w-screen justify-center"
            style={{ display: pageQuery == "accesorio" ? "none" : "auto" }}
          >
            <div className="flex flex-wrap justify-center w-10/12 mb-10 md:mb-0 md:w-6/12">
              {productos && productos.length > 0 && (
                <div
                  className="my-2"
                  onClick={() => {
                    setSelectedCategory("todos");
                  }}
                >
                  <span
                    className={
                      "todos" == selectedCategory
                        ? "text-white bg-black transition-all duration-500 text-xs text-center border-2 border-black mx-2 py-2 rounded-xl px-2 cursor-pointer"
                        : "text-black text-xs text-center border-2 border-black mx-2 rounded-xl p-2 cursor-pointer"
                    }
                  >
                    Todos
                  </span>
                </div>
              )}
              {visibleCategories.map((category) => (
                <div
                  key={category}
                  className="my-2"
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                >
                  <span
                    className={
                      category == selectedCategory
                        ? "text-white bg-black transition-all duration-500 text-xs text-center border-2 border-black mx-2 rounded-xl p-2 cursor-pointer"
                        : "text-black text-xs text-center border-2 border-black mx-2 rounded-xl p-2 cursor-pointer"
                    }
                  >
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-screen">
            <div className="w-11/12 md:w-9/12 grid grid-cols-1 md:grid-cols-3">
              {products.map((e) => (
                <div key={e.nombreproducto}>

                <CardProduct
                  name={e.nombreproducto}
                  price={e.precio}
                  img={e.imagesarray[0]}
                  id={e._id}
                />
            </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
