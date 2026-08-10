import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  // Don't render the categories section if there are no categories
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-white via-blue-50 to-white border border-blue-100 my-10 md:my-20 p-5 lg:p-7 rounded-2xl shadow-lg">
      <Title className="border-b pb-3">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <Link key={category?._id} href={`/category/${category?.slug?.current}`} className="group">
            <div className="bg-white border border-blue-100 p-5 flex items-center gap-3 rounded-xl hover:shadow-md transition-all duration-300 hover:border-violet-300">
              {category?.image && (
                <div className="overflow-hidden border border-blue-200 hover:border-violet-400 hoverEffect w-24 h-24 p-2 rounded-lg bg-gradient-to-br from-blue-50 to-violet-50">
                  <Image
                    src={urlFor(category?.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </div>
              )}
              <div className="space-y-1 flex-1">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">{category?.title}</h3>
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-violet-700">{`(${(category as any)?.productCount || 0})`}</span>{" "}
                  items Available
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
