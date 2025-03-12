'use client';

import { Card, Col, Row } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import p1 from '../../../../public/assets/p1.jpg';
import p2 from '../../../../public/assets/p2.jpg';
import p3 from '../../../../public/assets/p3.jpg';
import p4 from '../../../../public/assets/p4.jpg';

type Product = {
  title: string;
  image: StaticImageData;
  inStock: boolean;
  sizes: string[];
  colors: string[];
};

const products: Product[] = [
  { 
    title: 'Half-Sleeve T-shirt', 
    image: p1, 
    inStock: true, 
    sizes: ['S', 'M', 'L', 'XL'], 
    colors: ['#ff0000', '#0000ff', '#00ff00'] 
  },
  { 
    title: 'Designer Short Sleeve', 
    image: p4, 
    inStock: false, 
    sizes: ['M', 'L'], 
    colors: ['#ff9900', '#6600cc'] 
  },
  { 
    title: 'Sports T-shirt', 
    image: p3, 
    inStock: true, 
    sizes: ['S', 'M'], 
    colors: ['#333333', '#ffffff'] 
  },
  { 
    title: 'Polo', 
    image: p2, 
    inStock: true, 
    sizes: ['L', 'XL'], 
    colors: ['#0099ff', '#ff3366', '#00cc99'] 
  },
  { 
    title: 'Cut & Stitch Polo', 
    image: p4, 
    inStock: false, 
    sizes: ['M', 'L', 'XL'], 
    colors: ['#ff0000', '#222222'] 
  },
  { 
    title: 'Half Sleeve Raglan', 
    image: p1, 
    inStock: true, 
    sizes: ['S', 'M', 'L'], 
    colors: ['#ff6600', '#0066ff'] 
  },
];

export default function NewArrival() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-lg md:text-xl font-bold">NEW ARRIVAL</h2>
      </div>

      <Row gutter={[16, 16]} className="mt-4">
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>
            <div 
              className="relative group cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 " 
              onMouseEnter={() => setHoverIndex(index)} 
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Card
                hoverable
                cover={<Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto " />}
                className="rounded-lg shadow-md"
              >
                <p className="text-center font-medium whitespace-nowrap">{product.title}</p>
              </Card>

              {/* Hover Info Box */}
              {hoverIndex === index && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/75 text-white p-3 flex flex-col justify-center items-center rounded-lg">
                  <p className="text-sm font-semibold">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                  
                  {/* Size Variations */}
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

                  {/* Color Variations */}
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
          </Col>
        ))}
      </Row>
    </div>
  );
}
