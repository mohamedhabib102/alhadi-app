"use client";

import { useAuth } from "@/utils/AuthContext";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaUniversity } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

const CartProducts = () => {
  const [method, setMethod] = useState<string>("mada");
  const [notes, setNotes] = useState<string>("");
  const {user} = useAuth()


  const total = 10.0;
  const product = {
    name: "تبرع لبناء ملجأ للمسنين وذوي الاحتياجات الخاصة",
    amount: 10.0,
    image: "/images/activties.jpeg",
  };

  useEffect(() => {
    if (user?.id) {
      getAllProjects()
    }
  }, [user?.id])



  


  const getAllProjects = async() => {
    const id = user.id
    try {
        const res = await instance.get(`/api/Donations/GetAllDonationCarts?personID=${id}`, 
          {skipAuth: true} as CustomAxiosRequestConfig)

          console.log(res);
          
    } catch (error) {
        
    }
  }

  return (
    <div className="container mx-auto px-2">
      <>
            {user.id ? (        
              <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-right">
            تفاصيل التبرع
          </h2>
          <div className="border border-gray-200 rounded-lg p-4 flex justify-between flex-row-reverse items-center">
            <span className="text-gray-600">المجموع</span>
            <span className="font-bold text-gray-800">SAR {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-right">
            طريقة الدفع
          </h2>

          <div className="space-y-3">
            {/* mada */}
            <label
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
                method === "mada"
                  ? "border-blue-400 bg-indigo-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setMethod("mada")}
            >
              <MdCreditCard className="text-indigo-600 text-xl" />
              <span className="font-medium text-gray-700">بطاقة مدى البنكية</span>
            </label>

            {/* visa/mastercard */}
            <label
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
                method === "visa"
                  ? "border-blue-400 bg-indigo-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setMethod("visa")}
            >
              <FaCcVisa className="text-blue-600 text-xl" />
              <FaCcMastercard className="text-red-500 text-xl" />
              <span className="font-medium text-gray-700">بطاقة ائتمانية</span>
            </label>

            {/* STC Pay */}
            <label
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
                method === "stc"
                  ? "border-blue-400 bg-indigo-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setMethod("stc")}
            >
             <Image
              src="/images/stc_pay.webp"
              title="STC Pay"
              alt="STC Pay"
              width={300}
              height={200}
              className="w-8"
             />
              {/* <SiStcpay className="text-purple-500 text-xl" /> */}
              <span className="font-medium text-gray-700">STC Pay</span>
            </label>

            {/* Bank transfer */}
            <label
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
                method === "bank"
                  ? "border-blue-400 bg-indigo-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setMethod("bank")}
            >
              <FaUniversity className="text-green-600 text-xl" />
              <span className="font-medium text-gray-700">تحويل بنكي</span>
            </label>
          </div>


          <div className="mt-6">
            {method === "mada" || method === "visa" ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="الاسم على البطاقة"
                  className="w-full border rounded-lg text-right p-2 outline-none focus:border-blue-400"
                />
                <input
                  type="text"
                  placeholder="رقم البطاقة"
                  className="w-full border rounded-lg text-right p-2 outline-none focus:border-blue-400"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="تاريخ الانتهاء"
                    className="w-1/2 border rounded-lg text-right p-2 outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 border rounded-lg text-right p-2 outline-none focus:border-blue-400"
                  />
                </div>
                <label className="flex justify-end items-center gap-2 text-sm text-gray-600 mt-1">
                  <input type="checkbox" defaultChecked={true} className="accent-blue-400 cursor-pointer" />
                  حفظ البطاقة لتسهيل الدفع لاحقاً
                </label>
              </div>
            ) : method === "stc" ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="أدخل رقم STC Pay"
                  className="w-full border text-right rounded-lg p-2 outline-none focus:border-blue-400"
                />
              </div>
            ) : method === "bank" ? (
              <div className="space-y-3 text-gray-700">
                <p className="text-right"> الرجاء تحويل المبلغ إلى الحساب البنكي التالي  </p>
                <p className="text-right">
                  <span className="font-semibold">اسم البنك:</span> البنك الأهلي
                </p>
                <p className="text-right">
                  <span className="font-semibold">رقم الحساب:</span> 123456789
                </p>
                <p className="text-right" dir="rtl">
                  <span className="font-semibold">الآيبان: </span> SA000000000000000000
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-4 pt-4 text-right">
            <h3 className="text-md font-semibold mb-3 text-gray-700"> سلة التبرعات  </h3>
            <div className="flex items-center gap-3">
              <Image
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg border"
                width={300}
                height={200}
              />
              <div>
                <p className="text-gray-800 font-medium">{product.name}</p>
                <p className="text-gray-600 text-sm">ريال {product.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <label className="block mb-2 text-gray-700 font-medium"> ملاحظاتك </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg text-right p-2 h-24 resize-none outline-none focus:border-blue-400"
              placeholder=" أدخل ملاحظاتك هنا  "
            ></textarea>
          </div>

     
          <div className="mt-6">
            <button className="w-full bg-blue-400 hover:bg-blue-500 cursor-pointer text-white py-3 rounded-lg transition">
              إدخال بيانات الدفع
            </button>
          </div>
        </div>
      </div>) : (
        <p className="text-black font-medium text-center"> لا يوجد مشاريع هنا يجب عليك التسجيل وإضافة مشروع في السلة </p>
      )}
      </>
    </div>
  );
};

export default CartProducts;
