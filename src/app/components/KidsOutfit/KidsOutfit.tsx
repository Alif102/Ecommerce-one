'use client';

import { useState } from 'react';
import { Button, Rate } from 'antd';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import k1 from '../../../../public/assets/k1.webp'
import k2 from '../../../../public/assets/k2.webp'
import k4 from '../../../../public/assets/k4.webp'
import k3 from '../../../../public/assets/k3.webp'


const categories = [
  'Best Selling Product',
  "Children's Outfit",
  "Girl's Floral Dress",
  'Kids Winter Wear',
];

const products = [
  {
    id: 1,
    name: 'Autumn Girl Dress',
    price: 16.99,
    image: k1,
    colors: ['#0077ff', '#ff0000', '#008000', '#800080'],
  },
  {
    id: 2,
    name: 'Sweatshirt Set',
    price: 6.99,
    image: k2,
    colors: ['#0077ff', '#ff0000', '#800080', '#ffcc00'],
  },
  {
    id: 3,
    name: 'Seersucker Dress',
    price: 22.99,
    image:k1,
    colors: ['#00cccc', '#ffcc00', '#ffffff'],
  },
  {
    id: 4,
    name: 'Raglan Sweater',
    price: 48.99,
    image: k4,
    colors: ['#800080', '#8b0000', '#008000'],
  },
  {
    id: 5,
    name: 'Raglan Sweater',
    price: 48.99,
    image: k2,
    colors: ['#800080', '#8b0000', '#008000'],
  },
  {
    id: 6,
    name: 'Raglan Sweater',
    price: 48.99,
    image: k1,
    colors: ['#800080', '#8b0000', '#008000'],
  },
  {
    id: 7,
    name: 'Raglan Sweater',
    price: 48.99,
    image: k3,
    colors: ['#800080', '#8b0000', '#008000'],
  },
  {
    id: 8,
    name: 'Girls Knee-Length Dress',
    price: 48.99,
    image: k1,
    colors: ['#800080', '#8b0000', '#008000'],
  },
];

export default function KidsOutfit() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Popular Fashion Designs For Children</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto my-4">
        MyShop features a massive collection of stylish and colorful designs. Our products have been made according to the latest fashion trends.
      </p>

      <div className="flex justify-center gap-4 my-6">
        {categories.map((category) => (
          <Button
            key={category}
            type={selectedCategory === category ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
       <div key={product.id} className="shadow-[0_0px_4px_rgba(0,_0,_0,_0.2)] bg-white  rounded-lg  ">
       <div className="overflow-hidden">
         <Image
           src={product.image}
           alt={product.name}
           width={200}
           height={250}
           className="mx-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
         />
       </div>
       <div className="flex justify-between px-4 items-center mt-2">
         <Rate disabled defaultValue={0} className="text-gray-400" />
         <span className="text-gray-400">(0)</span>
       </div>
       <h3 className="text-lg font-semibold px-4 mt-2">{product.name}</h3>
       <div className=' flex justify-between items-center gap-2 mb-3'>
       <p className="text-gray-700 px-4">${product.price.toFixed(2)}</p>
       <div className="flex px-4 gap-2">
         {product.colors.map((color, index) => (
           <span
             key={index}
             className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:opacity-75"
             style={{ backgroundColor: color }}
           ></span>
         ))}
       </div>
       </div>
      
     </div>
     
        ))}
      </div>
    </div>
  );
}
