"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {  HeartOutlined } from "@ant-design/icons";
import {  FaHelmetSafety } from "react-icons/fa6";
import { FaFirstOrder, FaShoppingBasket } from "react-icons/fa";
import { useCart } from "@/app/providers/CartProvider";

// Define TypeScript interfaces for product structure
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  availability: string;
  sku: string;
  category: string[];
  brand: string;
  colors: string[];
  sizes: string[];
  quantity: number;
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/ProductData.json");
        const allProducts: Product[] = response.data.categories.flatMap(
          (category: { products: Product[] }) => category.products
        );
        const foundProduct = allProducts.find((p) => p.id === Number(id));

        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0, bgX: "0%", bgY: "0%" });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate background position for zoom effect
    const bgX = `${(x / width) * 100}%`;
    const bgY = `${(y / height) * 100}%`;

    setLensPosition({ x, y, bgX, bgY });
  };
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div
      className="relative bg-red-300 mx-auto  overflow-hidden rounded-lg"
      ref={imgRef}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="rounded-lg"
      />

      {/* Magnifying Glass */}
      {showLens && (
        <div
          className="absolute w-[100px] h-[100px] border-2 border-gray-300 rounded-full pointer-events-none"
          style={{
            top: lensPosition.y - 50,
            left: lensPosition.x - 50,
            backgroundImage: `url(${product.image})`,
            backgroundSize: "800px 800px", // Adjust zoom level
            backgroundPosition: `${lensPosition.bgX} ${lensPosition.bgY}`,
          }}
        />
      )}
    </div>

      {/* Right Side - Product Details */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        {/* Price Section */}
        <div className="text-xl font-semibold">
          {product.originalPrice && (
            <span className="line-through text-gray-500 mr-2">${product.originalPrice}</span>
          )}
          <span className="text-green-600">${product.price}</span>
        </div>

        {/* Size Selection */}
      {/* Size Selection */}
<div>
  <p className="font-semibold">Size:</p>
  <div className="flex gap-2 mt-2">
    {product?.sizes?.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-4 py-2 border rounded ${
          selectedSize === size ? "bg-black text-white" : "hover:bg-gray-100"
        }`}
      >
        {size}
      </button>
    )) || <p className="text-gray-500">No sizes available</p>}
  </div>
</div>

{/* Color Selection */}
<div>
  <p className="font-semibold">Color:</p>
  <div className="flex gap-2 mt-2">
    {product?.colors?.map((color) => (
      <button
        key={color}
        onClick={() => setSelectedColor(color)}
        className={`w-8 h-8 rounded-full border-2 ${
          selectedColor === color ? "border-black" : "border-gray-300"
        }`}
        style={{ backgroundColor: color }}
      ></button>
    )) || <p className="text-gray-500">No colors available</p>}
  </div>
</div>


        {/* Availability */}
        <p className={`font-semibold ${product.availability === "In stock" ? "text-green-600" : "text-red-600"}`}>
          Availability: {product.availability}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 ">
        <button
  onClick={() => addToCart({ ...product, quantity: product.quantity ?? 1 })}
  className="relative w-full rounded-md px-3.5 py-2 overflow-hidden border-2 font-medium border-black text-black group"
>
  <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-black top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
  <span className="relative flex items-center justify-center gap-2 transition duration-300 group-hover:text-white ease">
    <FaShoppingBasket /> Add to Cart
  </span>
</button>
          <button  className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border  p-2 rounded-lg">
            Buy Now
          </button>
        </div>

        {/* Wishlist */}
     <div className=" flex flex-wrap justify-between gap-3 text-sm">
     <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          <HeartOutlined />
          Add to Wishlist
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          <FaFirstOrder />
          Fast Delivery In 24 hours max
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          <FaHelmetSafety />
          Safe Payment
        </button>
     </div>

        {/* Product Meta Information */}
        <div className="text-sm text-gray-600 border-t pt-4">
          <p>
            <strong>Sku:</strong> D32-5H23
          </p>
          <p>
            <strong>Category:</strong> Women,Jacket,Outwear, Face
          </p>
          <p>
            <strong>Brand:</strong> Zaara
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
