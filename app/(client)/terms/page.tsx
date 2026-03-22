"use client";

import React from "react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-violet-500  mb-6 text-center">Terms & Conditions</h1>

            <p className="text-gray-700 mb-4">
                Welcome to W3Agency. By using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">1. Use of Website</h2>
            <p className="text-gray-700 mb-4">
                Users must use the website in accordance with applicable laws and not engage in any activity that may harm or disrupt the site.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">2. Orders and Payments</h2>
            <p className="text-gray-700 mb-4">
                All orders are subject to acceptance and availability. Payments must be completed through our authorized channels.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">3. Returns and Refunds</h2>
            <p className="text-gray-700 mb-4">
                Returns are accepted under our return policy. Refunds will be processed according to the terms described on the website.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">4. Privacy</h2>
            <p className="text-gray-700 mb-4">
                We respect your privacy. All personal information collected is used according to our Privacy Policy.
            </p>

            <p className="text-gray-500 mt-6 text-sm">
                Last updated: March 2026
            </p>
        </div>
    );
}