"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

const Newsletter = () => {
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setLoading(true);

        emailjs.sendForm(
            "service_1otlihd",
            "template_2teob59",
            form.current,
            "iyUgR1ooC52JCktIC"
        )
            .then(() => {
                toast.success("Subscribed successfully!");
                form.current?.reset();
                setLoading(false);
            }, (error) => {
                toast.error("Error: " + error.text);
                setLoading(false);
            });
    };

    return (
        <section className="bg-deal-bg py-12 px-5 rounded-2xl mx-auto max-w-7xl my-10 border border-violet-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-violet-600">Join the W3Agency Club</h2>
                    <p className="text-lightColor">Get deals sent straight to your inbox.</p>
                </div>

                <form ref={form} onSubmit={handleSubscribe} className="relative w-full max-w-md">
                    <input
                        type="email"
                        name="user_email" // Changed name to 'user_email' for clarity
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 rounded-full border border-violet-500 text-black outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                        required
                    />

                    {/* These hidden fields send the data to your EmailJS Template */}
                    <input type="hidden" name="user_name" value="Manuel" />
                    <input type="hidden" name="subject_type" value="Subscription" />

                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-full disabled:bg-gray-400 transition-colors min-w-30"
                    >
                        {/* Fixed: Now shows "Subscribing..." when loading */}
                        {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;