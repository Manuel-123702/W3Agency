"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

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

const HomeBanner = () => {
  const sliderData = [
    {
      id: 1,
      title: "Welcome to W3Agency - Discover Upto 20% Off Of Amazing Deals!",
      offer: "Hurry up! Only few left",
      buttonText1: "Shop Gaming",
      buttonText2: "Explore",
      imgSrc: bannerImage2,
    },
    {
      id: 2,
      title: "Experience Pure Electronics - Your Perfect Electronics Awaits!",
      offer: "Limited Time Offer 20% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: bannerImage1,
    },
    {
      id: 3,
      title: "Accessorize Your Gear - Premium Gaming Mice & Keyboards",
      offer: "Exclusive 30% Off Today",
      buttonText1: "Shop Accessories",
      buttonText2: "See More",
      imgSrc: bannerImage3,
    },
    {
      id: 4,
      title: "Smartphones That Keep You Ahead",
      offer: "Up to 25% Off Latest Phones",
      buttonText1: "Shop Phones",
      buttonText2: "Discover",
      imgSrc: bannerImage4,
    },
    {
      id: 5,
      title: "Watches That Match Your Lifestyle",
      offer: "Flash Sale: 15% Off",
      buttonText1: "Shop Watches",
      buttonText2: "View Collection",
      imgSrc: bannerImage5,
    },
    {
      id: 6,
      title: "Laptop + Accessories Bundle - Perfect Combo!",
      offer: "Save Up to 40%",
      buttonText1: "Get Bundle",
      buttonText2: "Learn More",
      imgSrc: bannerImage6,
    },
    {
      id: 7,
      title: "Ultimate Gaming setup desktop, mouse & Accessories",
      offer: "Limited Stock Available",
      buttonText1: "Shop Setup",
      buttonText2: "See Deals",
      imgSrc: bannerImage7,
    },
    {
      id: 8,
      title: "Top Smartphones With Free Gifts",
      offer: "Buy Now and Get Extra Accessories",
      buttonText1: "Shop Phones",
      buttonText2: "More Offers",
      imgSrc: bannerImage8,
    },
    {
      id: 9,
      title: "Work & Play Laptops for Every Need",
      offer: "Special Discount 20% Off",
      buttonText1: "Shop Laptops",
      buttonText2: "Check Deals",
      imgSrc: bannerImage9,
    },
    {
      id: 10,
      title: "Gaming Accessories Mega Sale",
      offer: "Up to 50% Off Gaming Gear",
      buttonText1: "Shop Now",
      buttonText2: "Explore All",
      imgSrc: bannerImage10,
    },
    {
      id: 11,
      title: "Smartwatch Collection - Stay Connected",
      offer: "Limited Edition Offers",
      buttonText1: "Shop Smartwatches",
      buttonText2: "View Collection",
      imgSrc: bannerImage11,
    },
    {
      id: 12,
      title: "Mix & Match Tech Deals - Save More!",
      offer: "Bundle Discounts Up To 35%",
      buttonText1: "Shop Bundles",
      buttonText2: "Discover",
      imgSrc: bannerImage12,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` } as React.CSSProperties}
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
              <div className="flex items-center mt-4 md:mt-6 gap-4">
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
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={260} // fixed width
                height={400} // fixed height
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-blue-600" : "bg-gray-500/30"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;