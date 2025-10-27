"use client"
import React from 'react';
import MessageCard from '@/components/ui/MessageCard';
import { motion } from "framer-motion";

// Define the structure for each message item
interface MessageItem {
    id: number;
    text: string;
    imageSrc: string;
    altText: string;
}

// Data for the 'Our Message' section
const messageData: MessageItem[] = [
    {
        id: 1,
        text: 'لفت انتباه أفراد المجتمع إلى حالات الحيوانات البائسة والدعوة إلى مساعدتها.',
        imageSrc: '/images/our-message.jpg', // Placeholder for the actual image file name
        altText: 'شخص يعتني بعجل صغير',
    },
    {
        id: 2,
        text: 'نشر الوعي وتعزيز ثقافة الرفق بالحيوان.',
        imageSrc: '/images/our-message.jpg', // Placeholder
        altText: 'يدان تحملان قطة صغيرة',
    },
    {
        id: 3,
        text: 'التوعية بأهمية رعاية الحيوانات وحمايتها.',
        imageSrc: '/images/our-message.jpg', // Placeholder
        altText: 'أطفال يتفاعلون مع حيوانات',
    },
    {
        id: 4,
        text: 'توفير الرعاية الطبية والخدمات البيطرية اللازمة للحيوانات المحتاجة.',
        imageSrc: '/images/our-message.jpg', // Placeholder
        altText: 'حقيبة إسعافات أولية بيطرية',
    },
    {
        id: 5,
        text: 'توعية الناس بأهمية التبني وتأهيلهم لاستقبال الحيوان في منزلهم ورعايته.',
        imageSrc: '/images/our-message.jpg', // Placeholder
        altText: 'أطفال يقفون بجوار كلب',
    },
];



// Main Component
const OurMessage: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-2.5">
        <motion.h3
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--main-color)] font-bold mb-3 text-right"
        >
           رسالتنا
        </motion.h3>


        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-96 font-bold text-3xl mb-12 ml-auto text-right"
        >
          لأن كل كائن يستحق الحب والرعاية التي تمنحه السعادة والراحة
        </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {messageData.map((item) => (
                        <MessageCard 
                            key={item.id}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurMessage; // Export the component