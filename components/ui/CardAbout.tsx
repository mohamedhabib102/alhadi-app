"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface Slide {
  slide2ID: number;
  title: string;
  description: string;
  images: string[];
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

const CardAbout: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetSlide2", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.data && Array.isArray(res.data)) {
        setSlides(res.data);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <>
      {slides.map((ele) => (
        <motion.div
          key={ele.slide2ID}
          className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer transition-all duration-500 hover:shadow-2xl"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden custom_hover">
            {ele.images && ele.images.length > 0 && (
              <Image
                src={ele.images[0]} // ✅ تصحيح هنا
                title={ele.title}
                alt={ele.title}
                width={600}
                height={400}
                className="w-full h-[200px] object-cover transition-all duration-700 ease-in-out filter grayscale brightness-90 hover:scale-105"
              />
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default CardAbout;
