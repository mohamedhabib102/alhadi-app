"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";



export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide3 {
  slide3ID: number;
  title: string;
  description: string;
  imageUrl: string;
}


export default function ProgramsSection() {
    const [slides, setSlides] = useState<Slide3[]>([]);


    useEffect(() => {
      fetchSlides();
    }, [])

    const fetchSlides = async () => {
      try {
        const res = await instance.get("/api/Donations/GetAllSlides3", {
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
    <section className="bg-gray-200 py-16 px-4 text-center">
      <div className="container mx-auto px-3.5">
        



        <motion.h3
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--main-color)] font-bold mb-3 text-right"
        >
          البرامج والمبادرات
        </motion.h3>


        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-96 font-bold text-3xl mb-12 ml-auto text-right"
        >
                تسعى الجمعية من خلال برامجها ومبادراتها إلى ترسيخ قيم الدين الإسلامي الحنيف، 
        ونشر سنة النبي ﷺ قولًا وعملًا، 
        عبر مشاريع تعليمية وتوعوية تُسهم في بناء مجتمعٍ يسير على الهدي والاعتدال.

        </motion.p>


        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative ml-auto overflow-visible">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {slides.map((program, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-white rounded-2xl select-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    className="w-full h-56 object-cover"
                    width={300}
                    height={200}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>

            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
