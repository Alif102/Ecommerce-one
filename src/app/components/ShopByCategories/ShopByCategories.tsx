'use client';

import Image from 'next/image';
import { Carousel as AntCarousel } from 'antd';
import c1 from '../../../../public/assets/c1.png';
import c2 from '../../../../public/assets/c2.png';
import c3 from '../../../../public/assets/c3.png';
import c4 from '../../../../public/assets/c4.png';
import c5 from '../../../../public/assets/c5.png';
import c6 from '../../../../public/assets/c6.png';
import c7 from '../../../../public/assets/c7.png';
import Link from 'next/link'; // Import Link for navigation

// Array of categories
const categories = [
  { name: 'Shoes', image: c1 },
  { name: 'Tops', image: c2 },
  { name: 'Jewelries', image: c3 },
  { name: 'Shirt', image: c4 },
  { name: 'Watch', image: c2 },
  { name: 'Bags', image: c5 },
  { name: 'Gown', image: c6 },
  { name: 'Sunglasses', image: c7 },
];

const ShopByCategories = () => {
  return (
    <div className="w-full py-10 px-5">
      <h2 className="text-2xl font-bold mb-5 text-center">Shop By Categories</h2>
      
      <div className="w-full md:w-3/4 mx-auto">
        <AntCarousel autoplay={true} dots={true} slidesToShow={4} arrows>
          {categories.map((category, index) => (
            <div key={index}>
               <Link href={`/categories/${category.name.toLowerCase()}`}>
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="rounded-t-full hover:rounded-t-lg px-4 object-cover transition-all duration-500 cursor-pointer ease-in-out transform hover:scale-y-105"
              />
              {/* Wrap category name with Link for dynamic routing */}
             
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
