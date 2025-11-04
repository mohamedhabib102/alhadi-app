"use client"
import { motion} from 'framer-motion'; 
import StatCard from '../ui/StatCard';
import  { AxiosRequestConfig } from 'axios';
import instance from '@/utils/axios';
import { useEffect, useState } from 'react';




interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface ResponseData {
  sectionID: number;
  name: string;
  donorsCount: number;
}

type Nums = {
  donorsCount: number
}

const StatsSection: React.FC = () => {
  const [sections, setSections] = useState<ResponseData[]>([])


    useEffect(() => {
        getAllSections()
    }, [])

      const getAllSections = async () => {
    try {
      const res = await instance.get("/api/Donations/GetAllSections", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      
      
      
      if (res.data && res.data.length > 0) {
        const nums =  res.data.filter((ele: Nums) =>  ele.donorsCount).map((ele: Nums) => 
        ele.donorsCount)
        const countProjects = res.data.length;

        const num =  nums.reduce((acc:number,curr:number) => {
          return acc + curr
        })

        console.log(num);
        
        

        setSections([
          {
            sectionID: 1,
            name: " المستفيدون  ",
            donorsCount: 15
          },
          {
            sectionID: 2,
            name: " المحاضرات ",
            donorsCount: 30
          },
          {
            sectionID: 3,
            name: " إجمالي التبرعات ",
            donorsCount: num
          },
          {
            sectionID: 4,
            name: " الدروس العلمية ",
            donorsCount: 20
          },
          {
            sectionID: 5,
            name: " المتطوعين  ",
            donorsCount: 25
          },
          {
            sectionID: 6,
            name: " عدد المشاريع ",
            donorsCount: countProjects
          }
        ])
      }
 
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <section className="py-20 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-3.5">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-3xl lg:text-4xl font-extrabold text-center text-gray-800 mb-10"
                >
                   أرقامنا تشير لسعينا إلى نشر السنّة النبوية
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                   {sections.map((item, index) => (
                     <motion.div
                       key={item.sectionID}
                       initial={{ opacity: 0, scale: 0.9 }} 
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true, amount: 0.8 }}
                       transition={{ 
                         duration: 0.5, 
                         ease: "easeOut",
                         delay: index * 0.15 
                       }}
                     > 
                       <StatCard
                         name={item.name}
                         donorsCount={item.donorsCount}
                       />
                     </motion.div>
                   ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;