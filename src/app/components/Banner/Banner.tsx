"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import banner from "../../../../public/assets/bnr.jpg";
import banner2 from "../../../../public/assets/bnr2.jpg";
import left1 from '../../../../public/assets/left1.png'
import right from '../../../../public/assets/right1.png'
const images = [banner2, banner]; // Array of images

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Images */}
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image src={img} alt={`Banner ${index + 1}`} className="w-full h-auto" priority />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2  bg-white hover:bg-yellow-300  p-2 rounded-full ">
          <Image
                         src = {left1}
                         alt='arrow'
                       
                       />
      </button>

      {/* Right Button */}
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2  hover:bg-yellow-300 bg-white p-2 rounded-full ">
      <Image
                         src = {right}
                         alt='arrow'
                       
                       />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span key={index} className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
