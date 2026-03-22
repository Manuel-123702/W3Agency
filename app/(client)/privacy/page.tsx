"use client";

import React from "react";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-6 text-violet-500 text-center">Privacy Policy</h1>

            <p className="text-gray-700 mb-4">
                Your privacy is important to us. This policy explains what personal information we collect, how we use it, and your rights regarding your information.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">1. Information Collection</h2>
            <p className="text-gray-700 mb-4">
                We collect personal information such as your name, email address, and payment details when you use our services.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">2. Use of Information</h2>
            <p className="text-gray-700 mb-4">
                Your information is used to provide services, process orders, send updates, and improve your experience on our website.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">3. Data Security</h2>
            <p className="text-gray-700 mb-4">
                We implement security measures to protect your personal data from unauthorized access, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">4. Third-Party Sharing</h2>
            <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share data with trusted third parties for order fulfillment and legal compliance.
            </p>

            <p className="text-gray-500 mt-6 text-sm">
                Last updated: March 2026
            </p>
        </div>
    );
}