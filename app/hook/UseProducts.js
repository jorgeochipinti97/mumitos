import { useState, useEffect } from "react";

const useProductos = (id) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const url = id ? `/api/productos/${id}` : "/api/productos"; // URL dependiendo del ID
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error al cargar los productos");
        const datos = await respuesta.json();
        setProductos(id ? [datos] : datos.data || []);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    })();
  }, [id]);

  return productos;
};

export default useProductos;
