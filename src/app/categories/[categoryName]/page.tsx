"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import shopBanner from '../../../../public/assets/shop-banner.webp'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get("/ProductData.json");
        const categoryData: Category | undefined = response.data.categories.find(
          (cat: Category) => cat.name.toLowerCase() === categoryName
        );

        if (categoryData) {
          setProducts(categoryData.products);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full py-10 px-5">
<div
  className="relative bg-cover bg-center h-60 flex flex-col items-center justify-center text-white"
  style={{ backgroundImage: "url('/assets/shop-banner.webp')" }} // ✅ Correct path
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <h2 className="relative text-2xl uppercase font-bold text-center">{categoryName}</h2>

 <div className=" flex flex-row">
 <p className=" text-white opacity-60">Home &gt; {categoryName || "Loading..."}</p>

 </div>
</div>
{/* <SidebarFilters/> */}


      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-5  p-5">

        {/* left side */}
        <div className=" col-span-12 lg:col-span-2  ">
        <SidebarFilters/>
        
        </div>



        {/* right side */}
        <div className=" col-span-12 lg:col-span-10 ">
        {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
