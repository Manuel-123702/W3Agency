"use client";

import React from "react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-6 text-violet-500 text-center">About Us</h1>
            <p className="text-gray-700 mb-6 text-center">
                TechStore is your trusted online shop for electronics, gadgets, and accessories. We are committed to providing quality products and excellent customer service.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">Our Mission</h2>
            <p className="text-gray-700 mb-4">
                Our mission is to deliver high-quality electronics and technology products to customers across Cameroon and beyond, ensuring convenience, reliability, and satisfaction.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">Our Vision</h2>
            <p className="text-gray-700 mb-4">
                To become the leading e-commerce platform for electronics, recognized for quality, innovation, and customer-first service.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">Our Values</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Customer Satisfaction: We put our customers first.</li>
                <li>Quality Products: We only offer products we trust.</li>
                <li>Integrity: We operate with transparency and honesty.</li>
                <li>Innovation: We continuously improve and evolve.</li>
            </ul>

            <p className="text-gray-500 mt-6 text-sm text-center">
                Last updated: March 2026
            </p>
        </div>
    );
}