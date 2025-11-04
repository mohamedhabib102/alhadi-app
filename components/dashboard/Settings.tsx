"use client";
import { useState } from "react";
import CustomHeader from "@/components/ui/CustomHeader";
import Part1 from "@/components/dashboard/Part1";
import Part2 from "@/components/dashboard/Part2";
import Part3 from "@/components/dashboard/Part3";
import Part4 from "@/components/dashboard/Part4";
import Part5 from "@/components/dashboard/Part5";
import Part6 from "@/components/dashboard/Part6";


interface Tab {
  id: number;
  title: string;
  description: string;
  Component: React.FC;
}

const tabs: Tab[] = [
  { id: 1, title: "الشريحة الرئيسية", description: "تحكم في الشريحة الرئيسية", Component: Part1 },
  { id: 2, title: " عن الجمعية ", description: "تحكم عن وصف الجمعية", Component: Part2 },
  { id: 3, title: "البرامج ", description: "تحكم في البرامج ", Component: Part3 },
  { id: 4, title: "رسالتنا", description: "تحكم في رسالتنا", Component: Part4 },
  { id: 5, title: "أهدافنا", description: "تحكم في أهدافنا", Component: Part5 },
  // { id: 6, title: "الفعاليا", description: "تحكم في الفعاليا", Component: Part6 },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.Component;

  return (
    <>
        <div className="p-4" dir="ltr">
      <div className="flex flex-wrap justify-end gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition 
              ${activeTab === tab.id ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Header for active tab */}
      {tabs.find(tab => tab.id === activeTab) && (
        <CustomHeader
          content={{
            title: tabs.find(tab => tab.id === activeTab)!.title,
            description: tabs.find(tab => tab.id === activeTab)!.description,
          }}
        />
      )}

      {/* Render Active Component */}
      <div className="mt-4" dir="rtl">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
    </>
  );
};

export default SettingsPage;
