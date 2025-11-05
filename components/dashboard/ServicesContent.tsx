"use client"

import { useEffect, useState } from "react"
import CustomHeader from "../ui/CustomHeader"
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import CreateServices from "./CreateService";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";


interface ResponseData {
    serviceID: number;
    imageUrl: string
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

    
const images = [
  { id: 1, image: "https://source.unsplash.com/random/800x600?sig=1" },
  { id: 2, image: "https://source.unsplash.com/random/800x600?sig=2" },
  { id: 3, image: "https://source.unsplash.com/random/800x600?sig=3" },
  { id: 4, image: "https://source.unsplash.com/random/800x600?sig=4" }
];






const ServicesContent:React.FC = () => {
        const [service, setServices] = useState<ResponseData[]>([])
        const [toggle, setToggle] = useState<boolean>(false);

        const getAllSercices = async () => {
          try {
            const res =  await instance.get("/api/Donations/GetAllServices", {
              skipAuth: true
            } as CustomAxiosRequestConfig)
            setServices(res.data)
            
          } catch (error) { 
             console.log(error);
          }
        }

        useEffect(() => {
          getAllSercices()
        }, [])


        const handelToggle = () => {
          setToggle(!toggle)
        }


        const deleteService = async(id:number) => {
          try {
             instance.put(`/api/Donations/DeleteImage?serviceID=${id}`, {
              skipAuth: true
            } as CustomAxiosRequestConfig 
          ).then(() => {
            getAllSercices()
            alert("✅ تم حذف الصورة بنجاح");
          })
          } catch (error) {
              console.log(error);
              alert("حدث خطأ أثناء  حذف الصورة");
          }
        }

    return (
        <>
        <CreateServices
        toggle={toggle}
        setToggle={setToggle}
        getAllSercices={getAllSercices}
        />
        <div className="p-6">
        <CustomHeader
         content={{
           title: "قائمة الخدمات",
           description: "صفحة تعرض جميع الخدمات مع إمكانية تعديل  وإدارة بياناتهم.",
         }}
       />
         <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-10">
            {service.map((ele) => (
              ele.imageUrl && (
                  <div key={ele.serviceID}
                className="overflow-hidden rounded-lg shadow">
                    <Image
                    src={ele.imageUrl}
                    alt="image"
                    title="image cover"
                    width={200}
                    height={100}
                    loading="lazy"
                    className="w-full h-50 object-cover"
                    />
                    <button 
                    onClick={() => deleteService(ele.serviceID)}
                    className="block bg-red-400 text-white my-3 mr-3 py-2 px-3
                    rounded-lg cursor-pointer transition hover:bg-red-500"> حذف </button>
                </div>
              )
            ))}
         </div>

         <button 
         onClick={handelToggle}
         className="bg-[var(--main-color)] flex items-center gap-1.5 ml-auto p-2 rounded-lg text-white
         cursor-pointer transition hover:bg-blue-500">
           <IoIosAddCircle
           size={20}
           />
           <span > إضافة خدمة جديدة </span>
         </button>
        </div>        
        </>
    )
}


export default ServicesContent