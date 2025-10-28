"use client"
import React from 'react';
import ActivityCard from '@/components/ui/ActivityCard';
import { activitiesData } from '@/data/activitiesData';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';

const OurActivities: React.FC = () => {
    
 
    return (
        <section className="py-20 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-3.5">
                
                {/* العنوان الرئيسي */}
                <FadeInOnScroll duration={0.8}>
                    <h2 className="text-[var(--main-color)] font-bold mb-3 text-right">
                        الفعاليات
                    </h2>
                </FadeInOnScroll>

                {/* الوصف */}
                <FadeInOnScroll duration={0.8} delay={0.2}>
                    <p className="lg:w-[500px] font-bold text-3xl mb-12 ml-auto text-right">
                        نحول إيماننا بالتعايش السلمي إلى عمل ملموس، من خلال إطلاق مجموعة من المبادرات والفعاليات التي تحدث فرقاً حقيقياً
                    </p>
                </FadeInOnScroll>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {activitiesData.map((item, index) => (
                        <FadeInOnScroll 
                            key={item.id}
                            duration={0.7}
                            delay={index * 0.15} 
                            amount={0.2}
                        >
                            <ActivityCard {...item} />
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurActivities;