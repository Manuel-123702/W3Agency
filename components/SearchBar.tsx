"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions from Sanity
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setError("");
        setHighlightedIndex(-1);
        return;
      }

      setLoading(true);
      try {
        const data: Product[] = await client.fetch(
          `*[_type == "product" && name match $query]{
            _id,
            name,
            slug
          }[0...5]`,
          { query: `*${query}*` } as Record<string, string>
        );

        if (data.length === 0) {
          setError("No products found");
          setSuggestions([]);
          setHighlightedIndex(-1);
        } else {
          setError("");
          setSuggestions(data);
        }

        setOpen(true);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
        setSuggestions([]);
        setOpen(true);
        setHighlightedIndex(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?query=${query}`);
    setOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClickProduct = (slug: string) => {
    router.push(`/product/${slug}`);
    setOpen(false);
    setQuery("");
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setError("");
    setOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        handleClickProduct(suggestions[highlightedIndex].slug.current);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="relative px-1">
      {/* Animated Search Bar */}
      <form
        onSubmit={handleSubmit}
        className={`
          flex items-center 
          overflow-hidden 
          w-11 h-11
          bg-[#4070f4] 
          rounded-full 
          shadow-[2px_2px_15px_rgba(0,0,0,0.1)]
          transition-all duration-300
          ${open ? "w-64" : "hover:w-64"}
        `}
      >
        {/* Search Icon */}
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

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          className="flex-1 outline-none bg-transparent text-white text-sm px-3 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-white pr-3 pl-1 hover:text-red-500"
          >
            &#x2715;
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-shop_btn_dark_green border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {loading && <p className="p-3 text-gray-500">Loading...</p>}
          {error && <p className="p-3 text-red-500">{error}</p>}
          {suggestions.map((product, index) => (
            <div
              key={product._id}
              onClick={() => handleClickProduct(product.slug.current)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${highlightedIndex === index ? "bg-gray-200" : ""
                }`}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;