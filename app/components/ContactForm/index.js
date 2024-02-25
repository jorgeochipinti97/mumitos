"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export const ContactForm = () => {
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCelularChange = (e) => {
    setCelular(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRendered) {
      try {
        await axios.post("/api/contacto", { nombre, celular, email });
        alert("Envio exitoso");
      } catch (error) {
console.log(error)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[80%]">
      <div className="input-container">
        <input
          className=" input-field"
          type="text"
          id="nombre"
          value={nombre}
          onChange={handleNombreChange}
          placeholder="Nombre Completo"
        />
        <label for="input-field" className="input-label">
          Número de Celular
        </label>
        <span className="input-highlight"></span>
      </div>

      <div className="input-container">
        <input
          className=" input-field"
          placeholder="Celular"
          type="tel"
          id="celular"
          value={celular}
          onChange={handleCelularChange}
        />
        <label for="input-field" className="input-label">
          celular
        </label>
        <span className="input-highlight"></span>
      </div>

      <div className="input-container">
        <input
          className=" input-field"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Correo Electrónico"
        />
        <label for="input-field" className="input-label">
          Correo Electrónico
        </label>
        <span className="input-highlight"></span>
      </div>

      <div className="flex justify-center my-5">
        <button type="submit" className="btn">
          Enviar
        </button>
      </div>
    </form>
  );
};
