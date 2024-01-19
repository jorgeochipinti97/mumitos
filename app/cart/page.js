"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/cart/CartContext";
import { formatPriceToUSD } from "@/utils/format";

const Page = () => {
  const { cart, numberOfItems, total, removeCartProduct } =
    useContext(CartContext);
  const { push } = useRouter();


  const createMessage = (productos) => {
    const mensajeAmigable = "Hola, estos son los productos que estaba buscando:";
    const mensajeDeProductos = productos.map(producto => {
      return `${producto.titulo} talle: ${producto.size} - Precio: ${producto.precio} - Cantidad: ${producto.quantity}`;
    }).join("\n");

    return `${mensajeAmigable}\n\n${mensajeDeProductos}`;
  };

  const createWhatsAppLink = (message) => {
    const whatsappNumber = "541142841212"; // Tu número de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  const message = createMessage(cart);
  const whatsappLink = createWhatsAppLink(message);







  
  return (
    <>
      <div
        className="primero mx-auto px-2  bg-white flex items-center justify-start pt-36 flex-col"
        style={{
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <div
          className="flex justify-center my-2 flex-col items-center"
          style={{ display: numberOfItems == 0 ? "flex" : "none" }}
        >
          <svg
            width="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="w-screen flex justify-center">

            <div>
                <button onClick={()=> push('/')} className="bg-black text-white px-2 py-2 rounded-xl mt-20">Seguir comprando</button>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col mt-8 max-w-7xl"
          style={{ display: numberOfItems > 0 ? "flex" : "none" }}
        >
          <div className="-my-2  sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:lg:px-6 px-2 lg:px-8">
              <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className=" max-w-full lg:w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="lg:px-6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                       Producto
                      </th>
                      <th
                        className="lg:px-6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Precio
                      </th>
                      <th
                        className="lg:px-6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Talle
                      </th>
                      <th
                        className="lg:px-6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        <div className="flex justify-center my-2">Cantidad</div>
                      </th>
                      <th
                        className="lg:px-6 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cart &&
                      cart.map((e) => (
                        <tr key={e.slug}>
                          <td className="lg:px-6 px-2 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                <img src={e.image} className="w-10 lg:w-20" alt="" />
                              </div>
                            </div>
                          </td>
                          <td className="lg:px-6 px-2 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-900">
                              {formatPriceToUSD(e.precio)}
                            </p>
                          </td>
                          <td className="lg:px-6 px-2 py-4 whitespace-nowrap">
                            <p className="text-sm text-center font-medium text-gray-900">
                              {e.size}
                            </p>
                          </td>
                          <td className="lg:px-6 px-2 py-4 whitespace-nowrap ">
                            <p className="text-center text-slate-950">
                              {e.quantity}
                            </p>
                          </td>
                          <td className=" whitespace-nowrap ">
                            <div className="w-full flex justify-center">
                              <div>
                                <button
                                  className=" rounded-lg text-slate-950 focus:border-900"
                                  onClick={() => removeCartProduct(e)}
                                >
                                  <span className="flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="white"
                                      height={'40'}
                                      width={'40'}
                                      className="lgw-11  p-2 bg-red-500 rounded-lg text-slate-950 focus:border-900 "
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M14.1 8.5L12 6.4L9.9 8.5L8.5 7.1L10.6 5L8.5 2.9L9.9 1.5L12 3.6L14.1 1.5L15.5 2.9L13.4 5L15.5 7.1L14.1 8.5M7 18C8.1 18 9 18.9 9 20S8.1 22 7 22 5 21.1 5 20 5.9 18 7 18M17 18C18.1 18 19 18.9 19 20S18.1 22 17 22 15 21.1 15 20 15.9 18 17 18M7.2 14.8C7.2 14.9 7.3 15 7.4 15H19V17H7C5.9 17 5 16.1 5 15C5 14.6 5.1 14.3 5.2 14L6.5 11.6L3 4H1V2H4.3L8.6 11H15.6L19.5 4L21.2 5L17.3 12C17 12.6 16.3 13 15.6 13H8.1L7.2 14.6V14.8Z" />
                                    </svg>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-8 flex justify-end  w-72"
          style={{ display: numberOfItems > 0 ? "flex" : "none" }}
        >
          <div className="w-full max-w-sm">
            <div className="bg-white shadow-lg overflow-hidden sm:rounded-md">
              <h2 className="px-4 py-3 text-lg font-medium text-gray-900 bg-gray-50">
                Resumen
              </h2>
              <ul className="px-4 py-3 text-sm text-gray-600 divide-y divide-gray-200">
                {/* <li className="flex justify-between py-0.5">
                <div className="text-sm text-gray-600">Shipping</div>
                <div className="text-sm font-medium text-gray-900">$2.00</div>
              </li> */}

                <li className="flex justify-between py-0.5">
                  <div className="text-sm font-medium text-gray-600">Total</div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatPriceToUSD(total)}
                  </div>
                </li>
              </ul>
              <div className="flex justify-center my-2">
                <button
                  className="lg bg-sky-500 px-3 py-1 rounded-lg text-slate-50 focus:border-900 text-2xl"
                  onClick={() => push(`${whatsappLink}`)}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
