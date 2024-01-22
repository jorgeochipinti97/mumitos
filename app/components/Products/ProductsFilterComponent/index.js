"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardProduct } from "../../Cards/CardProduct";

export const ProductsFilterComponent = ({ productos, pageQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const { push } = useRouter();

  // Generar categorías visibles basadas en pageQuery
  useEffect(() => {
    const categoriesSet = new Set();
    productos.forEach((product) => {
      if (product.genero === pageQuery) {
        categoriesSet.add(product.categoria.toLowerCase());
      }
    });
    setVisibleCategories([...categoriesSet]);
  }, [productos, pageQuery]);

  // Filtrar productos basados en la categoría seleccionada
  useEffect(() => {
    if (selectedCategory.toLowerCase() === "todos") {
      setFilteredProducts(productos);
    } else {
      const newFilteredProducts = productos.filter(
        (product) => product.categoria.toLowerCase() === selectedCategory
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedCategory, productos]);

  return (
    <>
      <div className="pb-10">
        <div
          className="flex w-screen justify-center"
          style={{ display: pageQuery == "accesorio" ? "none" : "auto" }}
        >
          <div className="flex flex-wrap justify-center w-11/12   md:w-6/12">
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
                  setSelectedCategory(category.toLowerCase());
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
      </div>
      <div>
        <div className="w-screen flex justify-center">
          <div className="w-screen md:w-9/12 grid grid-cols-2 md:grid-cols-3">
            {filteredProducts && filteredProducts.map((product,index) => (
              <div
                key={index}
                className="w-full flex justify-center "
              >
                <CardProduct
                  name={product.nombreproducto}
                  price={product.precio}
                  img={product.imagesarray[0]}
                  id={product._id}
                  descuento={product.descuento}
                />
              </div>
            ))}
          </div>
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-xl text-center">No hay productos para mostrar</p>
            {/* SVG e iconos aquí */}
            <button
              onClick={() => push("/")}
              className="bg-black text-white px-2 py-2 rounded-xl mt-20"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};
