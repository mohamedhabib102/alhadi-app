"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

type Program = {
  title: string;
  description: string;
  image: string;
};

const programs: Program[] = [
  {
    title: "برنامج التبني المسؤول",
    description: "تسهيل عملية تبني الحيوانات الأليفة مع متابعة ضمن رعايتها في بيوت آمنة.",
    image: "/images/new1.jpg",
  },
  {
    title: "حملات التوعية المجتمعية",
    description:
      "ورش عمل ومحاضرات لنشر ثقافة الرفق بالحيوان وأهمية حمايته في الإسلام والمجتمع.",
    image: "/images/new1.jpg",
  },
  {
    title: "عيادة بيطرية متنقلة",
    description:
      "تقديم فحوصات وعلاجات بيطرية مجانية للحيوانات التي لا تجد الرعاية الطبية.",
    image: "/images/new1.jpg",
  },
  {
    title: "شنط إسعاف بيطرية",
    description:
      "توفير شنط إسعافات أولية تحتوي على مستلزمات طبية أساسية لعلاج الحيوانات المصابة في الشوارع.",
    image: "/images/new1.jpg",
  },
  {
    title: "حملات إطعام منتظمة",
    description:
      "توزيع وجبات غذائية ومياه نظيفة للحيوانات الضالة والمهمَلة في مختلف الأحياء.",
    image: "/images/new1.jpg",
  },
];

export default function ProgramsSection() {
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
         برامج ومبادرات عملية لضمان الرعاية الشاملة للكائنات الحية ونشر الوعي بمسؤوليتنا المشتركة تجاهها
        </motion.p>


        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-6xl ml-auto overflow-visible">
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
            {programs.map((program, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-white rounded-2xl select-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={program.image}
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
