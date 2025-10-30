"use client"
import { motion } from "framer-motion";
import Image from "next/image";

interface Slide5 {
  title: string;
  description: string;
  imageUrl: string;
}

// Component for a single Slide5 Card
const ObjectiveCard: React.FC<Slide5> = ({ title, description, imageUrl }) => {
    return (
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-start p-4 rounded-xl bg-white shadow-md h-full transition duration-300 hover:shadow-lg"
        >
            <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                <Image 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover"
                    width={300}
                    height={200}
                />
            </div>

            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{title}</h3>

            <p className="text-gray-600 text-center">{description}</p>
        </motion.div>
    );
};

export default ObjectiveCard;
