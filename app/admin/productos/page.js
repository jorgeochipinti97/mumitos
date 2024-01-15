"use client";
import Sidebar from "@/app/components/Sidebar";
import usePaginacion from "@/app/hook/UsePagination";
import useProductos from "@/app/hook/UseProducts";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const productos = useProductos();
  const { currentItems, changePage, currentPage, pageCount } = usePaginacion(
    productos,
    10
  );

  const { push } = useRouter();
  const router = useRouter();
  const eliminarProducto = async (url) => {
    const response = await axios.delete(url);
    response.data.success && window.location.reload();
  };
  return (
    <div className="flex min-h-screen py-20 md:py-0">
      <Sidebar />
      <div className="flex-1">
        <div className="mt-10 ">
          <div className="flex w-full justify-center">
            <table className="m divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>

                  <th  className="  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Género
                  </th>
                  <th  className="  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th   className="  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Editar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eliminar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((producto, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.nombreproducto}
                    </td>

                    <td className=" px-6 py-4 whitespace-nowrap">
                      {producto.genero}
                    </td>
                    <td className=" px-6 py-4 whitespace-nowrap">
                      {producto.categoria}
                    </td>
                    <td className=" px-6 py-4 whitespace-nowrap">
                      ${producto.precio}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.imagesarray && producto.imagesarray[0] && (
                        <img
                          src={producto.imagesarray[0]}
                          alt={producto.nombreproducto}
                          className="h-20 w-20 rounded-xl"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-slate-200 text-white rounded-full p-2 hover:opacity-[0.5]"
                        onClick={() => push(`/admin/productos/${producto._id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-[20px]"
                        >
                          <g
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          >
                            <path d="M21.28 6.4l-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 113.64 3.65v0z"></path>
                            <path d="M11 4H6a4 4 0 00-4 4v10a4 4 0 004 4h11c2.21 0 3-1.8 3-4v-5"></path>
                          </g>
                        </svg>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-slate-200 text-white rounded-full p-2 hover:opacity-[0.5]"
                        onClick={() =>
                          eliminarProducto(`/api/productos/${producto._id}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-[20px]"
                        >
                          <g
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M4 7h16M6 7v11a3 3 0 003 3h6a3 3 0 003-3V7M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"></path>
                          </g>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className="bg-black mx-2 px-2 mt-10 rounded-full text-2xl text-white"
                onClick={() => changePage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
