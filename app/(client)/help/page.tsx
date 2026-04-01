"use client";

import React from "react";

const helpTopics = [
    {
        question: "How do I contact customer support?",
        answer: "You can contact us via the Contact page using the form, or email us directly at tessohmanuel@gmail.com."
    },
    {
        question: "How can I track my order?",
        answer: "After placing an order, go to 'My Orders' in your account to view order status and tracking information."
    },
    {
        question: "What if I receive a damaged product?",
        answer: "Please contact our support team immediately with photos of the product. We will guide you through the return or replacement process."
    },
    {
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled before they are shipped. Please contact support as soon as possible to cancel an order."
    },
];

export default function HelpPage() {
    return (
        <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-6 text-violet-500 text-center">Help Center</h1>
            <p className="text-gray-700 mb-12 text-center">
                Find answers to common questions and get assistance from our support team.
            </p>

            <div className="space-y-6">
                {helpTopics.map((topic, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-2">{topic.question}</h2>
                        <p className="text-gray-700">{topic.answer}</p>
                    </div>
                ))}
            </div>

            <p className="text-gray-500 mt-6 text-sm text-center">
                If you need further assistance, please visit the <a href="/contact" className="text-blue-600 hover:underline">Contact page</a>.
            </p>
        </div>
    );
}