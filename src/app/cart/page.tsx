"use client";
import { useCart } from "@/app/providers/CartProvider";
import Image from "next/image";
import React from "react";
import { Table } from "antd";
import "antd/dist/reset.css"; // Ensure AntD styles are included
import Link from "next/link";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItem } = useCart();

  const increaseQuantity = (id: number) => {
    updateCartItem(id, cartItems.find(item => item.id === id)?.quantity! + 1);
  };

  const decreaseQuantity = (id: number) => {
    updateCartItem(id, cartItems.find(item => item.id === id)?.quantity! - 1);
  };

  // Define AntD Table Columns
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-4">
          {record.image && (
            <Image src={record.image} alt={text} width={50} height={50} className="rounded" />
          )}
          <span className="font-semibold">{text}</span>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQuantity(record.id)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200"
          >
            -
          </button>
          <span className="w-10 text-center">{record.quantity}</span>
          <button
            onClick={() => increaseQuantity(record.id)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200"
          >
            +
          </button>
        </div>
      ),
    },
    
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `$${text.toFixed(2)}`,
    },
    {
      title: "Total",
      key: "total",
      render: (_: any, record: any) => (
        <span className="w-16 text-center inline-block">
          ${ (record.price * record.quantity).toFixed(1) }
        </span>
      ),
    },
    
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <button onClick={() => removeFromCart(record.id)} className="btn btn-xs text-red-500">
          Remove
        </button>
      ),
    },
  ];

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold border-b border-t py-5 mb-6">
            My Shopping Cart
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto border lg:h-96 overflow-y-auto rounded-lg">
              <Table
                columns={columns}
                dataSource={cartItems.map(item => ({ ...item, key: item.id }))}
                pagination={false}
                scroll={{ x: "max-content" }}
              />
            </div>
          )}
        </div>

        {/* Order Summary */}
       {/* Order Summary */}
<div className="p-6 rounded-lg shadow-lg bg-white ">
  <h3 className="text-xl font-semibold border-b pb-2 mb-4">
    Order Summary
  </h3>
  <div className="flex justify-between py-2 text-lg">
    <span>Sub Total</span>
    <span>
      $
      {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
    </span>
  </div>
  <div className="flex justify-between py-2 text-gray-500">
    <span>Shipping</span>
    <span>Free*</span>
  </div>
  <div className="flex justify-between py-2 text-gray-500">
    <span>Pickup Fee</span>
    <span>$10.00</span>
  </div>

  {/* Coupon Code */}
  <div className="mt-4 flex">
    <input
      type="text"
      placeholder="Coupon code"
      className="input input-bordered w-full rounded-r-none"
    />
    <button className="btn bg-black text-white rounded-l-none">Apply</button>
  </div>

  {/* Total Calculation */}
  <div className="flex justify-between text-xl font-bold mt-4">
    <span>Total</span>
    <span>
      $
      {(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 10
      ).toFixed(2)}
    </span>
  </div>

  <div className="relative mt-5 w-full text-center inline-block text-lg cursor-pointer group">
    <span className="relative z-10 block px-12 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
      <span className="absolute left-0 w-full h-48 transition-all duration-700 origin-top-right rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:rotate-180 ease"></span>
     <Link href='/order-successfull'>
     <span className="relative md:text-sm whitespace-nowrap">PROCESSED CHECKOUT</span>
     </Link> 
    </span>
    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
  </div>
</div>

      </div>
    </div>
  );
};

export default CartPage;
