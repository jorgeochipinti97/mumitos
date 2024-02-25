import React from "react";
import Marquee from "react-fast-marquee";
import { CardProduct } from "../Cards/CardProduct";

export const MarqueeComponent = () => {
  return (
    <Marquee autoFill>
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
    </Marquee>
  );
};
