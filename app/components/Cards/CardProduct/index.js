"use client";
import { CartContext } from "@/context/cart/CartContext";
import { formatPriceToUSD } from "@/utils/format";
import gsap, { Power1 } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export const CardProduct = ({ name, id, price, img, descuento }) => {
  const { push } = useRouter();
  const precioConDescuento = descuento
    ? price - (price * descuento) / 100
    : price;

  const createWhatsAppLink = (name, price) => {
    const message = `Hola, estoy interesado en comprar el producto: ${name} a ${formatPriceToUSD(
      price
    )}`;
    // Asegúrate de reemplazar [tu_numero] con tu número de teléfono real
    const whatsappUrl = `https://wa.me/541142841212?text=${encodeURIComponent(
      message
    )}`;
    return whatsappUrl;
  };

  useEffect(() => {
    gsap.to(".cardProduct", {
      opacity: 1,
      ease: Power1.easeIn,
      delay: 1,
    });
  }, []);

  return (
    <div
      className=" rounded-xl  mx-5 my-3 w-full cursor-pointer cardProduct"
      style={{ opacity: 0 }}
    >
      <Link href={`/productos/${id}`}>
        <div>
          <img src={img} className="rounded-3xl " />
          {descuento && descuento > 0 && (
            <p className="ml-2 relative capitalize bottom-8 bg-white/80 w-fit font-bold text-xs text-green-600 border-2 border-green-600 rounded-xl px-1 py-1 ">
              {descuento}% OFF
            </p>
          )}
        </div>

        <p className="font-semibold text-md  ml-2 font-mono">{name}</p>
        <div className="font-light text-md ml-2 font-geist my-2 ">
          {descuento && descuento > 0 ? (
            <div className="flex items-center justify-start">
              <span className="line-through opacity-50">
                {formatPriceToUSD(price)}
              </span>
              <span className="ml-2">
                {formatPriceToUSD(precioConDescuento)}
              </span>
            </div>
          ) : (
            <span>{formatPriceToUSD(price)}</span>
          )}
        </div>
      </Link>
      <div className="flex justify-around">
        <button
          className="button2 font-semibold mt-2 font-geist text-xs px-1 py-2"
          onClick={() => push(`/productos/${id}`)}
        >
          Ver más
        </button>
        <a href={createWhatsAppLink(name, precioConDescuento)} target="_blank">
          <button className="button2 font-semibold mt-2 font-geist text-xs px-1 py-2">
            Comprar ya
          </button>
        </a>
      </div>
    </div>
  );
};
