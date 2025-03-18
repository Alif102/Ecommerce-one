"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import SidebarFilters from "./SidebarFilters";
import { Button, Rate } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { HeartOutlined, EyeOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface Category {
  name: string;
  image: string;
  products: Product[];
}

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 450]);

  // 🔹 Maintain hover states for individual products using an object
  const [hovered, setHovered] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get("/ProductData.json");
        const categoryData: Category | undefined = response.data.categories.find(
          (cat: Category) => cat.name.toLowerCase() === categoryName
        );

        if (categoryData) {
          setProducts(categoryData.products);
          setFilteredProducts(categoryData.products); // Initially set to all products
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // Update filtered products when price range changes
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [priceRange, products]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full pb-10 pt-3  px-5">
      <div
        className="relative bg-cover bg-center h-60 flex flex-col  items-center justify-center text-white"
        style={{ backgroundImage: "url('/assets/shop-banner.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h2 className="relative text-2xl uppercase font-bold text-center">{categoryName}</h2>
        <div className="flex flex-row">
          <p className="text-white opacity-60">Home &gt; {categoryName || "Loading..."}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
        {/* Left Sidebar */}
        <div className="col-span-12 lg:col-span-2">
          <SidebarFilters priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>

        {/* Product Grid */}
        <div className="col-span-12 lg:col-span-10">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-lg"
                  onMouseEnter={() => setHovered((prev) => ({ ...prev, [product.id]: true }))}
                  onMouseLeave={() => setHovered((prev) => ({ ...prev, [product.id]: false }))}
                >
                  <div className="relative mx-auto  rounded-lg overflow-hidden  transition cursor-pointer">
                    <div className="relative">
                      <Image src={product.image} alt={product.name} width={400} height={400} className="w-full" />

                      {/* Overlay Effect */}
                      <div
                        className={`absolute inset-0 bg-black bg-opacity-45 flex items-end justify-center transition-transform duration-500 ${
                          hovered[product.id] ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                        } transform origin-bottom overlay`}
                      >
                        <Button className="bg-white rounded-2xl text-gray-700 flex items-center mb-4 gap-2 px-6 py-5 transition-all duration-300 ease-in-out relative overflow-hidden group">
                          <span className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></span>
                          <span className="relative flex items-center gap-2 text-gray-700 group-hover:text-white transition-all duration-300">
                            <FaShoppingCart className="text-lg" />
                            Add To Cart
                          </span>
                        </Button>
                      </div>

                      {/* Icons on Hover */}
                      {hovered[product.id] && (
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
                      <Rate disabled defaultValue={5} className="text-yellow-500 flex  justify-center mb-2" />
                      <h3 className="text-lg text-center font-semibold">{product.name}</h3>
                      <p className="text-lg text-center font-bold">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found in this price range.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
