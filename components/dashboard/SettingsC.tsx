"use client";
import { useEffect, useState } from "react";
import CustomHeader from "@/components/ui/CustomHeader";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";
import Image from "next/image";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import AddNewSlide from "./AddNewSlide";
import { deleteSlid, getAllSlides } from "@/api/getAllSlides";

interface ResponseData {
    title: string;
    description: string;
    slideID: number;
    imageUrl: string
}


interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}





const HomeSections: React.FC = () => {
   const [toggle, setToggle] = useState<boolean>(false)
  const [openSlider, setOpenSlider] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [slides, setSlides] = useState<ResponseData[]>([])



  useEffect(() => {
    fetchSlides()
  }, [toggle])




  /// for slides

  const fetchSlides = async () => {
    try {
      const data  = await getAllSlides();
      if (data) setSlides(data)
    } catch (error) {
        console.log(error);
    }
  }

  // delete  slide 
  const deleteSlidById = async(slideID: number) => {
    try {
        await deleteSlid(slideID)
        await fetchSlides()
        
    } catch (error) {
        console.log(error);
    }
  }   

  const sections = [
    {
      title: "الواجهة الرئيسية (السلايدر)",
      open: openSlider,
      setOpen: setOpenSlider,
      content: (
        <>
  
          {!slides.length ? (<p className="text-lg text-center" dir="rtl"> لا يوجد  slide حاليا يمكنك الأضافة الأن </p>) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
             <motion.div
              key={slide.slideID}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-100 transition"
            >
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-48 object-cover"
                width={400}
                height={250}
              />
              <div className="p-5 text-right">
                <h3 className="text-xl font-semibold mb-2 text-blue-500">
                  {slide.title}
                </h3>
                <p className="text-gray-600">{slide.description}</p>
                <button  
                onClick={() => deleteSlidById(slide.slideID)}
                className="bg-red-500 py-2 px-4 rounded-lg text-white
               cursor-pointer transition hover:bg-red-600 mt-4 text-right"> حذف </button>
              </div>
            </motion.div>
          ))}
            </div>
          )}
        
          <button 
          onClick={() => {
            setToggle(!toggle)
          }}
          className="bg-blue-500 py-2 px-4 rounded-lg text-white
               cursor-pointer transition hover:bg-blue-600 my-4 mr-3 ml-auto text-right"  dir="rtl"> إضافة slide </button>
        </>
      ),
    },
    {
      title: "عن الجمعية",
      open: openAbout,
      setOpen: setOpenAbout,
      content: (
        <>
  
          {!slides.length ? (<p className="text-lg text-center" dir="rtl"> لا يوجد  slide حاليا يمكنك الأضافة الأن </p>) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
             <motion.div
              key={slide.slideID}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-100 transition"
            >
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-48 object-cover"
                width={400}
                height={250}
              />
              <div className="p-5 text-right">
                <h3 className="text-xl font-semibold mb-2 text-blue-500">
                  {slide.title}
                </h3>
                <p className="text-gray-600">{slide.description}</p>
                <button  
                onClick={() => deleteSlidById(slide.slideID)}
                className="bg-red-500 py-2 px-4 rounded-lg text-white
               cursor-pointer transition hover:bg-red-600 mt-4 text-right"> حذف </button>
              </div>
            </motion.div>
          ))}
            </div>
          )}
        
          <button 
          onClick={() => {
            setToggle(!toggle)
          }}
          className="bg-blue-500 py-2 px-4 rounded-lg text-white
               cursor-pointer transition hover:bg-blue-600 my-4 mr-3 ml-auto text-right"  dir="rtl"> إضافة slide </button>
        </>
      ),
    },
    {
      title: "مشاريع الجمعية",
      open: openProjects,
      setOpen: setOpenProjects,
      content: (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {["مشروع سقيا الماء", "كفالة يتيم", "دعم حلقات التحفيظ"].map(
            (name, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {name}
                </h3>
                <p className="text-gray-600">
                  يهدف هذا المشروع إلى خدمة المجتمع ومساعدة المستحقين من خلال
                  مبادرات خيرية وتنموية.
                </p>
              </div>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <>
    <AddNewSlide 
    toggle={toggle}
    setToggle={setToggle}
    onLoad={fetchSlides}
    />
    <div className="bg-gray-50 text-gray-800 text-right">
      <div className=" space-y-8">
        <CustomHeader
          content={{
            title: "أقسام الصفحة الرئيسية",
            description:
              "يمكنك استعراض أقسام الصفحة الرئيسية من هنا — بدءًا من السلايدر وحتى المشاريع التعريفية الخاصة بالجمعية.",
          }}
        />

        {sections.map((section, index) => (
          <FadeInOnScroll key={index}>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
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
                    transition={{ duration: 0.4 }}
                    className="mt-4 space-y-3"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </div>
    </>
  );
};

export default HomeSections;
