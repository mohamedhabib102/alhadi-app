"use client";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import ObjectiveCard from '../ui/ObjectiveCard';
import { AxiosRequestConfig } from 'axios';
import instance from '@/utils/axios';



export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide {
  slideID: number;
  slideName: string;
  title: string;
  description: string;
  images: string[];
}



// Main Component
const OurObjectives: React.FC = () => {
      const [slides, setSlides] = useState<Slide[]>([]);

      useEffect(() => {
        fetchSlides()
      }, [])

const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetSlideByName", {
        params: { SlideName: "objectives" },
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
    return (
        <section className="py-20 dark-green-bg  bg-gray-200">
            <div className="container mx-auto px-3.5">
        <motion.h3
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--main-color)] font-bold mb-3 text-right"
        >
           أهدافنا
        </motion.h3>


        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-[700px] font-bold lg:text-2xl text-lg mb-12 ml-auto text-right"
        >
          تنبع رسالتنا من إيماننا العميق بأن الحياة المشتركة تستوجب منا الرعاية والاحترام
        </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {slides.map((item) => (
                        <ObjectiveCard 
                            key={item.slideID}
                            title={item.title}
                            description={item.description}
                            imageUrl={item.images && item.images.length > 0 ? item.images[0] : ""}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurObjectives;