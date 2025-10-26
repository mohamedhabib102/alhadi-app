"use client";
import React from "react";
import { motion } from "framer-motion";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      <motion.div
        className="w-16 h-16 border-4 border-t-[var(--main-color)] border-gray-200 rounded-full mb-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-black font-semibold text-lg"> جاري التحميل .. </p>
    </div>
  );
};

export default LoadingOverlay;
