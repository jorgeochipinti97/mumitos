"use client";
import { CartProvider } from "@/context/cart/CartProvider";
import React from "react";


export function Providers({ children }) {
  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
}
