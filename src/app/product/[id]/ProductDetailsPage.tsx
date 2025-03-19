"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {  HeartOutlined } from "@ant-design/icons";
import {  FaHelmetSafety } from "react-icons/fa6";
import { FaFirstOrder, FaShoppingBasket } from "react-icons/fa";

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
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Left Side - Product Image */}
      <div className="flex justify-center">
        <Image src={product.image} alt={product.name} width={400} height={400} className="rounded-lg" />
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
          <button   className="w-full  bg-transparent text-black border  border-black hover:bg-green-200 hover:border-green-100 hover:text-green-600 p-2 rounded-lg flex items-center justify-center gap-2">
         <FaShoppingBasket />   <p>Add to Cart</p>
          </button>
          <button  className="w-full bg-black text-white  p-2 rounded-lg">
            Buy Now
          </button>
        </div>

        {/* Wishlist */}
     <div className=" flex justify-between gap-3 text-sm">
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
