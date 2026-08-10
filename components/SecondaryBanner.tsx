"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// Import banner images
import bannerImage1 from "../images/banner_2.png";
import bannerImage2 from "../images/banner_1.png";
import bannerImage3 from "../images/acc_1.png";
import bannerImage4 from "../images/banner_4.png";
import bannerImage5 from "../images/banner_5.png";
import bannerImage6 from "../images/banner_6.png";

interface Slide {
  id: number;
  title: string;
  offer: string;
  buttonText1: string;
  buttonText2: string;
  imgSrc: StaticImageData | string;
}

const SecondaryBanner = () => {
  const sliderData: Slide[] = [
    {
      id: 1,
      title: "Professional workstations for business and creativity.",
      offer: "Bulk orders with special WhatsApp pricing",
      buttonText1: "View Laptops",
      buttonText2: "Get Quote",
      imgSrc: bannerImage1,
    },
    {
      id: 2,
      title: "Smart home appliances that simplify your life.",
      offer: "Energy-efficient solutions for modern homes",
      buttonText1: "Shop Appliances",
      buttonText2: "Learn More",
      imgSrc: bannerImage2,
    },
    {
      id: 3,
      title: "Premium audio systems for immersive entertainment.",
      offer: "Home theater setups with expert consultation",
      buttonText1: "Explore Audio",
      buttonText2: "Request Demo",
      imgSrc: bannerImage3,
    },
    {
      id: 4,
      title: "Gaming gear for the ultimate competitive edge.",
      offer: "High-performance peripherals and accessories",
      buttonText1: "Shop Gaming",
      buttonText2: "Build Setup",
      imgSrc: bannerImage4,
    },
    {
      id: 5,
      title: "Kitchen appliances that make cooking effortless.",
      offer: "Modern solutions for every cooking need",
      buttonText1: "View Kitchen",
      buttonText2: "Get Advice",
      imgSrc: bannerImage5,
    },
    {
      id: 6,
      title: "Smart TVs and displays for stunning visuals.",
      offer: "4K and 8K options with WhatsApp deals",
      buttonText1: "Shop TVs",
      buttonText2: "Compare Models",
      imgSrc: bannerImage6,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="relative w-full overflow-hidden my-8 rounded-[2rem]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={
          {
            transform: `translateX(-${currentSlide * 100}%)`,
          } as React.CSSProperties
        }
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex min-w-full flex-col items-center justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 px-5 py-8 shadow-2xl md:flex-row md:px-14"
          >
            <div className="flex flex-1 items-center justify-center order-2 md:order-1">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={500}
                className="animate-float-soft rounded-[1.5rem] object-cover shadow-2xl"
              />
            </div>
            <div className="mt-6 md:pr-8 order-1 md:order-2">
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Special Offers
              </span>
              <p className="pb-2 pt-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                {slide.offer}
              </p>
              <h1 className="max-w-xl text-2xl font-semibold text-white md:text-[38px] md:leading-[1.1]">
                {slide.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 md:mt-6">
                <Link href={"/shop"}>
                  <button className="rounded-full border border-white/20 bg-white px-6 py-2.5 font-medium text-slate-900 transition duration-300 hover:-translate-y-1 hover:bg-slate-100">
                    {slide.buttonText1}
                  </button>
                </Link>
                <a
                  href={buildWhatsAppUrl({
                    message:
                      "Hello! I'm interested in your special offers. Can we discuss pricing and availability?",
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 px-2 py-2 text-sm font-medium text-white"
                >
                  {slide.buttonText2}
                  <Image
                    className="transition group-hover:translate-x-1"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryBanner;
