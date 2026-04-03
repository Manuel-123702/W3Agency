"use client";

import React from "react";

const faqs = [
    {
        question: "How can I place an order?",
        answer: "You can place an order by browsing products, adding them to your cart, and completing checkout using our secure payment system."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept major credit/debit cards, mobile money, and other secure online payment methods."
    },
    {
        question: "How can I track my order?",
        answer: "After placing an order, you can track it from your account dashboard under 'My Orders'."
    },
    {
        question: "What is the return policy?",
        answer: "You can return products within 7 days of delivery if they are unused and in original packaging."
    },
];

export default function FaqsPage() {
    return (
        <div className="max-w-4xl mx-auto -mt-12 px-6">
            <h1 className="text-4xl font-bold mb-6 text-violet-500 text-center">Frequently Asked Questions</h1>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-2">{faq.question}</h2>
                        <p className="text-gray-700">{faq.answer}</p>
                    </div>
                ))}
            </div>

            <p className="text-gray-500 mt-6 text-sm">
                Last updated: March 2026
            </p>
        </div>
    );
}