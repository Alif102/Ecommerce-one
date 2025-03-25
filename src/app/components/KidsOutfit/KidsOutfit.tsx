'use client';

import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  image: string;
  color: string;
  variation: string;
  price: number;
  brand: string;
  category: string;
}

export default function KidsOutfit() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [kidsProducts, setKidsProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchKidsData = async () => {
      try {
        const response = await fetch('/ProductData.json');
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        const kidsCategory = data.categories.find((category: { name: string }) => category.name === 'Kids');
        setKidsProducts(kidsCategory?.products || []);
      } catch (error) {
        console.error('Error fetching kids data:', error);
      }
    };

    fetchKidsData();
  }, []);

  console.log(kidsProducts);

  const categories: string[] = [
    'All',
    'Best Selling Product',
    "Children's Outfit",
    "Girl's Floral Dress",
    'Kids Winter Wear',
  ];

  // Show all products if "All" is selected, otherwise filter by category
  const filteredProducts =
    selectedCategory === 'All'
      ? kidsProducts
      : kidsProducts.filter((product) => product.category === selectedCategory);

  console.log(filteredProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Popular Fashion Designs For Children</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto my-4">
        MyShop features a massive collection of stylish and colorful designs. Our products have been made according to the latest fashion trends.
      </p>

      <div className="flex justify-center flex-wrap gap-4 my-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
   
        
      
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-200">   
            <Link  href={`/product/${product.id}`}>
            <div className="flex justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={180}
                height={180}
                className="rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold mt-3 text-gray-800">{product.name}</h3>
            <div className="flex justify-between items-center gap-2 mt-2">
              <p className="text-lg font-bold text-blue-600 mt-2">${product.price}</p>
              <p className="text-xs text-gray-700">Brand: {product.brand}</p>
            </div>
            <div className="flex justify-between gap-2 mt-2">
              <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                Color: {product.color}
              </span>
              <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                {product.variation}
              </span>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
