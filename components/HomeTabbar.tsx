"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {productType?.map((item) => (


<button  onClick={() => onTabSelect(item?.title)}
              key={item?.title} className={`bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce ${selectedTab === item?.title ? "bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 text-white" : "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white"}`}>
  {item?.title}
</button>

          ))}
        </div>
      </div>
      <Link
        href={"/shop"}
        className="
    relative z-30 overflow-hidden

    px-8 py-4
    rounded-md
    bg-violet-400
    text-white text-2xl font-semibold

    transition-all duration-700

after:content-['']
    after:absolute
    after:bottom-0 after:left-5
    after:h-1 after:w-1
    after:translate-y-full
    after:rounded-md
    after:bg-blue-800
    after:-z-10

    after:transition-all after:duration-700
    hover:after:scale-[300]
    [text-shadow:3px_5px_2px_#ddd6fe]
    hover:[text-shadow:2px_2px_2px_#fda4af]
  "      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabbar;
