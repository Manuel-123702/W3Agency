"use server";

import { client } from "@/sanity/lib/client";

export async function createAddress(data: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}) {
    await client.create({
        _type: "address",
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        createdAt: new Date().toISOString(),
    });
}