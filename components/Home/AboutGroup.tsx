"use client"
import CardAbout from "../ui/CardAbout";
import { motion } from "framer-motion";


const data = [
    {
        id: 1,
        image: "/images/support-home.jpg"
    },
    {
        id: 2,
        image: "/images/support-home.jpg"
    }
]



const AboutGroup: React.FC = () => {
    return (
        <section className="py-16 bg-[#f9f9f9]">
            <div className="container mx-auto px-3.5">
                <div className="text-right">
                   <motion.h3 
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                   className="text-[var(--main-color)] font-bold mb-1">عن الجمعية
                   </motion.h3>
                   <motion.p 
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                   className="font-bold text-3xl mb-1"> فـ لنكن معكم قلوبًا راحمة </motion.p>
                </div>
               <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 mt-12">
                   <CardAbout  />
               </div>

            </div>
        </section>
    )
}

export default AboutGroup;