"use client";
import React from 'react';
import { motion } from "framer-motion";

import { 
    FaHeart, 
    FaHandsHelping, 
    FaCubes, 
    FaPaw, 
    FaHandHoldingHeart  
} from 'react-icons/fa';
import ObjectiveCard from '../ui/ObjectiveCard';

// Define the structure for each objective item
interface ObjectiveItem {
    id: number;
    text: string;
    IconComponent: React.ElementType; 
}


const objectivesData: ObjectiveItem[] = [
    {
        id: 1,
        text: 'نشر الثقافة البيئية للكائنات الحية',
        IconComponent: FaHandHoldingHeart, 
    },
    {
        id: 2,
        text: 'صناعة جيل واعٍ محب للحيوانات',
        IconComponent: FaPaw, 
    },
    {
        id: 3,
        text: 'تقديم برامج توعوية لجميع الفئات العمرية',
        IconComponent: FaCubes, 
    },
    {
        id: 4,
        text: 'غرس مبدأ المساعدة والمحافظة على هذا الإزدواج لتحقيق التوازن البيئي',
        IconComponent: FaHandsHelping, 
    },
    {
        id: 5,
        text: 'العمل على التعايش والسلام مع هذه المخلوقات',
        IconComponent: FaHeart, 
    },
];


export type ObjectiveCardProps = Omit<ObjectiveItem, 'id'>;[] 



// Main Component
const OurObjectives: React.FC = () => {
    return (
        <section className="py-20 dark-green-bg  bg-gray-200">
            <div className="container mx-auto px-3.5">
        <motion.h3
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--main-color)] font-bold mb-3 text-right"
        >
           أهدافنا
        </motion.h3>


        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-96 font-bold text-3xl mb-12 ml-auto text-right"
        >
          تنبع رسالتنا من إيماننا العميق بأن الحياة المشتركة تستوجب منا الرعاية والاحترام
        </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {objectivesData.map((item) => (
                        <ObjectiveCard 
                            key={item.id}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurObjectives;