"use client"

import { useRef, useEffect } from 'react';
import { 
    motion, 
    useInView, 
    useMotionValue, 
    useTransform, 
    animate } from 'framer-motion'; 
import { FaUsers } from 'react-icons/fa';


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


interface ResponseData {
  name: string;
  donorsCount: number;
}



const StatCard: React.FC<ResponseData> = ({ donorsCount, name }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 }); 

    return (

        <div ref={ref} className="text-center p-3 bg-white rounded-xl shadow-lg h-full flex flex-col items-center justify-center border-b-4 border-[var(--main-color)]">
            
            <div className="w-16 h-16 rounded-full bg-blue-100 text-[var(--main-color)] flex items-center justify-center mb-4">
                <FaUsers className="text-3xl" />
            </div>

            <h3 className="text-5xl lg:text-6xl font-extrabold text-[var(--main-color)] mb-2">
                {isInView ? <AnimatedCount value={donorsCount} /> : 0} 
            </h3>
            <p className="text-md font-semibold text-gray-600 mt-2">
                {name}
            </p>
        </div>
    );
};

export default StatCard;