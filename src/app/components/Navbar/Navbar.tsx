'use client';

import { Input, Badge, Dropdown, MenuProps } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { FaBars, FaTimes } from 'react-icons/fa';

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

const categories = [
    "Mens",
    "Womens",
    "Kids",
    "Face Mask",
    "Sports",
    "New Arrival",
    "Top Selling",
];

const Navbar: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [showMinimalNavbar, setShowMinimalNavbar] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setShowMinimalNavbar(true);
            } else {
                setShowMinimalNavbar(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full flex items-center justify-between bg-white shadow-md px-24 py-4 transition-transform duration-300 ${showMinimalNavbar ? '-translate-y-full' : 'translate-y-0'
                    }`}
            >
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold cursor-pointer">MyShop</span>
                </Link>

                <Dropdown menu={{ items }} trigger={['hover']} overlayClassName="p-2 bg-white shadow-lg rounded-md">
                    <span className="cursor-pointer flex items-center text-lg font-semibold">
                        Shop <MdKeyboardArrowDown className="ml-1" />
                    </span>
                </Dropdown>

                {/* Search Field */}
                <Input.Search
                    placeholder="Search products..."
                    className="w-1/3"
                    onSearch={(value) => console.log('Search:', value)}
                />

                {/* Cart Icon */}
                <Link href="/cart">
                    <Badge count={cartCount} showZero>
                        <ShoppingCartOutlined className="text-2xl cursor-pointer" />
                    </Badge>
                </Link>
            </nav>

            {/* Minimal Navbar on Scroll */}
            <nav
                className={`fixed top-0 left-0 w-full flex items-center justify-between bg-white shadow-md px-6 py-3 transition-transform duration-300 ${showMinimalNavbar ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className='flex gap-3 items-center'>
                    {/* Bars Icon (Opens Sidebar) */}
                    <FaBars className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />

                    {/* Logo */}
                    <Link href="/">
                        <span className="text-xl font-bold cursor-pointer">MyShop</span>
                    </Link>
                </div>

                <div className='flex gap-3'>
                    {/* Search Icon */}
                    <BiSearch className="text-2xl cursor-pointer" />

                    {/* Cart Icon */}
                    <Link href="/cart">
                        <Badge count={cartCount} showZero>
                            <ShoppingCartOutlined className="text-2xl cursor-pointer" />
                        </Badge>
                    </Link>
                </div>
            </nav>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } z-50`}
            >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <FaTimes className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
                </div>

                {/* Sidebar Content */}
                <div className="p-4 space-y-3">
                    {categories.map((category, index) => (
                        <span key={index} className="block text-lg cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Overlay (Closes Sidebar when clicked outside) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Navbar;
