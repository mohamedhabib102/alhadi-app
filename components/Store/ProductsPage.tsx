"use client"

import instance from "@/utils/axios";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/utils/AuthContext";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import Link from "next/link";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface ResponseData {
  sectionID: number;
  name: string;
  imageUrl: string;
  targetAmount: number;
  durations: string;
  prices: number[];
  collectedAmount: number;
}

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}







const ProductsPage: React.FC = () => {
      const [sections, setSections] = useState<ResponseData[]>([]);
      const [message, setMessage] = useState<string>("");
      const [prices, setPrices] = useState<{ [key: number]: number }>({});
      const {user} = useAuth();

    useEffect(() => {
        getAllSections()
    }, [])


        const getAllSections = async () => {
    try {
      const res = await instance.get("/api/Donations/GetAllSections", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);


      console.log(res);
      

      if (res.data && res.data.length > 0) {
       const updatedData = res.data.map((section: ResponseData) => ({
         ...section,
         prices: [10, 50, 100],
       }));
       setSections(updatedData);

        setMessage("");
      }
      

      console.log(res);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setMessage(" لا يوجد مشاريع حاليا ");
        }
      }
    }
  };


const addToCart = async (sectionID: number) => {
    try {


    if (!user.id) {
      alert("من فضلك قم بتسجيل الدخول أولاً");
      return;
    }


      if (!prices[sectionID] || prices[sectionID] <= 0) {
        alert("من فضلك اختر مبلغ تبرع صحيح أولاً");
        return;
      }

      const body = {
        personID: Number(user.id),
        sectionID: Number(sectionID),
        amount: Number(prices[sectionID]),
      };

      const res = await instance.post(
        "/api/Donations/AddToDonationCart",
        body, {skipAuth: true} as CustomAxiosConfig
      );

      console.log(res);

    console.log(body);
    
      alert("تمت إضافة التبرع إلى السلة بنجاح ✅");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        alert(
          `حدث خطأ أثناء الإضافة للسلة: ${
            error.response?.data?.message || "خطأ غير متوقع"
          }`
        );
      } else {
        alert("حدث خطأ غير متوقع أثناء العملية");
      }
    }
  };




    
    return (
      <div>
      {sections.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">{message || " لا يوجد مشاريع حاليا " }</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 lg:grid-cols-3 gap-6 mt-6">
          {sections.map((ele) => (
            <FadeInOnScroll key={ele.sectionID}>
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
                <div className="text-sm flex w-full justify-between flex-row-reverse">
                    <div className='text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-1'>
                      <span> المبلغ المتبقي </span>
                      <span>{ele.targetAmount} </span>
                      ريال
                    </div>
                </div>

                <h3 className="text-[21px] font-bold text-gray-800 truncate w-full mb-2">
                    {ele.name}
                </h3>

                <div className='text-right mb-1.5 w-full'>
                  <span className='block mb-2 text-[var(--main-color)] font-medium text-lg'>
                    أضف مبلغ التبرع
                  </span>
                
                   <div className="flex justify-end gap-2 mb-2">
                     {ele.prices.map((amount) => (
                       <button
                         key={amount}
                         onClick={() =>
                           setPrices((prev) => ({
                             ...prev,
                             [ele.sectionID]: amount,
                           }))
                         }
                         className={`px-3 py-1 border rounded-lg transition ${
                           prices[ele.sectionID] === amount
                             ? "bg-[var(--main-color)] text-white border-[var(--main-color)]"
                             : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                         }`}
                       >
                         {amount} ريال
                       </button>
                     ))}
                   </div>
                 
                 
                   <div className='w-full relative'>
                     <input
                       type="number"
                       name="price"
                       value={prices[ele.sectionID] || ""}
                       onChange={(e) =>
                         setPrices((prev) => ({
                           ...prev,
                           [ele.sectionID]: Number(e.target.value),
                         }))
                       }
                       className="border-2 border-[#EEE] text-right outline-none rounded-lg p-2 w-full"
                       placeholder="أدخل مبلغ التبرع"
                     />
                     <FaMoneyBill
                       size={20}
                       className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-500'
                     />
                   </div>
                </div>


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
                      <div className="w-full flex justify-between items-center mt-4">
                          <button 
                           onClick={() => addToCart(ele.sectionID)}
                              className={`p-3 rounded-full bg-[var(--main-color)] hover:bg-blue-500 text-white transition cursor-pointer duration-300`}
                              aria-label="Add to cart"
                          >
                              <FaShoppingCart className="text-lg" />
                          </button>
      
                          <Link 
                             href="/store/cart"
                              className={`p-3 rounded-lg w-44 transition cursor-pointer duration-300 bg-[var(--main-color)]
                                   hover:bg-blue-500 text-white `}
                              aria-label="Add to cart"
                          >
                              تبرع الأن
                          </Link>
                      </div>
              </div>
            </div>
            </FadeInOnScroll>
          ))}
        </div>
      )}
        </div>
    )
}

export default ProductsPage