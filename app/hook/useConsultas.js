import axios from "axios";
import { useState, useEffect } from "react";

const useConsulta = (id) => {
  const [consultas, setconsultas] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const respuesta = await axios.get("/api/contacto");
        setconsultas(respuesta.data.data);
      } catch (err) {
        console.error("Error al cargar consultas:", err);
      }
    })();
  }, [id]);

  return consultas;
};

export default useConsulta;
