
import React from 'react';
import { ActivityItem } from '@/data/activitiesData'; 



const ActivityCard: React.FC<ActivityItem> = ({ title, description, imageSrc, link }) => {
    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-[1.03] hover:shadow-3xl h-full">
            

            <div className="w-full h-48 overflow-hidden">
                <img 
                    src={imageSrc} 
                    alt={title} 
                    className="w-full h-full object-cover transition duration-500 hover:opacity-90"
                />
            </div>
            

            <div className="p-5 flex flex-col items-start text-right">

                <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {title}
                </h4>


                <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {description}
                </p>

                <a 
                    href={link} 
                    className="mt-4 inline-block px-5 py-2 text-sm font-semibold text-white bg-[var(--main-color)] rounded-full transition duration-300 hover:bg-blue-500"
                >
                    المزيد
                </a>
            </div>
        </div>
    );
};

export default ActivityCard;