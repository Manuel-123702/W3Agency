"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id,
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);
  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!",
        );
      });
    }
  };

  return (
    <>
      {!showProduct ? (
        <Link href="/wishlist" className="group relative">
          <Heart className="w-5 h-5 text-violet-700 hover:text-blue-700 hoverEffect" />
          <span className="absolute -top-2 -right-2 bg-violet-700 text-white w-3.5 h-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {favoriteProduct?.length ? favoriteProduct.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-blue-300 hoverEffect border border-blue-200 hover:border-violet-300 p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="#1D4ED8"
              className="text-violet-500 group-hover:text-blue-700 
            hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart
              className="text-violet-500 group-hover:text-blue-700 
            hoverEffect mt-.5 w-5 h-5"
            />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
