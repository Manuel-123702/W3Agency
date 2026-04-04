"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { useUser, SignInButton } from "@clerk/nextjs"; // Added SignInButton

const Newsletter = () => {
    const { user, isSignedIn } = useUser();
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    // This ensures we always have a real name from Clerk
    const fullName = user?.fullName || user?.firstName || "Member";

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
                toast.success(`Welcome to the club, ${fullName}!`);
                form.current?.reset();
                setTimeout(() => setLoading(false), 2000);
            })
            .catch((error) => {
                toast.error("Error: " + error.text);
                setLoading(false);
            });
    };

    return (
        <section className="bg-deal-bg py-12 px-5 rounded-2xl mx-auto max-w-7xl my-10 border border-violet-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-violet-600">Exclusive W3Agency Member Club</h2>
                    <p className="text-lightColor">
                        {isSignedIn
                            ? `Welcome back, ${fullName}! Get your member-only deals.`
                            : "Login to subscribe and unlock exclusive electronics deals."}
                    </p>
                </div>

                <div className="w-full max-w-md">
                    {isSignedIn ? (
                        /* SHOW FORM ONLY IF LOGGED IN */
                        <form ref={form} onSubmit={handleSubscribe} className="relative w-full">
                            <input
                                type="email"
                                name="user_email"
                                readOnly // User cannot change it, ensuring it matches their Clerk account
                                value={user?.primaryEmailAddress?.emailAddress || ""}
                                className="w-full px-6 py-4 rounded-full border border-violet-500 bg-gray-50 text-gray-500 outline-none cursor-not-allowed"
                            />

                            {/* DYNAMIC NAME FROM CLERK */}
                            <input type="hidden" name="user_name" value={fullName} />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`absolute right-2 top-2 bottom-2 px-6 rounded-full transition-all duration-300 font-medium 
                                    ${loading
                                        ? "bg-gray-400 text-white cursor-not-allowed animate-pulse"
                                        : "bg-violet-600 hover:bg-violet-700 text-white"
                                    }`}
                                style={{ minWidth: "130px" }}
                            >
                                {loading ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                    ) : (
                        /* SHOW LOGIN BUTTON IF NOT LOGGED IN */
                        <SignInButton mode="modal">
                            <button className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-bold shadow-md transition-all active:scale-95">
                                Sign In to Subscribe
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Newsletter;