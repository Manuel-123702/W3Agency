import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, Clock, Percent } from "lucide-react";
import bannerImage1 from "../images/banner_4.png";
import bannerImage2 from "../images/banner_5.png";
import bannerImage3 from "../images/banner_6.png";

interface PromoProduct {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: any;
  badge: string;
}

const promoProducts: PromoProduct[] = [
  {
    id: 1,
    title: "Premium Laptop Bundle",
    description: "High-performance laptop with accessories included",
    originalPrice: 500000,
    discountedPrice: 425000,
    discount: 15,
    image: bannerImage1,
    badge: "Best Seller"
  },
  {
    id: 2,
    title: "Smart TV 55\" 4K",
    description: "Ultra HD display with smart features",
    originalPrice: 350000,
    discountedPrice: 280000,
    discount: 20,
    image: bannerImage2,
    badge: "Limited Time"
  },
  {
    id: 3,
    title: "Home Theater System",
    description: "Complete audio setup for immersive experience",
    originalPrice: 200000,
    discountedPrice: 150000,
    discount: 25,
    image: bannerImage3,
    badge: "Hot Deal"
  }
];

const PromotionalProducts = () => {
  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Special Offers</h2>
        <Link href="/shop" className="flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors">
          View All Deals
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Featured Product */}
        <div className="lg:col-span-1">
          <Link href="/shop" className="group block h-full">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-light-blue-400 to-blue-500 p-6 h-full hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm font-semibold">{promoProducts[0].badge}</span>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center mb-4">
                  <Image
                    src={promoProducts[0].image}
                    alt={promoProducts[0].title}
                    width={200}
                    height={200}
                    className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{promoProducts[0].title}</h3>
                  <p className="text-white/90 text-sm">{promoProducts[0].description}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                      <Percent className="w-4 h-4 text-white" />
                      <span className="text-white font-semibold">{promoProducts[0].discount}% OFF</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">Limited</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 line-through text-sm">
                      {promoProducts[0].originalPrice.toLocaleString()} FCFA
                    </span>
                    <span className="text-white font-bold text-xl">
                      {promoProducts[0].discountedPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                  
                  <button className="w-full bg-white text-violet-600 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                    <Tag className="w-4 h-4" />
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Column - 2 Row Products */}
        <div className="lg:col-span-2 grid grid-rows-2 gap-4">
          {promoProducts.slice(1).map((product) => (
            <Link key={product.id} href="/shop" className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-light-blue-400 via-blue-400 to-violet-500 p-6 h-full hover:shadow-xl transition-all duration-300">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-semibold">{product.badge}</span>
                </div>
                
                <div className="flex items-center gap-6 h-full">
                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={150}
                      height={150}
                      className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-white">{product.title}</h3>
                    <p className="text-white/90 text-sm">{product.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                        <Percent className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold">{product.discount}% OFF</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                        <Tag className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">Deal</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-white/60 line-through text-sm">
                        {product.originalPrice.toLocaleString()} FCFA
                      </span>
                      <span className="text-white font-bold text-xl">
                        {product.discountedPrice.toLocaleString()} FCFA
                      </span>
                    </div>
                    
                    <button className="bg-white text-violet-600 px-6 py-2 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2 w-fit">
                      View Deal
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalProducts;
