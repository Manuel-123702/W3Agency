"use client";

import React from "react";
import { motion } from "motion/react";
import { Zap, ShoppingBag, MessageCircle, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-500 via-light-blue-400 to-blue-500 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-center shadow-2xl"
      >
        {/* Animated Logo/Icon */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mx-auto mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
            <div className="relative bg-white/20 rounded-full p-6">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          SKY Electronics
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/90 text-sm mb-6"
        >
          Loading your premium shopping experience...
        </motion.p>

        {/* Loading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-3 mb-2">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/80 text-xs">Products</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-3 mb-2">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/80 text-xs">WhatsApp</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 rounded-full p-3 mb-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/80 text-xs">Premium</span>
          </div>
        </motion.div>

        {/* Loading Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-white/70 text-sm"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-white rounded-full"
              />
            ))}
          </div>
          <span>Preparing your experience</span>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-white/60 text-xs"
        >
          Electronics • Appliances • Tech Gear
        </motion.p>
      </motion.div>
    </div>
  );
}
