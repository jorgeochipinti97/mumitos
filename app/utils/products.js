

export const searchProducts = (query, filter, productos) => {
    const data = productos.filter((e) => e[query] == filter);
    query == "todos" ? setProductsFilter(allProducts) : setProductsFilter(data);
  };
