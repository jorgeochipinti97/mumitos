"use client";
import Sidebar from "@/app/components/Sidebar";
import useProductos from "@/app/hook/UseProducts";
import axios from "axios";
// pages/productos/[id].js
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const Page = ({ params }) => {
  const [producto, setProducto] = useState();
  const getProduct = async () => {
    const data = await axios.get(`/api/productos/${params.id}`);
    setProducto(data.data.data);
  };

  useEffect(() => {
    params && getProduct();
  }, [params]);

  const [selectedsizes, setselectedsizes] = useState([]);
  const [genero, setGenero] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombreproducto, setnombreproducto] = useState("");
  const [imagesarray, setimagesarray] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [descuento, setDescuento] = useState("");

  useEffect(() => {
    producto && setimagesarray(producto.imagesarray);
    producto && setnombreproducto(producto.nombreproducto);
    producto && setGenero(producto.genero);
    producto && setDescripcion(producto.descripcion);
    producto && setCategoria(producto.categoria);
    producto && setDescuento(producto.descuento);

    producto && setselectedsizes(producto.selectedsizes);
    producto && setPrecio(producto.precio);
  }, [producto]);

  const categorias = [
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
    "Trajes de baño",
    "Vestidos y polleras",
    "Medias",
    "Jogging",
    "Remera",
    "Polera ",
    "Campera",
    "Buzo",
  ];
  const sizes = [
    "1",
    "2",
    "3",
    "4",
    "6",
    "8",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "10",
    "12",
    "14",
    "NB",
    "U",
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ];

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "AVIF", "WEBP"];
  const handleRemoveImage = (index) => {
    const newimagesarray = imagesarray.filter((_, i) => i !== index);
    setimagesarray(newimagesarray);
  };
  const handleScroll = (e) => {
    e.preventDefault(); // Esto previene el cambio del valor del input con el scroll
  };

  const handleSizeChange = (size) => {
    if (selectedsizes.includes(size)) {
      setselectedsizes(selectedsizes.filter((s) => s !== size));
    } else {
      setselectedsizes([...selectedsizes, size]);
    }
  };
  const handleFileChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/duptnofi0/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setimagesarray(imagesarray.concat(data.secure_url));
    } catch (er) {
      console.log(er);
    }
  };
  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };
  const handleDescuentoChange = (e) => {
    setDescuento(e.target.value);
  };
  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };

  const handlenombreproductoChange = (e) => {
    setnombreproducto(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await actualizarProducto();
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarProducto = async () => {
    try {
      const productoData = {
        nombreproducto: nombreproducto.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        genero: genero.toLowerCase(),
        categoria: categoria.toLowerCase(),
        precio: parseFloat(precio),
        selectedsizes: selectedsizes.map((size) => size.toLowerCase()),
        imagesarray: imagesarray,
        descuento: descuento ? parseFloat(descuento) : null,
      };

      const response = await axios.put(
        `/api/productos/${params.id}`,
        productoData
      );
      response.data.success && alert("producto modificado");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      {producto && (
        <div className="flex justify-center w-screen">
          <form
            className="pt-10 flex flex-col w-9/12 md:w-6/12"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center my-2">
              <FileUploader
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                maxSize={4}
              />
            </div>

            <div className="flex">
              {imagesarray.map((image, index) => (
                <div key={index} className="image-container m-2">
                  <img
                    src={image}
                    alt={`upload-${index}`}
                    className="w-[100px] h-[100px]"
                  />
                  <button onClick={() => handleRemoveImage(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <input
              className="my-2 py-2 rounded-xl px-2"
              type="text"
              id="nombreproducto"
              value={nombreproducto}
              onChange={handlenombreproductoChange}
              placeholder="Nombre del producto"
            />

            <textarea
              className="my-2 py-2 rounded-xl px-2"
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
              placeholder="Descripción del producto"
            ></textarea>

            <select
              id="genero"
              value={genero}
              onChange={handleGeneroChange}
              className="my-2 py-2 rounded-xl px-2"
            >
              <option value="">Selecciona un género</option>
              <option value="niño">Niño</option>
              <option value="niña">Niña</option>
              <option value="bebé">Bebé</option>
              <option value="accesorio">Accesorio</option>
              <option value="no estacional">Liquidación</option>
              <option value="colegiales">Colegiales</option>
            </select>

            <select
              className="my-2 py-2 rounded-xl px-2"
              id="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
            >
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex">
              <div className="flex w-12/12 flex-wrap">
                {sizes.map((size) => (
                  <div key={size} className="m-2">
                    <input
                      type="checkbox"
                      id={`size-${size}`}
                      className="hidden-checkbox"
                      value={size}
                      checked={selectedsizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    <label htmlFor={`size-${size}`} className="label-size">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <input
              className="my-2 py-2 rounded-xl px-2"
              type="number"
              id="precio"
              onWheel={handleScroll}
              value={precio}
              onChange={handlePrecioChange}
              placeholder="Precio"
            />
            <input
              className="my-2 py-2 rounded-xl px-2"
              type="number"
              id="descuento"
              value={descuento}
              onChange={handleDescuentoChange}
              placeholder="Porcentaje de descuento"
              min="0"
              max="100"
            />
            <div className="flex justify-center my-5">
              <button className="border-2 btn" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
