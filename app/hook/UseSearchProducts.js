import { useState, useEffect } from "react";
import useProductos from "./UseProducts";


const useSearchProducts = (query, filter) => {
  const allProducts = useProductos();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (query === "todos") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) => product[query] === filter);
      setFilteredProducts(filtered);
    }
  }, [allProducts, query, filter]);

  return filteredProducts;
};

export default useSearchProducts;
