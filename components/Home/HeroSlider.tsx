"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SliderContent } from "@/types/Slider";
import { useEffect, useState } from "react";
import { getAllSlides } from "@/api/getAllSlides";




const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<SliderContent[]>([])


  useEffect(() => {
    fetchSlides();
  }, [])

  const fetchSlides = async () => {
    try {
      const data = await getAllSlides();
      if (data) setSlides(data)


    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="w-full lg:h-[750px] h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.slideID}>
            <div
              className="relative w-full h-full flex items-center justify-center text-center text-white"
              style={{
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute top-32 md:top-48 lg:top-64 right-4 md:right-8 lg:right-10 text-right z-10 w-[90%] md:w-[80%] lg:max-w-2xl px-2 md:px-4">
                <motion.h2
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-[var(--main-color)]"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                  }}
                  className="text-2xl md:text-3xl lg:text-5xl leading-[2rem] md:leading-[2.5rem] lg:leading-[3.5rem]"
                >
                  {slide.description}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
