"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Clear old recent searches on load
  useEffect(() => localStorage.removeItem("recentSearches"), []);

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setProducts([]);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  // Click outside closes search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) closeSearch();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load recent searches
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

  const saveRecent = (product: Product) => {
    const updated = [
      product,
      ...recentSearches.filter((p) => p._id !== product._id),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Fetch trending products
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

  // Search products & suggestions
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setProducts([]);
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const data: Product[] = await client.fetch(
          `*[_type == "product" && (name match $search || description match $search)]{
              _id,
              name,
              slug,
              price,
              discount,
              stock,
              "image": images[0].asset->url
          }[0...6]`,
          { search: `*${query}*` } // ✅ Key must match $search
        );

        setProducts(data);
        setSuggestions(data.slice(0, 5)); // top 5 suggestions
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

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
        ? suggestions[highlightedIndex]
        : products[highlightedIndex];
      selected && handleClickProduct(selected);
    }
  };

  // Highlight matching text
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

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center pt-20">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">

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

            <div className="relative">

              {/* Suggestions - now professional, does NOT cover results */}
              {query && suggestions.length > 0 && (
                <div className="bg-white border-b shadow-sm">
                  {suggestions.map((s, i) => (
                    <p
                      key={s._id}
                      className={`px-4 py-2 cursor-pointer ${highlightedIndex === i ? "bg-gray-100" : ""}`}
                      onClick={() => setQuery(s.name)}
                    >
                      {highlightText(s.name)}
                    </p>
                  ))}
                </div>
              )}

              {/* Product results */}
              {/* Product results */}
              <div className="mt-2">
                {loading && <p className="p-4 text-gray-500">Loading...</p>}

                {/* ❌ Only show this if user typed a query */}
                {!loading && query.trim() !== "" && products.length === 0 && (
                  <p className="p-4 text-center text-gray-500">
                    ❌ No products found for "{query}"
                  </p>
                )}

                {products.map((p) => (
                  <div key={p._id} className="flex gap-4 p-4 border-b">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name || "Product image"}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p
                        onClick={() => handleClickProduct(p)}
                        className="cursor-pointer font-medium"
                      >
                        {p.name}
                      </p>
                      <AddToCartButton product={p as any} />
                    </div>
                    <PriceView price={p.price} discount={p.discount} />
                  </div>
                ))}
              </div>
              {/* Recent searches (only if query empty) */}
              {!query && recentSearches.length > 0 && (
                <div className="p-4 border-b">
                  <p className="font-semibold text-violet-600 mb-2">Recent</p>
                  {recentSearches.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleClickProduct(item)}
                      className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name || "Product image"}
                        className="w-12 h-12 object-cover rounded bg-gray-100"
                      />
                      <p className="text-sm">{item.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Trending products */}
              {!query && (
                <div className="p-4">
                  <p className="font-semibold text-violet-600 mb-2">Trending</p>
                  {trending.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => handleClickProduct(p)}
                      className="flex gap-4 py-3 border-b cursor-pointer"
                    >
                      <img
                        src={p.image || "/placeholder.png"}
                        alt={p.name || "Product image"}
                        className="w-16 h-16"
                      />
                      <p>{p.name}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;