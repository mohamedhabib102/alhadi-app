"use client";
import { useEffect, useState } from "react";
import CustomHeader from "@/components/ui/CustomHeader";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";
import { AxiosRequestConfig } from "axios";
import instance from "@/utils/axios";
import Image from "next/image";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide {
  slideID: number;
  slideName: string;
  title: string;
  description: string;
  images: string[];
}

const EleServices: React.FC = () => {
  const [services, setServices] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const SLIDE_NAME = "services";

  const getAllServices = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/api/Donations/GetSlideByName", {
        params: { SlideName: SLIDE_NAME },
        skipAuth: true
      } as CustomAxiosRequestConfig);

      if (res.data && Array.isArray(res.data)) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 404) {
        setServices([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-10 text-gray-800 text-right">
      <div className="container mx-auto px-3.5 space-y-8">
        <CustomHeader
          content={{
            title: "الخدمات الإلكترونية",
            description:
              "تسعى الجمعية لتقديم خدمات إلكترونية لتسهيل التواصل مع المتبرعين، ومتابعة المشاريع، وإدارة الموارد البشرية والمعلومات، مع توضيح ما هو متاح حاليًا.",
          }}
        />

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--main-color)]"></div>
          </div>
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <FadeInOnScroll key={service.slideID}>
              <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition">
                <button
                  className="w-full flex justify-between items-center text-gray-800 font-semibold text-lg py-3 cursor-pointer px-4 rounded-lg hover:bg-gray-100 transition text-right"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="flex-1">{service.title}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mr-4"
                  >
                    <IoIosArrowDown size={28} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4 px-2 md:px-4 text-gray-700"
                    >
                      {service.images && service.images.length > 0 && (
                        <div className="w-full aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden rounded-2xl relative shadow-inner">
                          <Image
                            src={service.images[0]}
                            alt={service.title}
                            title={service.title}
                            width={1200}
                            height={800}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent hidden md:block" />
                        </div>
                      )}

                      <div className="bg-gray-50 p-5 rounded-2xl leading-relaxed text-gray-800 border border-gray-100 whitespace-pre-line shadow-sm">
                        <h4 className="font-bold text-xl mb-3 text-[var(--main-color)]">تفاصيل الخدمة</h4>
                        {service.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInOnScroll>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-3xl border border-gray-100 italic text-gray-500 shadow-sm">
            لا توجد خدمات إلكترونية متاحة حالياً.
          </div>
        )}
      </div>
    </section>
  );
};

export default EleServices;
