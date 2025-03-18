'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

// Props interface
interface SidebarFiltersProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ priceRange, setPriceRange }) => {
  const [collectionsOpen, setCollectionsOpen] = useState<boolean>(true);
  const [availabilityOpen, setAvailabilityOpen] = useState<boolean>(true);
  const [priceOpen, setPriceOpen] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get<{ categories: Category[] }>('/ProductData.json')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="p-4 bg-white shadow-md">
      {/* Collections */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setCollectionsOpen(!collectionsOpen)}
        >
          <h2 className="font-bold">Collections</h2>
          {collectionsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {collectionsOpen && (
          <ul className="mt-2 space-y-1 text-gray-700">
            {categories.map((category) => (
              <li key={category.id} className="cursor-pointer hover:px-2 transition duration-300 hover:text-black">
                <Link href={`/categories/${category.name.toLowerCase()}`} className="block w-full h-full">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-4" />

      {/* Availability */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setAvailabilityOpen(!availabilityOpen)}
        >
          <h2 className="font-bold">Availability</h2>
          {availabilityOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {availabilityOpen && (
          <div className="mt-2 space-y-1">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> In stock (18)
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Out of stock (8)
            </label>
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* Price Range Filter */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <h2 className="font-bold">Price</h2>
          {priceOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {priceOpen && (
          <div className="mt-2">
            <Slider
              range
              min={0}
              max={450}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              trackStyle={[{ backgroundColor: 'black' }]}
              handleStyle={[{ borderColor: 'black' }, { borderColor: 'black' }]}
            />
            <p className="mt-2 font-bold text-sm">
              Price: <span className="text-black">${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilters;
