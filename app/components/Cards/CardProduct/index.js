"use client";
import { CartContext } from "@/context/cart/CartContext";
import { formatPriceToUSD } from "@/utils/format";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export const CardProduct = ({ name,id, price, img }) => {
const {push} = useRouter()



  const createWhatsAppLink = (name, price) => {
    const message = `Hola, estoy interesado en comprar el producto: ${name} a ${formatPriceToUSD(
      price
    )}`;
    // Asegúrate de reemplazar [tu_numero] con tu número de teléfono real
    const whatsappUrl = `https://wa.me/1142841212?text=${encodeURIComponent(
      message
    )}`;
    return whatsappUrl;
  };



  return (
    <div className=" rounded-xl h-fit mx-5 w-full cursor-pointer">
      <div className="">
        <img src={img} className="rounded-3xl" />
      </div>
      <p className="font-semibold text-xl mt-2 ml-2 font-mono">{name}</p>
      <p className="font-light text-md ml-2 font-geist">
        {formatPriceToUSD(price)}
      </p>
      <div className="flex justify-around">
        <button
          className="button2 font-semibold mt-2 font-geist text-xs px-1 py-2"

          onClick={()=> push(`/productos/${id}`)}
        >
          Ver más
        </button>
        <a href={createWhatsAppLink(name, price)} target="_blank">
          <button className="button2 font-semibold mt-2 font-geist text-xs px-1 py-2">
            Comprar ya
          </button>
        </a>
      </div>
    </div>
  );
};
