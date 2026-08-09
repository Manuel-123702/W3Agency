import Container from "@/components/Container";
import Newsletter from "@/components/Newsletter";
import GridProduct from "@/components/GridProduct";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import PromotionalBanners from "@/components/PromotionalBanners";
import SecondaryBanner from "@/components/SecondaryBanner";
import PromotionalProducts from "@/components/PromotionalProducts";
import Testimonials from "@/components/Testimonials";
import { getCategories } from "@/sanity/queries";
import { safeClientFetch } from "@/sanity/lib/client";
import type { Category, Product } from "@/sanity.types";

import React from "react";

const Home = async () => {
  const categories = (await getCategories(6)) as Category[];
  const products = await safeClientFetch(`
    *[_type == "product"] | order(_createdAt desc)[0...100]{
    _id,
    name,
    images
  }
  `);

  return (
    <Container className="bg-shop-light-pink -mt-16">
      <HomeBanner />
      <PromotionalBanners />
      <GridProduct products={products} />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <GridProduct products={products} />
      <SecondaryBanner />
      <ShopByBrands />
      <GridProduct products={products} />
      <PromotionalProducts />
      <Testimonials />
      <LatestBlog />
      <Newsletter />
    </Container>
  );
};

export default Home;
