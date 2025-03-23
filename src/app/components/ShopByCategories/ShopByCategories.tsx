"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel as AntCarousel } from "antd";
import Link from "next/link";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

interface Category {
  name: string;
  image: string;
}

const ShopByCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    AOS.init({ duration: 3000, once: false }); // Initialize AOS

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/ProductData.json");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full py-10 px-5">
      <h2
        className="text-2xl font-bold mb-10 text-center"
        data-aos="fade-up"
      >
        Shop By Categories
      </h2>

      <div className="w-full md:w-3/4 mx-auto">
        <AntCarousel autoplay dots slidesToShow={4} arrows>
          {categories.map((category, index) => (
            <div key={index} data-aos="zoom-in-up">
              <Link href={`/categories/${category.name.toLowerCase()}`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="rounded-t-full hover:rounded-t-2xl px-4 object-cover transition-all duration-200 cursor-pointer ease-in-out transform"
                />
                <p className="flex justify-center mr-10 mt-5 font-semibold text-lg cursor-pointer">
                  {category.name}
                </p>
              </Link>
            </div>
          ))}
        </AntCarousel>
      </div>
    </div>
  );
};

export default ShopByCategories;
