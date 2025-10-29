"use client"
import React, { useEffect, useState } from 'react';
import ActivityCard from '@/components/ui/ActivityCard';
import { activitiesData } from '@/data/activitiesData';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import instance from '@/utils/axios';
import { AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide6 {
  slide6ID: number;
  title: string;
  description: string;
  imageUrl: string;
}

const OurActivities: React.FC = () => {
      const [slides, setSlides] = useState<Slide6[]>([]);

  useEffect(() => {
    fetchSlides();
  }, []);


 const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetAllSlides6", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.data && Array.isArray(res.data)) {
        setSlides(res.data);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };
    
 
    return (
        <section className="py-20 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-3.5">
                
       
                <FadeInOnScroll duration={0.8}>
                    <h2 className="text-[var(--main-color)] font-bold mb-3 text-right">
                        الفعاليات
                    </h2>
                </FadeInOnScroll>

                <FadeInOnScroll duration={0.8} delay={0.2}>
                    <p className="lg:w-[500px] font-bold text-3xl mb-12 ml-auto text-right">
                        نحول إيماننا بالتعايش السلمي إلى عمل ملموس، من خلال إطلاق مجموعة من المبادرات والفعاليات التي تحدث فرقاً حقيقياً
                    </p>
                </FadeInOnScroll>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {slides.map((item, index) => (
                        <FadeInOnScroll 
                            key={item.slide6ID}
                            duration={0.7}
                            delay={index * 0.15} 
                            amount={0.2}
                        >
                            <ActivityCard
                            title={item.title} 
                            description={item.description}
                            imageUrl={item.imageUrl}
                            />
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurActivities;