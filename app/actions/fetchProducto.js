// actions/fetchProducto.js
"use server";

import axios from 'axios';

async function fetchProducto(id) {
  try {
    const res = await axios.get(`http://localhost:3000/api/productos/${id}`);
    return res.data;
  } catch (error) {
    // Manejar el error
    console.error(error);
    throw new Error('Error al obtener el producto');
  }
}

export default fetchProducto;
