"use client"
import { motion} from 'framer-motion'; 
import { statsData } from '@/data/stateData'; 
import StatCard from '../ui/StatCard';


const StatsSection: React.FC = () => {
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
                    أرقامنا تترجم إلى أمل وكل إحصائية قصة حياة نغيرها للأفضل
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ 
                                duration: 0.5, 
                                ease: "easeOut",
                                delay: item.id * 0.15
                            }}
                        >
                            <StatCard {...item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;