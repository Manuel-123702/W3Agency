"use client";
import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* COLUMN 1: LOGO & ABOUT */}
          <div className="space-y-4">
            <Logo />
            <SubText className="py-3">
              Discover curated tech and furniture collections at W3Agency, blending style
              and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia />
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <SubTitle className="text-violet-500">Quick Links</SubTitle>
            <ul className="space-y-3 text-shop_light_green mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link href={item?.href} className="hover:text-blue-600 hoverEffect font-medium">
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CATEGORIES */}
          <div>
            <SubTitle className="text-violet-500">Categories</SubTitle>
            <ul className="space-y-3 text-shop_light_green mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link href={`/categories/${item?.href}`} className="hover:text-violet-600 hoverEffect font-medium">
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: LOCAL SHOWROOM VIDEO (Increased Height) */}
          <div className="space-y-4">
            <SubTitle className="text-violet-500">Our Tech Showroom</SubTitle>
            {/* Height increased to 300px here */}
            <div className="relative w-full h-70 rounded-xl overflow-hidden shadow-lg border-2 border-violet-100 group bg-gray-100">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-700"
              >
                <source src="/best.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Floating "In Stock" Badge */}
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-violet-600 uppercase z-10">
                In Stock
              </div>

              {/* Bottom Label Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-[10px] text-white font-medium uppercase tracking-widest leading-none">
                  Official W3Agency Partner Shop
                </p>
              </div>
            </div>
            <SubText className="text-xs text-gray-500">
              Explore our latest high-performance laptops and Accessories.
            </SubText>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="py-12 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()}
            <span className="text-violet-800"> W3A</span>
            <span className="text-blue-500">gency</span>. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;