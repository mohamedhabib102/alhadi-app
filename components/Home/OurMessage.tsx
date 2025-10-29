"use client"
import React, { useEffect, useState } from 'react';
import MessageCard from '@/components/ui/MessageCard';
import { motion } from "framer-motion";
import { AxiosRequestConfig } from 'axios';
import instance from '@/utils/axios';


export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide4 {
  slide4ID: number;
  title: string;
  description: string;
  imageUrl: string;
}





// Main Component
const OurMessage: React.FC = () => {
      const [slides, setSlides] = useState<Slide4[]>([]);


      useEffect(() => {
        fetchSlides()
      }, [])

      const fetchSlides = async () => {
        try {
          const res = await instance.get("/api/Donations/GetAllSlides4", {
            skipAuth: true,
          } as CustomAxiosRequestConfig);
    
          if (Array.isArray(res.data)) {
            setSlides(res.data);
          } else {
            setSlides([]);
          }
        } catch (error) {
          console.error("Error fetching slides:", error);
        }
      };
    return (
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-3.5">
        <motion.h3
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--main-color)] font-bold mb-3 text-right"
        >
           رسالتنا
        </motion.h3>


        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-96 font-bold text-3xl mb-12 ml-auto text-right"
        >
          رسالتنا أن نُجسّد معاني الرحمة التي دعا إليها ديننا الحنيف، فكل كائنٍ حيٍّ يستحق الحب والرعاية التي تمنحه الطمأنينة والسعادة
        </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {slides.map((item) => (
                        <MessageCard 
                          key={item.slide4ID}
                          title={item.title}
                          description={item.description}
                          imageUrl={item.imageUrl}
                        />

                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurMessage; // Export the component