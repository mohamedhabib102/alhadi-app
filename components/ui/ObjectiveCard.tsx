"use client"
import { ObjectiveCardProps } from "../Home/OurObjectives";
import { motion } from "framer-motion";




// Component for a single Objective Card
const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ text, IconComponent }) => {
    return (
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
         className="flex flex-col items-center 
        justify-start p-6 rounded-xl bg-white shadow-md h-full transition duration-300 hover:shadow-lg"
        >
        <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <IconComponent className="text-3xl" />
            </div>
            <p className="text-gray-800 text-lg text-right font-medium flex-grow">
                {text}
            </p>
        </motion.div>
    );
};

export default ObjectiveCard;
