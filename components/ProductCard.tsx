import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame, MessageCircleMore, Sparkles } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`h-64 w-full object-contain overflow-hidden bg-transparent transition duration-500 ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute left-2 top-2 z-10 rounded-full border border-emerald-500/20 bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Featured Deal
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-blue-400 hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={index < 4 ? "text-yellow-400" : " text-lightText"}
                fill={index < 4 ? "#fbbf24" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-lightText text-xs tracking-wide">5 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5 rounded-full bg-slate-50 px-3 py-2 text-sm">
          <Sparkles className={`h-4 w-4 ${product?.stock === 0 ? "text-red-600" : "text-emerald-600"}`} />
          <p className={`font-medium ${product?.stock === 0 ? "text-red-600" : "text-slate-700"}`}>
            {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "font-semibold text-slate-900"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <div className="flex flex-col gap-2">
          <AddToCartButton product={product} className="w-full rounded-full" />
          <a
            href={buildWhatsAppUrl({
              message: `Hello! I would like to know more about ${product?.name} and place an order through WhatsApp.`,
            })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <MessageCircleMore className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
