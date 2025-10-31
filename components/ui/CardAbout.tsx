"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardAboutProps {
  title: string;
  description: string;
  images: string[];
}

const CardAbout: React.FC<CardAboutProps> = ({ title, description, images }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-500"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {images && images.length > 0 && (
        <Image
          src={images[0]}
          title={title}
          alt={title}
          width={600}
          height={400}
          className="w-full h-[200px] object-cover"
        />
      )}

      <div className="absolute inset-0 z-40 flex flex-col justify-end p-4 bg-black/45 text-white">
        <h3 className="text-[22px] font-bold">{title}</h3>
        <p className="text-[17px] font-medium">{description}</p>
      </div>
    </motion.div>
  );
};

export default CardAbout;
