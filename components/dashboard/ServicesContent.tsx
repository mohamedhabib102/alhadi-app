"use client"

import { useEffect, useState } from "react"
import CustomHeader from "../ui/CustomHeader"
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import CreateServices from "./CreateService";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";


interface Slide {
  slideID: number;
  slideName: string;
  title: string;
  description: string;
  images: string[];
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

const ServicesContent: React.FC = () => {
  const [services, setServices] = useState<Slide[]>([])
  const [toggle, setToggle] = useState<boolean>(false);

  const SLIDE_NAME = "services";

  const getAllServices = async () => {
    try {
      const res = await instance.get("/api/Donations/GetSlideByName", {
        params: { SlideName: SLIDE_NAME },
        skipAuth: true
      } as CustomAxiosRequestConfig)

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
    }
  }

  useEffect(() => {
    getAllServices()
  }, [])


  const handleToggle = () => {
    setToggle(!toggle)
  }


  const deleteService = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;

    try {
      const res = await instance.post("/api/Donations/DeleteSlidePlus", null, {
        params: { SlideID: id },
        skipAuth: true
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        getAllServices();
        alert("✅ تم حذف الخدمة بنجاح");
      }
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء حذف الخدمة");
    }
  }

  return (
    <>
      <CreateServices
        toggle={toggle}
        setToggle={setToggle}
        getAllSercices={getAllServices}
      />
      <div className="p-6">
        <CustomHeader
          content={{
            title: "قائمة الخدمات",
            description: "صفحة تعرض جميع الخدمات مع إمكانية تعديل وإدارة بياناتهم.",
          }}
        />
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-10">
          {services.map((ele) => (
            <div key={ele.slideID}
              className="overflow-hidden rounded-lg shadow bg-white">
              {ele.images && ele.images.length > 0 && (
                <Image
                  src={ele.images[0]}
                  alt="image"
                  title={ele.title}
                  width={400}
                  height={250}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 text-right">
                <h3 className="font-bold text-lg mb-1">{ele.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{ele.description}</p>
                <button
                  onClick={() => deleteService(ele.slideID)}
                  className="block bg-red-400 text-white py-2 px-6
                    rounded-lg cursor-pointer transition hover:bg-red-500"> حذف </button>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <p className="text-center text-gray-500 mb-10">لا توجد خدمات حالياً.</p>
        )}

        <button
          onClick={handleToggle}
          className="bg-[var(--main-color)] flex items-center gap-1.5 ml-auto p-2 rounded-lg text-white
         cursor-pointer transition hover:bg-blue-500">
          <IoIosAddCircle
            size={20}
          />
          <span > إضافة خدمة جديدة </span>
        </button>
      </div>
    </>
  )
}


export default ServicesContent