"use client"
import { motion } from 'framer-motion';
import StatCard from '../ui/StatCard';
import { AxiosRequestConfig } from 'axios';
import instance from '@/utils/axios';
import { useEffect, useState } from 'react';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface SectionData {
  sectionID: number;
  name: string;
  donorsCount: number;
}

const StatsSection: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([
    { sectionID: 1, name: " المستفيدون  ", donorsCount: 15 },
    { sectionID: 2, name: " المحاضرات ", donorsCount: 30 },
    { sectionID: 3, name: " إجمالي التبرعات ", donorsCount: 0 },
    { sectionID: 4, name: " الدروس العلمية ", donorsCount: 20 },
    { sectionID: 5, name: " المتطوعين  ", donorsCount: 0 },
    { sectionID: 6, name: " عدد المشاريع ", donorsCount: 0 }
  ]);

  useEffect(() => {
    fetchStats();
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch Projects/Sections
      const sectionsRes = await instance.get("/api/Donations/GetAllSections", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      // Fetch All Persons (Users) as Volunteers
      const usersRes = await instance.get("/api/Donations/GetAllPersons", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      let totalDonations = 0;
      let projectCount = 0;
      let volunteerCount = 0;

      if (sectionsRes.data && Array.isArray(sectionsRes.data)) {
        projectCount = sectionsRes.data.length;
        totalDonations = sectionsRes.data.reduce((acc: number, curr: any) => acc + (curr.donorsCount || 0), 0);
      }

      if (usersRes.data && Array.isArray(usersRes.data)) {
        volunteerCount = usersRes.data.length;
      }

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
          donorsCount: totalDonations
        },
        {
          sectionID: 4,
          name: "الدروس العلمية ",
          donorsCount: 20
        },
        {
          sectionID: 5,
          name: " المستخدمين  ",
          donorsCount: volunteerCount ? volunteerCount : 25
        },
        {
          sectionID: 6,
          name: " عدد المشاريع ",
          donorsCount: projectCount ? projectCount : 0
        }
      ]);

    } catch (error) {
      console.log("Error fetching stats:", error);
      // Even on error, we keep the default/previous state
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
          className="text-lg lg:text-2xl font-extrabold text-center text-gray-800 mb-10"
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