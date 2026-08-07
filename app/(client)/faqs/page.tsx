"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

const faqs = [
  {
    question: "How can I request a quote?",
    answer: "Browse products, add them to your cart, and click the private quote button. We will open WhatsApp so we can discuss pricing and availability privately.",
  },
  {
    question: "Do you offer direct purchase options?",
    answer: "Yes. Prices are shared privately through WhatsApp so we can tailor the offer to your needs, quantity, and delivery requirements.",
  },
  {
    question: "Can I ask about delivery and availability?",
    answer: "Absolutely. You can request a quote for any product and we will confirm stock, delivery, and the best private price for you.",
  },
  {
    question: "What happens after I request a quote?",
    answer: "A WhatsApp chat opens with your selected products and total so we can continue the conversation and finalize the deal with you directly.",
  },
];

export default function FaqsPage() {
  return (
    <div className="mx-auto -mt-12 max-w-5xl px-6 py-10">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Client-first experience</p>
        <h1 className="text-4xl font-bold text-slate-900">Frequently asked questions</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">Everything you need to know about shopping, quoting, and discussing custom pricing with our team.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{faq.question}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </div>
              <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}