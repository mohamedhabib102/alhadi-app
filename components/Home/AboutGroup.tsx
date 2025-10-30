"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { getAllSlides2 } from "@/api/getAllSlides"; 
import CardAbout from "../ui/CardAbout";
import { AboutSlide } from "@/types/AboutSlide"; 

const AboutSlider: React.FC = () => {
  const [cards, setCards] = useState<AboutSlide[]>([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const data = await getAllSlides2(); 
      if (data) setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-3.5">
        <div className="text-right">
          <motion.h3
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--main-color)] font-bold mb-1"
          >
            عن الجمعية
          </motion.h3>
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-3xl mb-1"
          >
            فـ لنكن معكم قلوبًا راحمة
          </motion.p>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
          >
          {cards.map((card) => (
            <SwiperSlide key={card.slideID}>
              <CardAbout 
                title={card.title} 
                description={card.description} 
                images={card.images} 
              />
            </SwiperSlide>
          ))}

          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AboutSlider;
