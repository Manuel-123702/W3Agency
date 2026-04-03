"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { client } from "@/sanity/lib/client";
import AddToCartButton from "@/components/AddToCartButton";
import PriceView from "@/components/PriceView";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  image: string;
  price: number;
  discount?: number;
  stock?: number;
  description?: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Clear broken recent searches
  useEffect(() => localStorage.removeItem("recentSearches"), []);

  // Close search
  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setProducts([]);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) closeSearch();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load recent
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent
  const saveRecent = (product: Product) => {
    const updated = [
      product,
      ...recentSearches.filter((p) => p._id !== product._id),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Fetch trending
  useEffect(() => {
    const fetchTrending = async () => {
      const data = await client.fetch(`*[_type=="product"] | order(_createdAt desc)[0...5]{
        _id, name, slug, price, discount, stock,
        "image": images[0].asset->url
      }`);
      setTrending(data);
    };
    fetchTrending();
  }, []);

  // Search & suggestions
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setProducts([]);
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        // Fetch all products to run Fuse.js for typo tolerance
        const allProducts: Product[] = await client.fetch(`*[_type=="product"]{
          _id, name, slug, price, discount, stock, description,
          "image": images[0].asset->url
        }`);

        // Fuse.js setup
        const fuse = new Fuse(allProducts, {
          keys: ["name", "description"],
          threshold: 0.3, // typo tolerance
        });

        const results = fuse.search(query).map((r) => r.item);
        setProducts(results.slice(0, 6));

        // Suggestions: top 5 names
        setSuggestions(results.slice(0, 5).map((p) => p.name));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200); // faster search

    return () => clearTimeout(timeout);
  }, [query]);

  // Click product
  const handleClickProduct = (product: Product) => {
    saveRecent(product);
    router.push(`/product/${product.slug.current}`);
    closeSearch();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const total = suggestions.length || products.length;
    if (!total) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % total);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + total) % total);
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      const selected = suggestions.length
        ? products.find((p) => p.name === suggestions[highlightedIndex])
        : products[highlightedIndex];
      selected && handleClickProduct(selected);
    }
  };

  // Highlight matched text
  const highlightText = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div ref={wrapperRef} className="relative px-1">
      {/* Search input */}
      <form className={`flex items-center overflow-hidden w-11 h-11 bg-blue-500 rounded-full transition-all duration-300 ${open ? "w-64" : "hover:w-64"}`}>
        <div className="flex items-center justify-center pl-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="text-white fill-current">
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          className="flex-1 bg-transparent text-white px-3 outline-none"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center pt-20">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl">

            {/* Header */}
            <div className="flex justify-between p-4 border-b">
              <h2 className="font-semibold text-violet-600">Search Products</h2>
              <button onClick={closeSearch}>✕</button>
            </div>

            {/* Input inside modal */}
            <div className="p-4 border-b">
              <input
                autoFocus
                type="text"
                placeholder="Search your product here..."
                className="w-full border px-4 py-2 rounded-md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="max-h-96 overflow-y-auto relative">

              {/* Suggestions */}
              {query && suggestions.length > 0 && (
                <div className="absolute top-0 left-0 w-full bg-white z-50 rounded-b shadow-md">
                  {suggestions.map((s, i) => (
                    <p
                      key={i}
                      className={`px-4 py-2 cursor-pointer ${highlightedIndex === i ? "bg-gray-100" : ""}`}
                      onClick={() => setQuery(s)}
                    >
                      {highlightText(s)}
                    </p>
                  ))}
                </div>
              )}

              {/* Recent */}
              {!query && recentSearches.length > 0 && (
                <div className="p-4 border-b">
                  <p className="font-semibold text-violet-600 mb-2">Recent</p>
                  {recentSearches.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleClickProduct(item)}
                      className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <img src={item.image || "/placeholder.png"} className="w-12 h-12 object-cover rounded bg-gray-100"/>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Trending */}
              {!query && (
                <div className="p-4">
                  <p className="font-semibold text-violet-600 mb-2">Trending</p>
                  {trending.map((p) => (
                    <div key={p._id} onClick={() => handleClickProduct(p)} className="flex gap-4 py-3 border-b cursor-pointer">
                      <img src={p.image || "/placeholder.png"} className="w-16 h-16"/>
                      <p>{p.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Results */}
              {query && (
                <>
                  {loading && <p className="p-4 text-gray-500">Loading...</p>}

                  {!loading && products.length === 0 && (
                    <p className="p-4 text-center text-gray-500">
                      ❌ No products found for "{query}"
                    </p>
                  )}

                  {products.map((p, index) => (
                    <div key={p._id} className={`flex gap-4 p-4 border-b ${highlightedIndex === index ? "bg-gray-100" : ""}`}>
                      <img src={p.image || "/placeholder.png"} className="w-20 h-20 rounded object-cover"/>
                      <div className="flex-1">
                        <p onClick={() => handleClickProduct(p)} className="cursor-pointer font-medium">
                          {highlightText(p.name)}
                        </p>
                        <AddToCartButton product={p as any}/>
                      </div>
                      <PriceView price={p.price} discount={p.discount}/>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;