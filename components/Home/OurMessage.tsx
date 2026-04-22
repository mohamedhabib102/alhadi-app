"use client"
import React, { useEffect, useState } from 'react';
import MessageCard from '@/components/ui/MessageCard';
import { motion } from "framer-motion";
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
const OurMessage: React.FC = () => {
      const [slides, setSlides] = useState<Slide[]>([]);


      useEffect(() => {
        fetchSlides()
      }, [])

      const fetchSlides = async () => {
        try {
          const res = await instance.get("/api/Donations/GetSlideByName", {
            params: { SlideName: "message" },
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
          className="lg:w-[700px] font-bold lg:text-2xl text-lg mb-12 ml-auto text-right"
        >
          رسالتنا أن نجسّد معاني الرحمة التي جاء بها ديننا الحنيف، بنشر الخير والعطاء، وتقديم الرعاية لكل مخلوقٍ حيٍّ يستحق الاهتمام والعطف، بما يحقق الطمأنينة والسعادة ويعزز القيم النبوية في المجتمع
        </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {slides.map((item) => (
                        <MessageCard 
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

export default OurMessage;