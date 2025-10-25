"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type List = {
  id: number;
  image: string;
};

interface CardList {
  data: List[];
}

const CardAbout: React.FC<CardList> = ({ data }) => {
  return (
    <>
      {data.map((ele) => (
        <motion.div
          key={ele.id}
          className="relative overflow-hidden rounded-2xl bg-white shadow-md group cursor-pointer transition-all duration-500 hover:shadow-2xl"
           initial={{ y: 60, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}          >
          <div className="overflow-hidden">
            <Image
              src={ele.image}
              title="معكم قلوبًا راحمة"
              alt="image"
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-all duration-700 ease-in-out filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>
      ))}
    </>
  );
};

export default CardAbout;
