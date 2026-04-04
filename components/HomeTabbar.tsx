"use client";
import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full py-4">
      {/* Main Container: 
          - flex-wrap allows items to move to the next line (multiple columns)
          - justify-center on mobile keeps it looking balanced
      */}
      <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center md:justify-start w-full md:w-auto">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`px-5 py-2.5 rounded-full font-bold shadow-md transition-all duration-300 text-sm md:text-base 
              ${selectedTab === item?.title
                ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white scale-105"
                : "bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 text-white opacity-80 hover:opacity-100"
              }`}
          >
            {item?.title}
          </button>
        ))}
      </div>

      {/* "See all" Button: Stays aligned but doesn't overlap */}
      <Link
        href={"/shop"}
        className="
          relative z-30 overflow-hidden
          shrink-0
          px-8 py-3 rounded-md
          bg-violet-400 text-white text-xl font-semibold
          transition-all duration-700
          after:content-[''] after:absolute after:bottom-0 after:left-5
          after:h-1 after:w-1 after:translate-y-full after:rounded-md
          after:bg-blue-800 after:-z-10
          after:transition-all after:duration-700
          hover:after:scale-[300]
          [text-shadow:3px_5px_2px_#ddd6fe]
          hover:[text-shadow:2px_2px_2px_#fda4af]
          self-center md:self-auto
        "
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabbar;