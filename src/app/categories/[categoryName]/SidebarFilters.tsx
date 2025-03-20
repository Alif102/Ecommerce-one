'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Category {
  id: number;
  brand: string;
}

// Props interface
interface SidebarFiltersProps {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  brands: string[]; // ✅ Add this line
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ priceRange, setPriceRange , brands}) => {
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
            {brands.map((brand, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input type="checkbox" id={`brand-${index}`} className="form-checkbox h-4 w-4 text-blue-600" />
            <label htmlFor={`brand-${index}`} className="text-gray-700">{brand}</label>
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
