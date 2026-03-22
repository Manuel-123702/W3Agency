"use client";
import React, { useEffect } from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";

const Footer = () => {
  useEffect(() => {
    // Load Facebook SDK only once
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v25.0&appId=YOUR_APP_ID";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Parse XFBML elements after SDK is loaded
    const fb = (window as any).FB;
    if (fb) fb.XFBML.parse();
  }, []);

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

          {/* Facebook Frame Section */}
          <div className="space-y-4">
            <SubTitle className="text-violet-500">Follow us on Facebook</SubTitle>
            <SubText>Check our latest posts and updates directly from Facebook.</SubText>

            <div id="fb-root"></div>

            {/* Responsive wrapper */}
            <div className="w-full max-w-full overflow-hidden">
              <div
                className="fb-page w-full"
                data-href="https://www.W3agency.com/facebook"
                data-tabs="timeline"
                data-width="100%"
                data-height="500"   // you can adjust height
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              ></div>
            </div>
          </div>        </div>

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