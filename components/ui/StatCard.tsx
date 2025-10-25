"use client"

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'; 
import { StatItem } from '@/types/StateItem'; 


const AnimatedCount: React.FC<{ value: number }> = ({ value }) => {

    const count = useMotionValue(0); 
    
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString()); 


    useEffect(() => {
        const controls = animate(count, value, {
            duration: 2.5, 
            ease: "easeOut"
        });


        return controls.stop; 
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
};




const StatCard: React.FC<StatItem> = ({ value, label, IconComponent, prefix, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 }); 

    return (

        <div ref={ref} className="text-center p-6 bg-white rounded-xl shadow-lg h-full flex flex-col items-center justify-center border-b-4 border-[var(--main-color)]">
            
            <div className="w-16 h-16 rounded-full bg-blue-100 text-[var(--main-color)] flex items-center justify-center mb-4">
                <IconComponent className="text-3xl" />
            </div>

            <h3 className="text-5xl lg:text-6xl font-extrabold text-[var(--main-color)] mb-2">
                {prefix}
                {isInView ? <AnimatedCount value={value} /> : 0} 
                {suffix}
            </h3>
            <p className="text-md font-semibold text-gray-600 mt-2">
                {label}
            </p>
        </div>
    );
};

export default StatCard;