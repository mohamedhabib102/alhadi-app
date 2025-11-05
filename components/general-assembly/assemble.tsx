"use client";
import CustomHeader from "@/components/ui/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import instance from "@/utils/axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface ResponseData {
    serviceID: number;
    imageUrl: string
}

const Assembly: React.FC = () => {
    const [service, setServices] = useState<ResponseData[]>([])



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
      <div className="mx-auto px-4 max-w-6xl space-y-12">
        {/* Header */}
        <CustomHeader
          content={{
            title: "الجمعية العمومية",
            description:
              "تمثل الجمعية العمومية الركيزة الأساسية في حوكمة الجمعية، وتُعنى بمشاركة الأعضاء في اتخاذ القرارات وتطوير مسار العمل الدعوي والخيري.",
          }}
        />


        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              أعضاء الجمعية العمومية
            </h2>
            <div className="">
              <div className="w-full overflow-hidden rounded-xl">
                {service.slice(3,4).map((ele) => (
                  <Image
                  key={ele.serviceID}
                  src={ele.imageUrl || "/images/"}
                  alt="أعضاء الجمعية العمومية"
                  width={400}
                  height={300}
                  className="h-[450px] w-full object-cover object-center shadow-md border border-gray-200
                  transition-transform duration-300 hover:scale-105"
                />
                ))}
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* محاضر اجتماع الجمعية العمومية */}
        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              محاضر اجتماع الجمعية العمومية
            </h2>
            <p className="leading-loose mb-6">
              تُعقد اجتماعات الجمعية العمومية بشكل دوري لمناقشة تقارير الأداء
              الإداري والمالي، واعتماد الميزانيات، وانتخاب مجلس الإدارة، ومراجعة
              المشاريع الدعوية والخيرية.  
              يتم توثيق جميع المحاضر والقرارات لضمان
              الشفافية، وحفظ الحقوق، وتعزيز ثقة المجتمع في أعمال الجمعية.
            </p>

            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="https://x.com/alhadeannabwe"
                target="_blank"
                className="px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
              >
                عرض على تويتر
              </Link>
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              طلب الانضمام للجمعية العمومية
            </h2>
            <p className="leading-loose mb-6">
              ترحب الجمعية بانضمام الأفراد الراغبين في المساهمة في العمل الخيري
              والدعوي، وفق الضوابط والشروط المعتمدة.  
              يمكن للراغبين تعبئة نموذج
              الانضمام عبر الرابط التالي لاستكمال بياناتهم وإرسال الطلب إلكترونيًا.
            </p>

            <div className="text-left">
              <Link
                href="https://forms.gle/exampleFormLink"
                target="_blank"
                className="inline-block px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
              >
                تعبئة نموذج الانضمام
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Assembly;
