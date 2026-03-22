"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        emailjs
            .sendForm(
                "service_1otlihd",  // replace with your SERVICE_ID
                "template_2teob59", // replace with your TEMPLATE_ID
                form.current,
                "iyUgR1ooC52JCktIC" // replace with your PUBLIC_KEY
            )
            .then(
                () => {
                    alert("Message sent successfully!");
                    form.current?.reset();
                },
                (error) => {
                    console.error(error.text);
                    alert("Failed to send message.");
                }
            );
    };

    return (
        <div className="max-w-6xl mx-auto px-6">

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 text-violet-500 text-center">Contact Us</h1>
            <p className="text-blue-400 text-center mb-12">
                Have questions? Our team is here to help you.
            </p>

            <div className="grid md:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div className="space-y-6">
                    <h2 className="text-2xl text-blue-500 font-semibold">Get in Touch</h2>

                    <div className="space-y-3 text-gray-600">
                        <p><strong>Email:</strong> support@techstore.com</p>
                        <p><strong>Phone:</strong> +237 650 921 917</p>
                        <p><strong>Address:</strong> Douala, Cameroon</p>
                        <p><strong>Business Hours:</strong> Mon - Sat (9:00AM - 6:00PM)</p>
                    </div>

                    <p className="text-gray-500">
                        Our support team usually responds within 24 hours.
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="space-y-4 border p-6 rounded-lg shadow-sm"
                >
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="w-full border rounded p-2 mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="w-full border rounded p-2 mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Message</label>
                        <textarea
                            name="message"
                            rows={5}
                            placeholder="Write your message..."
                            className="w-full border rounded p-2 mt-1"
                            required
                        />
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                        Send Message
                    </button>
                </form>

            </div>

        </div>
    );
}