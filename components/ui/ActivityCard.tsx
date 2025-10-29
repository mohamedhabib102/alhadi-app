import React from 'react';
import Image from 'next/image';


interface Slide6 {
  title: string;
  description: string;
  imageUrl: string;
}


const ActivityCard: React.FC<Slide6> = ({ title, description, imageUrl }) => {
    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-[1.03] hover:shadow-3xl h-full">
            

            <div className="w-full h-48 overflow-hidden">
                <Image 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover transition duration-500 hover:opacity-90"
                    width={300}
                    height={200}
                />
            </div>
            

            <div className="p-5 flex flex-col items-start text-right">

                <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {title}
                </h4>


                <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ActivityCard;