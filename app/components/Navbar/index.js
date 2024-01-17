"use client";
import React, { useContext, useEffect } from "react";
import { MenuComponent } from "../Menu";
import { usePathname } from "next/navigation";
import { CartContext } from "@/context/cart/CartContext";
import Link from "next/link";

export const Navbar = () => {
  const { numberOfItems, cart } = useContext(CartContext);

  const pathname = usePathname();

  return (
    <>
      <div
        class="bottom-0 w-full fixed z-50 h-fit py-2 md:hidden bg-black text-white text-xs rounded-t-lg"
        style={{ display: pathname.includes("admin") ? "none" : "auto" }}
      >
        <ul className="flex">
          <li class="">
            <a
              href="/nino"
              class="flex items-center justify-center w-full px-4 py-3 "
            >
              <span>Niño</span>
            </a>
          </li>
          <li class="">
            <a
              href="/nina"
              class="flex items-center justify-center w-full px-4 py-3 "
            >
              <span>Niña</span>
            </a>
          </li>
          <li class="">
            <a
              href="/bebes"
              class="flex items-center justify-center w-full px-4 py-3 "
            >
              <span>Bebés</span>
            </a>
          </li>
          <li class="">
            <a
              href="/accesorios"
              class="flex items-center justify-center w-full px-4 py-3 "
            >
              <span>Accesorios</span>
            </a>
          </li>
          <li class="">
            <a
              href="/noestacional"
              class="flex items-center justify-center w-full px-4 py-3 "
            >
              <span className="te">Liquidación</span>
            </a>
          </li>
        </ul>
      </div>
      <nav
        className="w-screen fixed flex h-fit z-50 "
        style={{
          backdropFilter: "blur(4px)",
          display: pathname.includes("admin") ? "none" : "auto",
        }}
      >
        <a href="/" >
          <img
            src="/logocheeky.png"
            alt=""
            className="w-[160px] absolute top-0  left-2"
          />
        </a>
        <div className="flex-1" />
        <MenuComponent />
        <div className="flex-1" />
        <div className="flex items-center">
          <div className="cursor-pointer hover:opacity-[0.6] bg-white rounded-full items-center mr-5 md:mt-0 mt-2">
            <Link href={"/cart"}>
              <div className="absolute bg-black text-white rounded-full px-2 md:bottom-9 bottom-6 right-10">
                {numberOfItems}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-bag"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
