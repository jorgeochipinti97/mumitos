import { useState, useEffect, useMemo } from 'react';

const usePaginacion = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemsPerPage]);

  useEffect(() => {
    // Calcula el índice de los elementos a mostrar
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(items.slice(startIndex, endIndex));
  }, [currentPage, items, itemsPerPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return { currentItems, changePage, currentPage, pageCount };
};

export default usePaginacion;
