import CustomHeader from "@/components/ui/CustomHeader";
import Image from "next/image";

type Data = {
    title: string;
    description: string;
}

interface Content {
    content: Data;
}

interface ResponseData {
    sectionID: number;
    name: string;
    imageUrl: string;
    targetAmount: number;
    durations: string;
    collectedAmount: number;
}

const contentPage: ResponseData[] = [
  {
    sectionID: 0,
    name: "صندوق التعليم",
    imageUrl: "/images/new1.jpg",
    targetAmount: 5000,
    durations: "2025-10-26T15:54:42.568Z",
    collectedAmount: 1200
  },
  {
    sectionID: 1,
    name: "دعم الصحة",
    imageUrl: "/images/new1.jpg",
    targetAmount: 10000,
    durations: "2025-12-01T12:00:00.000Z",
    collectedAmount: 4300
  },
  {
    sectionID: 2,
    name: "مشاريع المجتمع",
    imageUrl: "/images/new1.jpg",
    targetAmount: 8000,
    durations: "2026-01-15T09:30:00.000Z",
    collectedAmount: 2500
  }
];

const Sections: React.FC<Content> = () => {
    return (
        <div className="p-6">
            <CustomHeader content={{
                title: " الأقسام ",
                description: " يمكنك إضافة الأقسام والتحكم بها "
            }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {contentPage.map((ele: ResponseData) => (
                    <div key={ele.sectionID} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <Image 
                            src={ele.imageUrl} 
                            alt={ele.name} 
                            className="w-full h-48 object-cover"
                            width={300}
                            height={200}
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{ele.name}</h3>
                            <p className="text-gray-600 mb-1">الهدف: <span className="font-medium">{ele.targetAmount} ريال</span></p>
                            <p className="text-gray-600 mb-1">المبلغ المحصل: <span className="font-medium">{ele.collectedAmount} ريال</span></p>
                            <p className="text-gray-500 text-sm">المدة: {new Date(ele.durations).toLocaleDateString()}</p>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                                <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${(ele.collectedAmount / ele.targetAmount) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sections;
