"use client";
import { BRANDS_QUERY_RESULT, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERY_RESULT;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();

  const brandParams = searchParams?.get("brand") || null;
  const categoryParams = searchParams?.get("category") || null;
  const queryParam = searchParams?.get("query") || "";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products whenever filters or search query change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let minPrice = 0;
        let maxPrice = 5000000;

        if (selectedPrice) {
          const [min, max] = selectedPrice.split("-").map(Number);
          minPrice = min;
          maxPrice = max;
        }

        const groqQuery = `
          *[_type == "product"
            ${selectedCategory ? `&& references(*[_type=="category" && slug.current=="${selectedCategory}"]._id)` : ""}
            ${selectedBrand ? `&& references(*[_type=="brand" && slug.current=="${selectedBrand}"]._id)` : ""}
            ${searchQuery ? `&& name match "*${searchQuery}*"` : ""}
            && price >= $minPrice && price <= $maxPrice
          ] | order(name asc) {
            ...,
            "categories": categories[]->title
          }
        `;

        const data = await client.fetch(groqQuery, { minPrice, maxPrice });
        setProducts(data);
      } catch (err) {
        console.error("Shop product fetching Error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice, searchQuery]);

  return (
    <div className="border-t border-t-blue-200">
      <Container className="mt-5">
        {/* Header */}
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your needs
            </Title>
            {(selectedCategory || selectedBrand || selectedPrice) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-blue-400 underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 border-t border-t-blue-200">
          {/* Sidebar Filters */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-blue-200 scrollbar-hide">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-blue-300 animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;