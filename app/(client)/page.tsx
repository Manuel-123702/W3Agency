import Container from "@/components/Container";
import Newsletter from "@/components/Newsletter";
import GridProduct from "@/components/GridProduct";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";
import { client } from "@/sanity/lib/client";

import React from "react";

type Product = {
  _id: string;
  name: string;
  image: string;
};
const Home = async () => {
  const categories = await getCategories(6);
  const products = await client.fetch(`
    *[_type == "product"] | order(_createdAt desc)[0...100]{
    _id,
    name,
    "image": images[0].asset->url
  }
  `);

  return (
    <Container className="bg-shop-light-pink -mt-16">
      <HomeBanner />
      <GridProduct products={products} />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <GridProduct products={products} />
      <ShopByBrands />
      <GridProduct products={products} />
      <LatestBlog />
      <Newsletter />
    </Container>
  );
};

export default Home;
