'use client';

import React, { useState } from 'react';
import { Button, Rate } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import f1 from '../../../../public/assets/f1.jpg';
import f2 from '../../../../public/assets/f2.jpg';
import f4 from '../../../../public/assets/f4.jpg';
import f3 from '../../../../public/assets/f3.jpg';

const products = [
  {
    id: 1,
    name: 'Classic Navy Slim Fit Blazer',
    price: 300,
    originalPrice: 345,
    image: f1,
    label: 'Hot deal',
    colors: ['red', 'gray', 'black'],
  },
  {
    id: 2,
    name: 'A Fragrance Of Fashion',
    price: 300,
    image: f2,
    label: 'SOLD OUT',
  },
  {
    id: 3,
    name: 'Cozy Chic Sweater',
    price: 300,
    originalPrice: 345,
    image: f4,
    label: '33% off',
    colors: ['yellow', 'blue', 'purple', 'black'],
  },
  {
    id: 4,
    name: 'A Fragrance Of Fashion',
    price: 300,
    image: f3,
    label: 'SOLD OUT',
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold">Best Feature Fashion</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mt-2">
        Discover our best selling fashion essentials, curated just for you! Elevate your wardrobe with our must-have pieces.
      </p>
      <div className="grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 px-6 mt-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative  mx-auto border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer duration-3000 "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative ">
        <Image src={product.image} alt={product.name} width={400} height={500} className=" w-full" />

        {/* Label */}
        {product.label && (
          <span className="absolute top-3 left-3 bg-black text-white font-semibold text-sm px-3 py-1 rounded">
            {product.label}
          </span>
        )}

        {/* Overlay Effect */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-45 flex items-end justify-center transition-transform duration-500 ${
            hover ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          } transform origin-bottom overlay`}
        >
          <Button className="bg-white rounded-2xl text-gray-700 flex items-center mb-4 gap-2 px-6 py-5 transition duration-300 hover:bg-sky-800">
            <FaShoppingCart className="text-lg" />
            Add To Cart
          </Button>
        </div>

        {/* Icons on Hover */}
        {hover && (
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button className="bg-white p-2 rounded-full shadow-md">
              <HeartOutlined className="text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <EyeOutlined className="text-gray-600" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <Rate disabled defaultValue={5} className="text-yellow-500 mb-2" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {product.originalPrice ? (
          <p className="text-gray-500 line-through">${product.originalPrice}</p>
        ) : null}
        <p className="text-lg font-bold">${product.price}</p>
  

      </div>
    </div>
  );
};

export default FeaturedProducts;
