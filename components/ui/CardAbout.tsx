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
          className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer transition-all duration-500 hover:shadow-2xl"
           initial={{ y: 60, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}          >
          <div className="overflow-hidden custom_hover">
            <Image
              src={ele.image}
              title="معكم قلوبًا راحمة"
              alt="image"
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-all duration-700 ease-in-out filter grayscale brightness-90"
            />
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default CardAbout;
