"use client";

import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import banner from "../../../../public/assets/bnr.jpg";
import banner2 from "../../../../public/assets/bnr2.jpg";

const Banner: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log("Current slide:", currentSlide);
  };

  return (
    <div className="w-full z-10 mx-auto">
      <Carousel autoplay afterChange={onChange} dots>
      <div>
          <Image src={banner2} alt="Banner 2" className="w-full h-auto" priority />
        </div>
        <div>
          <Image src={banner} alt="Banner 1" className="w-full h-auto" priority />
        </div>
        
      </Carousel>
    </div>
  );
};

export default Banner;
