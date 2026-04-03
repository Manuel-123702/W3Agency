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
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ✅ CLOSE & RESET
  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setProducts([]);
    setHighlightedIndex(-1);
  };

  // ✅ OUTSIDE CLICK FIX
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ RECENT SEARCHES
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const saveRecent = (value: string) => {
    const updated = [value, ...recentSearches.filter((v) => v !== value)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // ✅ TRENDING PRODUCTS
  useEffect(() => {
    const fetchTrending = async () => {
      const data = await client.fetch(`
        *[_type == "product"] | order(_createdAt desc)[0...5]{
          _id, name, slug, price, discount, stock,
          "image": images[0].asset->url
        }
      `);
      setTrending(data);
    };
    fetchTrending();
  }, []);

  // ✅ DEBOUNCE SEARCH + SMART SEARCH
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);

      try {
        const data = await client.fetch(
          `*[_type == "product" && (
            name match $query ||
            description match $query
          )]{
            _id, name, slug, price, discount, stock,
            "image": images[0].asset->url
          }[0...6]`,
          { query: `*${query}*` }
        );

        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  // ✅ CLICK PRODUCT
  const handleClickProduct = (slug: string, name: string) => {
    saveRecent(name);
    router.push(`/product/${slug}`);
    closeSearch();
  };

  // ✅ KEYBOARD NAVIGATION
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!products.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < products.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : products.length - 1
      );
    }

    if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        const p = products[highlightedIndex];
        handleClickProduct(p.slug.current, p.name);
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative px-1">

      {/* ✅ ORIGINAL SEARCH BAR (NO LOOP) */}
      <form
        className={`flex items-center overflow-hidden w-11 h-11 bg-[#4070f4] rounded-full transition-all duration-300 ${
          open ? "w-64" : "hover:w-64"
        }`}
      >
        <div className="flex items-center justify-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="text-white fill-current"
          >
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

      {/* ✅ FULL MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center pt-20">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl">

            {/* HEADER */}
            <div className="flex justify-between p-4 border-b">
              <h2 className="font-semibold">Search Products</h2>
              <button onClick={closeSearch}>✕</button>
            </div>

            {/* INPUT */}
            <div className="p-4 border-b">
              <input
                autoFocus
                type="text"
                placeholder="Search your product here..."
                className="w-full border px-4 py-2 rounded-md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="max-h-96 overflow-y-auto">

              {/* RECENT */}
              {!query && recentSearches.length > 0 && (
                <div className="p-4 border-b">
                  <p className="font-semibold mb-2">Recent</p>
                  {recentSearches.map((item, i) => (
                    <p
                      key={i}
                      onClick={() => setQuery(item)}
                      className="cursor-pointer hover:text-black text-gray-500"
                    >
                      🔍 {item}
                    </p>
                  ))}
                </div>
              )}

              {/* TRENDING */}
              {!query && (
                <div className="p-4">
                  <p className="font-semibold mb-2">Trending</p>
                  {trending.map((p) => (
                    <div
                      key={p._id}
                      onClick={() =>
                        handleClickProduct(p.slug.current, p.name)
                      }
                      className="flex gap-4 py-3 border-b cursor-pointer"
                    >
                      <img src={p.image} className="w-16 h-16" />
                      <p>{p.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* RESULTS */}
              {query && (
                <>
                  {loading && <p className="p-4">Loading...</p>}

                  {products.map((p, index) => (
                    <div
                      key={p._id}
                      className={`flex gap-4 p-4 border-b ${
                        highlightedIndex === index ? "bg-gray-100" : ""
                      }`}
                    >
                      <img src={p.image} className="w-20 h-20 rounded" />

                      <div className="flex-1">
                        <p
                          onClick={() =>
                            handleClickProduct(p.slug.current, p.name)
                          }
                          className="cursor-pointer font-medium"
                        >
                          {p.name}
                        </p>

                        <AddToCartButton product={p as any} />
                      </div>

                      <PriceView price={p.price} discount={p.discount} />
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