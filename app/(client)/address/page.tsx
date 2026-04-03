"use client";

import { useState } from "react";
import { createAddress } from "@/actions/createaddress";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AddressPage() {
    const { user } = useUser();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await createAddress({
            ...form,
            email: user?.emailAddresses[0].emailAddress || ""
        });

        router.push("/cart");
    };

    return (
        <div className="max-w-xl mx-auto p-6 -mt-12 bg-shop_light_bg shadow-lg rounded-lg">

            <h1 className="text-2xl font-semibold text-violet-500 mb-6 text-center">
                Add Delivery Address
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm text-shop_light_green font-semi-bold mb-1">
                        Full Name
                    </label>
                    <input
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your full name"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm text-shop_light_green font-semi-bold mb-1">
                        Street Address
                    </label>
                    <input
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="123 Main Street"
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm text-shop_light_green font-semi-bold mb-1">
                            City
                        </label>
                        <input
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Douala"
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-shop_light_green font-semi-bold mb-1">
                            State
                        </label>
                        <input
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Littoral"
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                        />
                    </div>

                </div>

                <div>
                    <label className="block text-sm text-shop_light_green font-medium mb-1">
                        ZIP Code
                    </label>
                    <input
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="00000"
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-white font-bold py-2 rounded-md bg-blue-400 hover:bg-violet-400 transition"
                >
                    Save Address
                </button>

            </form>

        </div>
    );
}