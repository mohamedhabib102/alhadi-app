"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import instance from "@/utils/axios";
import CustomHeader from "@/components/ui/CustomHeader";
import axios, { AxiosRequestConfig } from "axios";
import { IoIosAddCircle } from "react-icons/io";
import AddSection from "@/components/dashboard/AddSection";
import { useRouter} from "next/navigation";
import { useAuth } from "@/utils/AuthContext";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface ResponseData {
  sectionID: number;
  name: string;
  imageUrl: string;
  targetAmount: number;
  durations: string;
  collectedAmount: number;
}

const SectionsPage: React.FC = () => {
  const router = useRouter();
  const { user , loading} = useAuth();
  const [sections, setSections] = useState<ResponseData[]>([]);
  const [message, setMessage] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    getAllSections();
  }, []);


  
    useEffect(() => {
        if (loading) return; 

      if (!user.token || user.role !== "Admin") {
        router.replace("/");
        return;
      }

    }, [user, router, loading]);


  const getAllSections = async () => {
    try {
      const res = await instance.get("/api/Donations/GetAllSections", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);


      if (res.data && res.data.length > 0) {
        setSections(res.data);
        setMessage("");
      }
      
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // error.response.data
          setMessage(" لا يوجد مشاريع حاليا ");
          setSections([])
        }
      }
    }
  };


  const deleteSection = async(id: number) => {
     try {
      const res = await instance.delete(
        `/api/Donations/DeleteSection?sectionID=${id}`)

        getAllSections()
        alert("🗑️ تم حذف المشروع بنجاح!");
        
     } catch (error) {
        console.log(error);
     }
  }

  return (
    <>
       <div className="p-4">
      <AddSection 
      toggle={toggle} 
      setToggle={setToggle}
      getAllSections={getAllSections}
      />
      <CustomHeader content={{ title: " المشاريع ", description: "تحكم في المشاريع" }} />
      {sections.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">{message || " لا يوجد مشاريع حاليا " }</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 lg:grid-cols-3 gap-6 mt-6">
          {sections.map((ele) => (
            <div
              key={ele.sectionID}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={ele.imageUrl}
                alt={ele.name}
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{ele.name}</h3>
                <p className="text-gray-600 mb-1">
                  الهدف: <span className="font-medium">{ele.targetAmount} ريال</span>
                </p>
                <p className="text-gray-600 mb-1">
                  المبلغ المحصل:{" "}
                  <span className="font-medium">{ele.collectedAmount} ريال</span>
                </p>
                <p className="text-gray-500 text-sm">
                  المدة: {new Date(ele.durations).toLocaleDateString()}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${(ele.collectedAmount / ele.targetAmount) * 100 > 100 
                        ? 100 : (ele.collectedAmount / ele.targetAmount) * 100}%`,
                    }}
                  ></div>
                </div>
                <button 
                onClick={() => deleteSection(ele.sectionID)}
                className="bg-red-500 py-2 px-4 rounded-lg text-white
               cursor-pointer transition hover:bg-red-600 mt-4 text-right"> حذف </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
      onClick={() => setToggle(!toggle)}
      className="bg-[var(--main-color)] flex items-center gap-1.5 ml-auto p-2 rounded-lg text-white
      cursor-pointer transition hover:bg-blue-500">
        <IoIosAddCircle 
        size={20}
        />
        <span> إضافة مشروع جديد </span>
      </button>
    </div>
    </>
 
  );
};

export default SectionsPage;
