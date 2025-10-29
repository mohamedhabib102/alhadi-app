"use client"
import Image from "next/image";
import { motion } from "framer-motion";

interface MessageCardProps {
  title: string;
  description: string;
  imageUrl: string;
}



// Component for a single message card
const MessageCard: React.FC<MessageCardProps> = ({ title, imageUrl, description }) => {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col flex-1 p-4 bg-white rounded-xl shadow-lg text-center transition duration-300 hover:shadow-xl h-full"
    >
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          width={300}
          height={200}
        />
      </div>
      <p className="text-gray-700 text-lg font-semibold flex-grow">
        {description}
      </p>
    </motion.div>
  );
};

export default MessageCard