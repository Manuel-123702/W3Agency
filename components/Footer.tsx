import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover curated furniture collections at W3Agency, blending style
              and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia />
          </div>
          <div>
            <SubTitle className="text-violet-500">Quick Links</SubTitle>
            <ul className="space-y-3 text-shop_light_green mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-blue-600 hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>
              <SubTitle className="text-violet-500">Categories</SubTitle>
              <ul className="space-y-3 text-shop_light_green mt-4">
                {categoriesData?.map((item) => (
                  <li key={item?.title}>
                    <Link
                      href={`/categories/${item?.href}`}
                      className="hover:text-violet-600 hoverEffect font-medium"
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <SubTitle className="text-violet-500">Newsletter</SubTitle>
            <SubText>
              Subscript to our newsletter to receive updates and exclusive
              offers.
            </SubText>
            <form className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                required
                className="border-2 border-violet-400 hover:border-violet-600 text-gray-600 focus:text-violet-950 focus:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <Button className="group relative px-8 py-3 font-bold bg-white text-indigo-600 transition-all duration-300 ease-in-out hover:text-white hover:shadow-lg hover:shadow-indigo-500/40 overflow-hidden border-2 border-indigo-600 rounded-full active:scale-95">
                <span className="absolute inset-0 w-full h-full bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] origin-left"></span>

                <span className="relative z-10 flex items-center gap-3 tracking-widest text-sm uppercase">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:rotate-20 group-hover:scale-110"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  subscribe
                </span>
              </Button>
            </form>
          </div>
        </div>

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
