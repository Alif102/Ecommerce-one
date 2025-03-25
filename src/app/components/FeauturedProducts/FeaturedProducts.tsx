'use client';

import React, { useState, useEffect } from 'react';
import { Button, Rate } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '@/app/providers/CartProvider';

// Define TypeScript Interfaces
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  label?: string;
  quantity: number;
}

interface Category {
  name: string;
  products: Product[];
}

// Function to Fetch Featured Products
const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/ProductData.json');
    const data: { categories: Category[] } = await response.json(); // Define expected response structure
    console.log("Fetched Data:", data); // Debugging Line

    const featuredCategory = data.categories.find(
      (category: Category) => category.name === "Featured Products"
    );

    return featuredCategory ? featuredCategory.products : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Define State Type
  const { addToCart } = useCart(); // Move useCart inside the component

  useEffect(() => {
    fetchFeaturedProducts().then(setProducts);
  }, []);

  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold">Best Feature Fashion</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mt-2">
        Discover our best-selling fashion essentials, curated just for you! Elevate your wardrobe with our must-have pieces.
      </p>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-8">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <ProductCard product={product} addToCart={addToCart} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; addToCart: (product: Product) => void }> = ({ product, addToCart }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative mx-auto border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <Image src={product.image} alt={product.name} width={400} height={500} className="w-full" />

        {/* Label */}
        {product.label && (
          <span className="absolute top-3 left-3 bg-red-500 text-white font-semibold text-xs px-3 py-1 rounded-md">
            {product.label}
          </span>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center transition-transform duration-500 ${
            hover ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          } transform origin-bottom`}
        >
          <Button
            onClick={(event) => {
              event.preventDefault(); // Prevents route change
              addToCart({ ...product, quantity: product.quantity ?? 1 });
            }}
            className="bg-white rounded-full text-gray-700 flex items-center mb-4 gap-2 px-6 py-3 transition-all duration-300 ease-in-out relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></span>
            <span className="relative flex items-center gap-2 text-gray-700 group-hover:text-white transition-all duration-300">
              <FaShoppingCart className="text-lg" />
              Add To Cart
            </span>
          </Button>
        </div>

        {/* Icons on Hover */}
        {hover && (
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <HeartOutlined className="text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <EyeOutlined className="text-gray-600" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 text-center">
        <Rate disabled defaultValue={product.rating || 5} className="text-yellow-500 flex justify-center mb-2" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {product.originalPrice && <p className="text-gray-500 line-through">${product.originalPrice}</p>}
        <p className="text-lg font-bold text-red-600">${product.price}</p>
      </div>
    </div>
  );
};

export default FeaturedProducts;


