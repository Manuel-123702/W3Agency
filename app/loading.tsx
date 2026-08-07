"use client";

import React from "react";
import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg"
      >
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Preparing your experience...
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          We are loading products and your next step for WhatsApp ordering.
        </p>
      </motion.div>
    </div>
  );
}
