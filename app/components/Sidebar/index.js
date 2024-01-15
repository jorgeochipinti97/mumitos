'use client'
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
       <div
        class="bottom-0 w-full fixed z-50 h-fit flex justify-center py-2 md:hidden bg-black text-white text-xs rounded-t-lg"
        style={{ display: pathname.includes("admin") ? "auto" : "none" }}
      >
        <ul className="flex">
          <li class="">
            <a
              href="/admin"
              class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>Inicio</span>
            </a>
          </li>
          <li class="">
            <a
              href="/admin/productos"
              class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>Productos</span>
            </a>
          </li>
          <li class="">
            <a
              href="/admin/productos/nuevo"
              class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>Crear Producto</span>
            </a>
          </li>
          <li class="">
            <a
              href="/admin/consultas"
              class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>Consultas</span>
            </a>
          </li>

        </ul>
      </div>
    <div className="h w-64 mr-5 md:block hidden">
      <div className="h-full w-64 bg-gray-800 text-white fixed ">
        <div className="flex items-center justify-center h-16 shadow-md">
          <h1 className="text-xl font-semibold">Momitos</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <a
              href="/admin"
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <span>Inicio</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/productos"
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <span>Productos</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/productos/nuevo"
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <span>Crear nuevo producto</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/consultas"
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <span>Contactos</span>
            </a>
          </li>

        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
