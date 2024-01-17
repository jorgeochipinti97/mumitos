
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import React from "react";

export const SliderFlip = ({ images }) => {
  return (
    <>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}

        modules={[EffectFlip, Pagination]}
        className="mySwiper"
      >
        {images.map((e) => (
          <SwiperSlide key={e} className="h-1/6">
            <div className="md:h-fit ">
            <img src={e} className="max-h-[300px]"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
