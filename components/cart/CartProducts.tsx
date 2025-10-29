"use client";

import { useAuth } from "@/utils/AuthContext";
import instance from "@/utils/axios";
import { motion, AnimatePresence  } from "framer-motion";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaUniversity } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import CustomPopup from "../ui/CustomPopup";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

type CartResponse = {
  personID: number;
  sectionID: number;
  amount: number;
  totalAmount: number
  sectionName: string;
  sectionImage: string;
}

const CartProducts = () => {
  const [method, setMethod] = useState<string>("mada");
  const [notes, setNotes] = useState<string>("");
  const {user} = useAuth()
  const [cart, setCart] =  useState<CartResponse[]>([])
  const [visibleCount, setVisibleCount] = useState(3);
  const [toggle, setToggle] = useState<boolean>(false)
  const [paymentRef, setPaymentRef] = useState<string>("")

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, cart.length));
  };


  useEffect(() => {
    if (user?.id) {
      getAllProjects()
    }

  }, [user?.id])
  
  useEffect(() => {
     console.log(totalAmount())

   }, [cart])



   


  const getAllProjects = async() => {
    const id = user.id
    try {
        const res = await instance.get(`/api/Donations/GetAllDonationCarts?personID=${id}`, 
          {skipAuth: true} as CustomAxiosRequestConfig)
          setCart(res.data)
          console.log(res);
          
    } catch (error) {
        
    }
  }


  const totalAmount = () => {
    if (cart.length > 0) {
      return cart[0].totalAmount
    }
    return 0;
  }


const createPayment = async (e: FormEvent) => {
      e.preventDefault();
    
      if (!user?.id) return console.warn("⚠️ المستخدم غير موجود");
      if (!cart.length) return console.warn("⚠️ السلة فارغة");
    
      const selectedProduct = cart[0];
    
      const body = {
        personID: Number(user.id),
        amount: Number(selectedProduct.amount),
        paymentMethod: method,
      };
    
      try {
        const res = await instance.post(
          "/api/Donations/CreatePaymentSession",
          body,
          {
            skipAuth: true,
          } as CustomAxiosRequestConfig
        );
         setPaymentRef(res.data.transactionReference)
        console.log(res);
        setToggle(true);
      } catch (error) {
        console.error(error);
      }
    };


const confirmDonation = async () => {

      if (!user?.id) return console.warn("⚠️ المستخدم غير موجود");
      const body = {
        personID: Number(user.id),
      };
    
      try {
        const res = await instance.post(
          "/api/Donations/ConfirmDonation",
          body,
          {
            skipAuth: true,
          } as CustomAxiosRequestConfig
        );
        console.log(res);
        setToggle(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };


   const updatePayment = async() => {
    const state = "Success"
     try {
      const res = await instance.post(
        `/api/Donations/UpdatePaymentStatus?transactionRef=${paymentRef}&status=${state}`
      )
      console.log(res);
      console.log(paymentRef, state);
      
     } catch (error) {
       console.log(error);
     }
   }

  return (
    <div className="container mx-auto px-2">
      <>
      <CustomPopup
        toggle={toggle}
        setToggle={setToggle}
        title="هل أنت متأكد من تنفيذ عملية الدفع؟"
        message="سيتم خصم المبلغ من وسيلة الدفع الخاصة بك لإتمام التبرع. هل ترغب في المتابعة؟"
        confirmDonation={confirmDonation}
        updatePayment={updatePayment}
      />


        {user.id ? (        
              <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-right">
            تفاصيل التبرع
          </h2>
          <div className="border border-gray-200 rounded-lg p-4 flex justify-between flex-row-reverse items-center">
            <span className="text-gray-600">المجموع</span>
            <span className="font-bold text-gray-800">SAR {
              totalAmount()
              }</span>
          </div>
        </div>
        <form>
                  <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-right">
            طريقة الدفع
          </h2>

          <div className="space-y-3">
            {/* mada */}
            <label
              className={`flex justify-end items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
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
              className={`flex justify-end items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
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
              className={`flex justify-end items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
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
              className={`flex justify-end items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${
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
      <div className="space-y-4">
            <AnimatePresence>
              {cart.length !== 0 ? (cart.slice(0, visibleCount).map((ele, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between mb-4 border-b-2 border-b-[#EEE]"
                  initial={{ opacity: 0, y: 20 }}      // بداية الظهور
                  animate={{ opacity: 1, y: 0 }}       // الشكل النهائي
                  exit={{ opacity: 0, y: -10 }}        // عند الإزالة (اختياري)
                  transition={{ duration: 0.4 }}       // سرعة الأنيميشن
                >
                  <Image
                    src={ele.sectionImage}
                    alt={ele.sectionName}
                    className="w-16 h-16 object-cover rounded-lg border"
                    width={300}
                    height={200}
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{ele.sectionName}</p>
                    <p className="text-gray-600 text-sm">
                      ريال {ele.amount.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))) : (<p> لا يوجد تبرعات روح اتبرع يعمم </p>)}
            </AnimatePresence>
    
          {visibleCount < cart.length && (
            <motion.button
              onClick={handleShowMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              عرض المزيد
            </motion.button>
          )}
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
            <button
            type="submit"
            disabled={!cart.length}
            onClick={createPayment}
            className={
              `w-full bg-blue-400  cursor-pointer text-white py-3 rounded-lg transition
                ${cart.length === 0 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[var(--main-color)] hover:bg-blue-500"}`
                      }>
              إدخال بيانات الدفع
            </button>
          </div>
        </div>
        </form>
      </div>) : (
        <p className="text-black font-medium text-center"> لا يوجد مشاريع هنا يجب عليك التسجيل وإضافة مشروع في السلة </p>
      )}
      </>
    </div>
  );
};

export default CartProducts;
