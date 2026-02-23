"use client";
import useStore from '@/store';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CartIcon = () => {
  const { items } = useStore();
  return (
    <Link href="/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 text-violet-700 hover:text-blue-700 hoverEffect" />
      <span className="absolute -top-2 -right-2 bg-violet-700 text-white w-3.5 h-3.5 rounded-full text-x5 font-semibold flex items-center justify-center">
        {items?.length ? items.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;