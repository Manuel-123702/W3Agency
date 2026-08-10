"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Product = {
    _id: string;
    name: string;
    images?: any[];
};

export default function GridProduct({ products }: { products: Product[] }) {
    // Don't render if no products available
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="overflow-hidden w-full py-10">
            <div className="flex gap-4 animate-marquee">
                {products.map((p: Product) => {
                    const imageUrl = p.images && p.images[0] ? urlFor(p.images[0]).url() : null;
                    if (!imageUrl) return null;
                    
                    return (
                        <div key={p._id} className="min-w-15">
                            <Image src={imageUrl} alt={p.name || "Product"} width={80} height={80} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}