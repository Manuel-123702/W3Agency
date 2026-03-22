"use client";

import { createReview } from "@/actions/createReviews";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductTabsProps {
  product: { _id: string; name?: string };
  reviews: Review[];
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

export default function ProductTabs({ product, reviews }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();
  const { user } = useUser();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="mt-10">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-md p-1">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex-1 py-2 text-sm rounded-md transition ${activeTab === "description"
              ? "bg-white shadow-sm border border-gray-200"
              : "text-gray-500"
            }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("additional")}
          className={`flex-1 py-2 text-sm rounded-md transition ${activeTab === "additional"
              ? "bg-white shadow-sm border border-gray-200"
              : "text-gray-500"
            }`}
        >
          Additional Information
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 py-2 text-sm rounded-md transition ${activeTab === "reviews"
              ? "bg-white shadow-sm border border-gray-200"
              : "text-gray-500"
            }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-sm text-gray-600">

        {/* Description */}
        {activeTab === "description" && (
          <div className="space-y-3">
            <p>{product.name ?? "Product description here"}</p>
          </div>
        )}

        {/* Additional Info */}
        {activeTab === "additional" && (
          <div className="border rounded-md divide-y">
            <InfoRow label="Processor" value="Intel Core i7 (12th Gen)" />
            <InfoRow label="RAM" value="16GB DDR4" />
            <InfoRow label="Storage" value="512GB SSD" />
            <InfoRow label="Display" value="15.6” Full HD (1920×1080)" />
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-6">

            {/* Review Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await createReview({
                  productId: product._id,
                  name: user?.firstName || "Anonymous",
                  rating,
                  comment,
                });

                setRating(0);
                setComment("");

                router.refresh();
              }}
            >
              <h3 className="font-semibold mb-2">Write a Review</h3>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Comment */}
              <textarea
                value={comment}
                placeholder="Write your review..."
                className="w-full border p-2 rounded mb-3"
                onChange={(e) => setComment(e.target.value)}
              />

              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">

              {reviews.length === 0 && (
                <p className="text-gray-500">No reviews yet.</p>
              )}

              {reviews.map((review) => (
                <div key={review._id} className="border p-3 rounded">

                  <p className="font-semibold">{review.name}</p>

                  <div className="text-yellow-400">
                    {"★".repeat(review.rating)}
                  </div>

                  <p className="mt-1">{review.comment}</p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.date).toLocaleDateString()}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}
      </div>
    </div>
  );
}