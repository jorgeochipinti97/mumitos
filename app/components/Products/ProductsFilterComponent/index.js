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

  const { push } = useRouter();
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
        <div className="pb-28 md:pb-28">
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
          <div className="w-screen flex justify-center">
            <div className="w-screen md:w-9/12   grid grid-cols-1 md:grid-cols-3">
              {products.map((e) => (
                <div key={e.nombreproducto} className="w-full  flex justify-center mt-10  ">
                  <CardProduct
                    name={e.nombreproducto}
                    price={e.precio}
                    img={e.imagesarray[0]}
                    id={e._id}
                    descuento={e.descuento}
                  />
                </div>
              ))}
            </div>
          </div>
              {productos.length == 0 && (
                <div className="flex flex-col items-center justify-center w-full ">
                  <p className="text-xl text-center">
                    No hay productos para mostrar
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className=" md:w-[300px] w-6/12"
                    viewBox="0 0 48 48"
                  >
                    <g fill="#333">
                      <path d="M18.883 4.697a1 1 0 011.414 0l3.591 3.59 3.581-3.58a1 1 0 111.414 1.414l-3.58 3.581 3.48 3.48a1 1 0 01-1.415 1.415l-3.48-3.48-3.49 3.49a1 1 0 01-1.414-1.415l3.49-3.49-3.59-3.59a1 1 0 010-1.415z"></path>
                      <path
                        fillRule="evenodd"
                        d="M23.86 15.051a1 1 0 01.632 0l14.778 4.926c.2.057.38.175.513.346l4.003 5.138a1 1 0 01-.204 1.426l-15.4 5.129-3.217-4.13a1 1 0 00-1.579.001l-3.2 4.122-15.444-5.151a1 1 0 01-.165-1.397l3.931-5.046a1 1 0 01.537-.426L23.86 15.05zm11.969 5.887L24.18 24.82l-11.652-3.884 11.648-3.882 11.653 3.884z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M28.144 34.137l11.847-3.946v6.572a3 3 0 01-2.052 2.846l-12.763 4.254V31.411l1.863 2.392c.26.334.703.468 1.105.334zM23.176 31.42v12.443l-12.763-4.254a3 3 0 01-2.051-2.846v-6.59l11.863 3.958a1 1 0 001.106-.336l1.845-2.376z"></path>
                    </g>
                  </svg>
                  <div>
                    <button
                      onClick={() => push("/")}
                      className="bg-black text-white px-2 py-2 rounded-xl mt-20"
                    >
                      Seguir comprando
                    </button>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};
