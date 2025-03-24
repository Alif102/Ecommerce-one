'use client';

import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Image from 'next/image';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('Best Selling Product');
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
console.log(kidsProducts)
  const categories: string[] = [
    'Best Selling Product',
    "Children's Outfit",
    "Girl's Floral Dress",
    'Kids Winter Wear',
  ];

  // Filter products based on the selected category
  const filteredProducts = kidsProducts.filter(
    (product) => product.category === selectedCategory
  );
console.log(filteredProducts)
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
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <Image src={product.image} alt={product.name} width={200} height={200} className="rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">Color: {product.color}</p>
            <p className="text-gray-600">Variation: {product.variation}</p>
            <p className="text-xl font-bold text-blue-600">${product.price}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
