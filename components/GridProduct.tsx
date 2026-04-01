"use client";

import Image from "next/image";

type Product = {
    _id: string;
    name: string;
    image: string;
};

export default function GridProduct({ products }: { products: Product[] }) {
    return (
        <div className="overflow-hidden w-full py-10">
            <div className="flex gap-4 animate-marquee">

                {products.map((p: Product) => (
                    <div key={p._id} className="min-w-15">
                        <Image src={p.image} alt={p.name} width={80} height={80} />
                    </div>
                ))}

                {products.map((p: Product) => (
                    <div key={p._id + "2"} >
                        <Image src={p.image} alt={p.name} width={80} height={80} />
                    </div>
                ))}

            </div>
        </div>
    );
}