'use client';

import { Input, Badge, Dropdown, Drawer, MenuProps } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { FaBars, FaPlus, FaMinus } from 'react-icons/fa';

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
    const [cartCount, setCartCount] = useState<number>(0);
    const [showMinimalNavbar, setShowMinimalNavbar] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
console.log(setCartCount)
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

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full flex flex-wrap gap-4 md:flex-row justify-center md:items-center md:justify-between bg-white shadow-md px-24 py-4 transition-transform duration-300 ${
                    showMinimalNavbar ? '-translate-y-full' : 'translate-y-0'
                }`}
            >
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold cursor-pointer">MyShop</span>
                </Link>

                <Dropdown
                    menu={{ items }}
                    trigger={['hover']}
                    overlayClassName="p-2 bg-white shadow-lg rounded-md"
                >
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
                className={`fixed top-0 left-0 w-full flex items-center justify-between bg-white shadow-md px-6 py-3 transition-transform duration-300 ${
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
                        <Badge count={cartCount} showZero>
                            <ShoppingCartOutlined className="text-2xl cursor-pointer" />
                        </Badge>
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
