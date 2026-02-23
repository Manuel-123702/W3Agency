"use client";

import { useState } from "react";

interface ReviewProps {
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between py-2">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

function Review({ name, date, rating, text }: ReviewProps) {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{name}</h4>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-10">
      <div className="flex bg-gray-100 rounded-md p-1">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex-1 py-2 text-sm rounded-md transition ${
            activeTab === "description"
              ? "bg-white shadow-sm border border-gray-200"
              : "text-gray-500"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("additional")}
          className={`flex-1 py-2 text-sm rounded-md transition ${
            activeTab === "additional"
              ? "bg-white shadow-sm border border-gray-200"
              : "text-gray-500"
          }`}
        >
          Additional Information
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 py-2 text-sm rounded-md transition ${
            activeTab === "reviews"
              ? "bg-white shadow-sm border border-gray-200"
              : "text-gray-500"
          }`}
        >
          Reviews
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        {activeTab === "description" && (
          <div className="space-y-3">
            <p>
              This high-performance laptop is designed for professionals,
              students, and everyday users who demand speed, reliability, and a
              sleek modern design.
            </p>

            <p>
              Powered by the latest generation processor, fast SSD storage, and
              a vibrant Full HD display, this device delivers smooth
              multitasking, rapid boot times, and an immersive viewing
              experience.
            </p>

            <p>
              Whether you are working, streaming, designing, or gaming, this
              laptop provides the perfect balance of performance, portability,
              and battery efficiency.
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="border rounded-md divide-y">
            <InfoRow label="Processor" value="Intel Core i7 (12th Gen)" />
            <InfoRow label="RAM" value="16GB DDR4" />
            <InfoRow label="Storage" value="512GB SSD" />
            <InfoRow label="Display" value="15.6” Full HD (1920×1080)" />
            <InfoRow label="Graphics" value="Intel Iris Xe Graphics" />
            <InfoRow label="Battery Life" value="Up to 10 Hours" />
            <InfoRow label="Operating System" value="Windows 11" />
            <InfoRow label="Weight" value="1.75 kg" />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <Review
              name="Michael T."
              date="January 12, 2026"
              rating={5}
              text="Excellent laptop. Very fast performance and the display quality is amazing. Perfect for my office work and multimedia use."
            />

            <Review
              name="Sarah K."
              date="December 28, 2025"
              rating={4}
              text="Great value for the price. Battery life is good and the laptop feels very premium. Would definitely recommend."
            />

            <Review
              name="Daniel M."
              date="December 10, 2025"
              rating={5}
              text="Super smooth experience. Boots quickly and runs multiple applications without any lag. Perfect for students."
            />

            <Review
              name="Anthony R."
              date="November 25, 2025"
              rating={4}
              text="Solid build quality and performance. The keyboard is comfortable for long typing sessions."
            />

            <Review
              name="Linda P."
              date="November 02, 2025"
              rating={5}
              text="Very lightweight and easy to carry. Perfect laptop for travel and remote work."
            />

            <Review
              name="Chris D."
              date="October 18, 2025"
              rating={5}
              text="Absolutely love it. Smooth performance, great design, and silent operation. Highly satisfied."
            />
          </div>
        )}
      </div>
    </div>
  );
}
