"use client";

import Sidebar from "@/app/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const Page = () => {
  const [selectedsizes, setselectedsizes] = useState([]);
  const [genero, setGenero] = useState("");
  const [categoria, setCategoria] = useState("");
  const [slug, setSlug] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombreproducto, setnombreproducto] = useState("");
  const [imagesarray, setimagesarray] = useState([]);
  const [descuento, setDescuento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { push } = useRouter();
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
    "Trajes de bano",
    "Trajes de baño",
    "Vestidos y polleras",
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
        "https://api.cloudinary.com/v1_1/dyjv8k20k/image/upload",
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

  const getNewSlug = (title) => {
    try {
      const newSlug =
        title
          .trim()
          .replaceAll(" ", "_")
          .replaceAll("'", "")
          .toLocaleLowerCase() || "";
      setSlug(newSlug);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDescuentoChange = (e) => {
    setDescuento(e.target.value);
  };
  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };

  const handlenombreproductoChange = (e) => {
    setnombreproducto(e.target.value);
    getNewSlug(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await crearProducto();
    } catch (err) {
      console.log(err);
    }
  };

  const crearProducto = async () => {
    try {
      const productoData = {
        nombreproducto: nombreproducto.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        genero: genero.toLowerCase(),
        categoria: genero == "accesorio" ? "pijamas" : categoria.toLowerCase(),
        precio: parseFloat(precio),
        selectedsizes: selectedsizes.map((size) => size.toLowerCase()),
        imagesarray: imagesarray,
        descuento: descuento ? parseFloat(descuento) : null,
        slug: slug,
      };

      const response = await axios.post("/api/productos", productoData);
      response.data.data._id &&
        push(`/admin/productos/${response.data.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex md:py-0 py-20">
      <Sidebar />
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
              <div key={index} className="image-container">
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
          </select>
          {genero != "accesorio" && (
            <>
              <select
                className="my-2 py-2 rounded-xl px-2"
                id="categoria"
                value={categoria}
                onChange={handleCategoriaChange}
                style={{}}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </>
          )}

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
            <button className="btn" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
