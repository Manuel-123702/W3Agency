"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import bannerImage1 from "../images/banner_2.png";
import bannerImage2 from "../images/banner_1.png";
import bannerImage3 from "../images/acc_1.png";
import Link from "next/link";

const HomeBanner = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Electronics - Your Perfect Electronics Awaits!",
      offer: "Limited Time Offer 20% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: bannerImage1,
    },
    {
      id: 2,
      title:
        "Welcome to W3Agency - Discover Discover Upto 20% Off\n   Of Amazing Deals For A Short Time  !",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: bannerImage2,
    },
    {
      id: 3,
      title: "Come and get your exclusive deal with us!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: bannerImage3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-600 ease-in-out"
        style={
          {
            transform: `translateX(-${currentSlide * 100}%)`,
          } as React.CSSProperties
        }
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-linear-to-r from-sky-200 to-violet-200 py-7 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-0 md:mt-0">
              <p className="md:text-base text-black pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] text-white md:leading-12 text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <Link href={"/shop"}>
                  <button className="md:px-10 px-7 md:py-2.5 py-2 border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] bg-white group hover:bg-[#9748FF] transition duration-300 ease-in-out rounded-full text-black font-medium">
                    {slide.buttonText1}
                  </button>
                </Link>
                <button className="group flex items-center text-white gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              {typeof slide.imgSrc === "string" ? (
                <Image
                  className="md:w-112.5 w-70"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              ) : (
                <Image
                  className="md:w-112.5 w-70"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-blue-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
