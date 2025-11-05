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


interface ResponseData {
    serviceID: number;
    imageUrl: string
}




const EleServices: React.FC = () => {
  const [openBoard, setOpenBoard] = useState(false);
  const [openExecutive, setOpenExecutive] = useState(false);
  const [openCommittees, setOpenCommittees] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [service, setServices] = useState<ResponseData[]>([])

  const sections = [
    {
      title: "مجلس الإدارة (أعضاء مجلس الإدارة)",
      open: openBoard,
      setOpen: setOpenBoard,
      content: "يضم مجلس الإدارة نخبة من الأعضاء الذين يشرفون على توجيه الجمعية ورسم السياسات العامة، ويعملون على متابعة الأداء الدعوي والخيري وضمان تحقيق أهداف الجمعية بكفاءة وشفافية"
    },
    {
      title: "المسؤول التنفيذي (الموظفين - المتطوعين)",
      open: openExecutive,
      setOpen: setOpenExecutive,
      content: "يشرف المسؤول التنفيذي على إدارة الموظفين والمتطوعين، ويضمن توزيع المهام بفاعلية ومتابعة سير العمل الدعوي والخيري وفق خطط الجمعية والسياسات المعتمدة"
    },
    {
      title: "مجلس الإدارة (اللجان)",
      open: openCommittees,
      setOpen: setOpenCommittees,
      content: "تشمل اللجان المتخصصة لجنة الدعوة، لجنة التوعية، لجنة التعليم، ولجنة الإدارة المالية، بحيث يعمل كل لجنة على متابعة مشروع محدد وتحقيق الأهداف المرسومة بكفاءة عالية"
    }
  ];

  const lastSection =     {
      title: "الخدمات الإلكترونية",
      open: openServices,
      setOpen: setOpenServices,
      content: "خدمة المتبرعين تتيح هذه الخدمة للمتبرعين متابعة مشاريع الجمعية والمبادرات المختلفة، والتعرف على التفاصيل والإحصائيات الخاصة بها (لا تتوفر حالياً خدمة الحصول على إيصال إلكتروني للتبرع)\n\nبوابة الوظائف توفر بوابة الوظائف إمكانية التقديم على الوظائف الشاغرة في الجمعية، سواء للموظفين أو المتطوعين، مع متابعة حالة الطلب بشكل مباشر"
    }


      const getAllSercices = async () => {
        try {
          const res =  await instance.get("/api/Donations/GetAllServices", {
            skipAuth: true
          } as CustomAxiosRequestConfig)
          setServices(res.data)  
          
        } catch (error) { 
           console.log(error);
        }
      }


      useEffect(() => {
        getAllSercices()
      }, [])


   

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

        {sections.map((section, index) => (
            <FadeInOnScroll key={index}>
        <div
            key={index}
            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
          >
            <button
              className="w-full flex justify-between items-center text-gray-800 font-semibold text-lg py-3 cursor-pointer px-4 rounded-lg hover:bg-gray-100 transition"
              onClick={() => section.setOpen(!section.open)}
            >
              {section.title}
              <motion.div
                animate={{ rotate: section.open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown size={28} />
              </motion.div>
            </button>

            <AnimatePresence>
              {section.open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-3 px-4 text-gray-700 whitespace-pre-line"
                >
                  {service.slice(0, 3).map((ele, ser) => (
                    index === ser && (
                        <div key={ele.serviceID}
                        className="w-full h-[600px] overflow-hidden rounded-2xl"
                        >
                        <Image
                        src={ele.imageUrl||"/images/"}
                        alt="image"
                        title="image cover"
                        width={200}
                        height={100}
                        loading="lazy"
                        className="w-full object-center transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    )
                  ))}
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
            </FadeInOnScroll>
        ))}
          

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
            <button
              className="w-full flex justify-between items-center text-gray-800 font-semibold text-lg py-3 cursor-pointer px-4 rounded-lg hover:bg-gray-100 transition"
              onClick={() => lastSection.setOpen(!lastSection.open)}
            >
              {lastSection.title}
              <motion.div
                animate={{ rotate: lastSection.open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown size={28} />
              </motion.div>
            </button>

            <AnimatePresence>
              {lastSection.open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-3 px-4 text-gray-700 whitespace-pre-line"
                >
                  <div className="mt-6 bg-gray-50 p-4 rounded-xl leading-relaxed text-gray-800 border border-gray-100">
                    {lastSection.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeInOnScroll>

      </div>
    </section>
  );
};

export default EleServices;
