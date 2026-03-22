"use server";

import { client } from "@/sanity/lib/client";

export async function createReview(data: {
    productId: string;
    name: string;
    rating: number;
    comment: string;
}) {
    try {
        console.log("Received review data:", data);

        const review = await client.create({
            _type: "review",
            product: {
                _type: "reference",
                _ref: data.productId,
            },
            name: data.name,
            rating: data.rating,
            comment: data.comment,
            date: new Date().toISOString(),
        });

        console.log("Review created in Sanity:", review);

        return { success: true };
    } catch (error) {
        console.error("Sanity error:", error);
        return { success: false };
    }
}