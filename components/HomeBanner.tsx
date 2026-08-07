"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// Import all banner images
import bannerImage1 from "../images/banner_2.png";
import bannerImage2 from "../images/banner_1.png";
import bannerImage3 from "../images/acc_1.png";
import bannerImage4 from "../images/banner_4.png";
import bannerImage5 from "../images/banner_5.png";
import bannerImage6 from "../images/banner_6.png";
import bannerImage7 from "../images/banner_7.png";
import bannerImage8 from "../images/banner_8.jpg";
import bannerImage9 from "../images/banner_9.jpg";
import bannerImage10 from "../images/banner_10.jpg";
import bannerImage11 from "../images/banner_11.png";
import bannerImage12 from "../images/banner_12.jpg";

// 1. Define the Interface for TypeScript
interface Slide {
  id: number;
  title: string;
  offer: string;
  buttonText1: string;
  buttonText2: string;
  imgSrc: StaticImageData | string;
}

const HomeBanner = () => {
  // 2. Assign the Slide[] type to your data array
  const sliderData: Slide[] = [
    {
      id: 1,
      title: "Premium electronics, curated for modern buyers.",
      offer: "Order and pay securely through WhatsApp",
      buttonText1: "Explore collection",
      buttonText2: "Order on WhatsApp",
      imgSrc: bannerImage2,
    },
    {
      id: 2,
      title: "Luxury tech essentials with polished presentation.",
      offer: "Flexible pricing for business and personal orders",
      buttonText1: "Shop now",
      buttonText2: "Talk to us",
      imgSrc: bannerImage1,
    },
    {
      id: 3,
      title: "Elevated accessories for the ultimate workstation.",
      offer: "From premium keyboards to refined devices",
      buttonText1: "Discover accessories",
      buttonText2: "View offers",
      imgSrc: bannerImage3,
    },
    {
      id: 4,
      title: "Smartphones and gadgets that feel effortless.",
      offer: "Private consultation for best-fit recommendations",
      buttonText1: "See phones",
      buttonText2: "Get advice",
      imgSrc: bannerImage4,
    },
    {
      id: 5,
      title: "Refined watches and lifestyle devices.",
      offer: "A boutique experience for premium tech shoppers",
      buttonText1: "Shop watches",
      buttonText2: "Learn more",
      imgSrc: bannerImage5,
    },
    {
      id: 6,
      title: "Mobile workstations designed to impress.",
      offer: "Tailored bundles for professionals and creators",
      buttonText1: "View laptops",
      buttonText2: "Request bundle",
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
    <div className="relative w-full overflow-hidden">
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
            className="mt-6 flex min-w-full flex-col-reverse items-center justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 px-5 py-8 shadow-2xl md:flex-row md:px-14"
          >
            <div className="mt-0 md:pl-8">
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                WhatsApp ordering experience
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
                      "Hello! I would like to discuss pricing, availability, and payment for my products over WhatsApp.",
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
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={500}
                className="animate-float-soft rounded-[1.5rem] object-cover shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
