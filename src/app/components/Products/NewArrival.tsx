'use client';

import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

type Product = {
  id: number,
  name: string;
  image: string;
  inStock: boolean;
  sizes: string[];
  colors: string[];
};

export default function NewArrival() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
    });

    // Fetch data from the JSON file
    const fetchData = async () => {
      try {
        const response = await fetch('/ProductData.json'); // Adjust the path as needed
        const data = await response.json();
        const apparelCategory = data.categories.find(
          (category:  { name: string }) => category.name === 'Apparel'
        );

        if (apparelCategory) {
          setProducts(apparelCategory.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  console.log(products);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-lg md:text-xl font-bold">NEW ARRIVAL</h2>
      </div>

      <Row gutter={[16, 16]} className="mt-4">
  {products.map((product, index) => (
    <Col 
      key={index} 
      xs={12} sm={8} md={6} lg={4}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div 
          className="relative group cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <Card
            hoverable
            cover={
              <Image 
                src={product.image} 
                alt={product.name} 
                width={200} 
                height={200} 
                className="mx-auto" 
              />
            }
            className="rounded-lg shadow-md"
          >
            <p className="text-center font-medium whitespace-nowrap">{product.name}</p>
          </Card>

          {hoverIndex === index && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/75 text-white p-3 flex flex-col justify-center items-center rounded-lg">
              <p className="text-sm font-semibold">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              
              <div className="mt-2">
                <p className="text-xs font-medium">Sizes:</p>
                <div className="flex gap-2 mt-1">
                  {product.sizes.map((size, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-200 text-black rounded text-xs">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs font-medium">Colors:</p>
                <div className="flex gap-2 mt-1">
                  {product.colors.map((color, i) => (
                    <span 
                      key={i} 
                      className="w-4 h-4 rounded-full border" 
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </Col>
  ))}
</Row>

    </div>
  );
}
