import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import bannerImage1 from "../images/banner_2.png";
import bannerImage2 from "../images/banner_1.png";
import bannerImage3 from "../images/acc_1.png";

const PromotionalBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {/* Banner 1 - Electronics */}
      <Link href="/shop" className="group">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-light-blue-400 to-blue-500 p-6 h-56 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between h-full">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-white/80" />
                <h3 className="text-xl font-bold text-white">Electronics</h3>
              </div>
              <p className="text-white/90 text-sm mb-2">Latest gadgets & tech</p>
              <p className="text-white/70 text-xs mb-3">Laptops, phones, tablets & more</p>
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="relative z-10 w-32 h-32">
              <Image
                src={bannerImage1}
                alt="Electronics"
                width={130}
                height={130}
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </Link>

      {/* Banner 2 - Home Appliances */}
      <Link href="/shop" className="group">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-light-blue-400 via-blue-400 to-violet-500 p-6 h-56 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between h-full">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-white/80" />
                <h3 className="text-xl font-bold text-white">Appliances</h3>
              </div>
              <p className="text-white/90 text-sm mb-2">Home essentials</p>
              <p className="text-white/70 text-xs mb-3">Refrigerators, washing machines & more</p>
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                Explore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="relative z-10 w-32 h-32">
              <Image
                src={bannerImage2}
                alt="Appliances"
                width={130}
                height={130}
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </Link>

      {/* Banner 3 - TVs & Entertainment */}
      <Link href="/shop" className="group">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-violet-400 to-light-blue-500 p-6 h-56 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between h-full">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-6 h-6 text-white/80" />
                <h3 className="text-xl font-bold text-white">Entertainment</h3>
              </div>
              <p className="text-white/90 text-sm mb-2">TVs & audio systems</p>
              <p className="text-white/70 text-xs mb-3">Smart TVs, speakers & home theater</p>
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                View Deals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="relative z-10 w-32 h-32">
              <Image
                src={bannerImage3}
                alt="Entertainment"
                width={130}
                height={130}
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PromotionalBanners;
