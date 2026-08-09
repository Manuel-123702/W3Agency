"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Mail, Gift, Bell, Zap } from "lucide-react";

const Newsletter = () => {
    const { user, isSignedIn } = useUser();
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

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
        <section className="bg-gradient-to-r from-violet-500 via-light-blue-400 to-blue-500 py-16 px-5 rounded-2xl mx-auto max-w-7xl my-8 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-2 mb-4">
                        <Gift className="w-8 h-8 text-yellow-300" />
                        <h2 className="text-3xl font-bold text-white">SKY Member Club</h2>
                    </div>
                    <p className="text-white/90 mb-6">
                        {isSignedIn
                            ? `Welcome back, ${fullName}! Get exclusive deals on electronics, appliances, and tech gear.`
                            : "Join our exclusive club for member-only deals on premium electronics, home appliances, and more."}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-white/80">
                            <Bell className="w-5 h-5" />
                            <span className="text-sm">Early Access</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <Zap className="w-5 h-5" />
                            <span className="text-sm">Flash Deals</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <Mail className="w-5 h-5" />
                            <span className="text-sm">Exclusive Offers</span>
                        </div>
                    </div>

                    <p className="text-white/70 text-sm">
                        Get notified about new arrivals, special promotions, and WhatsApp-only pricing for premium electronics.
                    </p>
                </div>

                <div className="w-full lg:w-1/2 max-w-md">
                    {isSignedIn ? (
                        <form ref={form} onSubmit={handleSubscribe} className="relative w-full">
                            <label htmlFor="user_email" className="sr-only">Email Address</label>
                            <input
                                id="user_email"
                                type="email"
                                name="user_email"
                                readOnly
                                value={user?.primaryEmailAddress?.emailAddress || ""}
                                className="w-full px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder-white/50 outline-none"
                            />
                            <input type="hidden" name="user_name" value={fullName} />

                            <Button
                                type="submit"
                                disabled={loading}
                                className={`absolute right-2 top-2 bottom-2 px-8 rounded-full transition-all duration-300 font-bold text-white
                                    ${loading
                                        ? "bg-white/30 cursor-not-allowed"
                                        : "bg-white text-violet-600 hover:bg-white/90"
                                    }`}
                            >
                                {loading ? "Subscribing..." : "Subscribe Now"}
                            </Button>
                        </form>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="w-full py-4 bg-white text-violet-600 rounded-full font-bold shadow-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                                <Mail className="w-5 h-5" />
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