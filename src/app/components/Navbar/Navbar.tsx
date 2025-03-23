'use client';

import {  Dropdown, Drawer, MenuProps } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { FaBars, FaPlus, FaMinus } from 'react-icons/fa';
import { HiSearch, HiShoppingCart } from 'react-icons/hi';
import { useCart } from '@/app/providers/CartProvider';

const items: MenuProps['items'] = [
    {
        key: 'categories',
        label: (
            <div className="grid grid-cols-2 gap-4 p-2">
                <div>
                    <span className="font-semibold">Mens</span>
                    <div className="flex flex-col space-y-1 mt-1">
                        <span>Half Sleeve T-shirt</span>
                        <span>Full Sleeve T-shirt</span>
                        <span>Drop Shoulder T-shirt</span>
                        <span>Sports T-shirt</span>
                    </div>
                </div>
                <div>
                    <span className="font-semibold">Womens</span>
                    <div className="flex flex-col space-y-1 mt-1">
                        <span>T-Shirt</span>
                        <span>Designer Pajamas</span>
                        <span>Pants</span>
                        <span>Palazzo</span>
                        <span>Comfy Trouser</span>
                    </div>
                </div>
            </div>
        ),
    },
];

const Navbar: React.FC = () => {
    const [showMinimalNavbar, setShowMinimalNavbar] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 50) {
                setShowMinimalNavbar(true);
            } else {
                setShowMinimalNavbar(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };
    const { cartCount } = useCart(); // Get cart count from context
console.log(cartCount)
  
    return (
        <>
            {/* Main Navbar */}
         
            <header className="w-full">
      {/* Announcement Bar */}
      <div className="bg-black text-yellow-400 text-center text-sm py-2">
        ⚡ EXCLUSIVE T-SHIRTS ON SALE | Limited time only <span className="ml-1">➡️</span>
      </div>

      {/* Main Navbar */}
      <nav className="flex items-center justify-between bg-white shadow-md px-8 md:px-24 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="text-gray-900">My</span>
          <span className="text-gray-500">Shop</span>
        </Link>

        {/* Shop Dropdown */}
        <Dropdown
                    menu={{ items }}
                    trigger={['hover']}
                    overlayClassName="p-2 bg-white shadow-lg rounded-md"
                >
                    <span className="cursor-pointer flex items-center text-lg font-semibold">
                        Shop <MdKeyboardArrowDown className="ml-1" />
                    </span>
                </Dropdown>

        {/* Search Input */}
        <div className="md:flex w-1/3 hidden">
      <input
        type="text"
        placeholder="Search Products by Titles or Tags"
        className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
       
      />
      <button
        className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-blue-700 flex items-center"
      >
        <HiSearch className="w-5 h-5" />
      </button>
    </div>

        {/* Right Section - Help, Login, Cart */}
        <div className="flex items-center gap-6">
          <Link href="/help" className="text-gray-700 text-sm hover:text-black">
            Help
          </Link>
          <Link href="/login" className="text-gray-700 text-sm hover:text-black flex items-center">
            <UserOutlined className="mr-1" /> Login
          </Link>
          <Link href="/cart">
          <div className="relative cursor-pointer">
      {/* Badge */}
      {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      {/* Shopping Cart Icon */}
      <HiShoppingCart className="text-2xl text-gray-800" />
    </div>
          </Link>
        </div>
      </nav>
    </header>

            {/* Minimal Navbar on Scroll */}
            <nav
                className={`fixed z-40 top-0 left-0 w-full flex items-center justify-between bg-white shadow-md px-8 md:px-24 py-4 transition-transform duration-300 ${
                    showMinimalNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="flex gap-3 items-center">
                    {/* Bars Icon triggers the sidebar */}
                    <div onClick={() => setSidebarOpen(true)} className="cursor-pointer">
                        <FaBars />
                    </div>
                    <div>
                        {/* Logo */}
                        <Link href="/">
                            <span className="text-xl font-bold cursor-pointer">MyShop</span>
                        </Link>
                    </div>
                </div>

                <div className="flex gap-3">
                    {/* Search Icon */}
                    <BiSearch className="text-2xl cursor-pointer" />

                    {/* Cart Icon */}
                    <Link href="/cart">
                    <div className="relative cursor-pointer">
      {/* Badge */}
      {cartCount > 0 && (
        <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {cartCount}
        </span>
      )}
      {/* Shopping Cart Icon */}
      <HiShoppingCart className="text-2xl text-gray-800" />
    </div>
                    </Link>
                </div>
            </nav>

            {/* Sidebar Drawer */}
            <Drawer
                title="Categories"
                placement="left"
                onClose={() => setSidebarOpen(false)}
                open={sidebarOpen}
            >
                <ul className="space-y-4">

                    {/* Mens Category */}
                    <li className="flex justify-between items-center cursor-pointer">
                        <span>Mens</span>
                        <span onClick={() => toggleCategory('mens')} className="cursor-pointer">
                            {expandedCategories['mens'] ? <FaMinus /> : <FaPlus />}
                        </span>
                    </li>
                    {expandedCategories['mens'] && (
                        <ul className="ml-4 space-y-2 text-gray-600">
                            <li>Half Sleeve T-shirt</li>
                            <li>Full Sleeve T-shirt</li>
                        </ul>
                    )}

                    {/* Womens Category */}
                    <li className="flex justify-between items-center cursor-pointer">
                        <span>Womens</span>
                        <span onClick={() => toggleCategory('womens')} className="cursor-pointer">
                            {expandedCategories['womens'] ? <FaMinus /> : <FaPlus />}
                        </span>
                    </li>
                    {expandedCategories['womens'] && (
                        <ul className="ml-4 space-y-2 text-gray-600">
                            <li>Pajamas</li>
                            <li>Pants</li>
                            <li>Palazzo</li>
                        </ul>
                    )}

                    {/* Kids Category */}
                    <li>Kids</li>
                </ul>
            </Drawer>
        </>
    );
};

export default Navbar;