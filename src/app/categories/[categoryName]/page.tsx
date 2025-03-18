"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import SidebarFilters from "./SidebarFilters";

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
    <div className="w-full py-10 px-5">
      <div
        className="relative bg-cover bg-center h-60 flex flex-col items-center justify-center text-white"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border  p-4 rounded-lg shadow-lg">
                <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                </div>
                  <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
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
