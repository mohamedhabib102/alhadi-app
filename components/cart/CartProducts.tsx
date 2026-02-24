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


const getAllProjects = async () => {
  const id = user.id;
  try {
    const res = await instance.get(
      `/api/Donations/GetAllDonationCarts?personID=${id}`,
      { skipAuth: true } as CustomAxiosRequestConfig
    );
    setCart(res.data);
  } catch (error: unknown) {
    console.log(error);

    if (typeof error === "object" && error !== null && "response" in error) {
      const errWithResponse = error as { response?: { status?: number } };
      if (errWithResponse.response?.status === 404) {
        setCart([]);
      }
    }
  }
};


useEffect(() => {
  if (user.id) {
    getAllProjects();
  }
}, [user.id]);

     


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
        setToggle(false);
        const linkPayment = "https://n4bkqu.zid.store/";
        window.location.href = linkPayment;
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
     } catch (error) {
       console.log(error);
     }
   }





const deleteCart = async (personID: number, sectionID: number) => {
  try {
    const res = await instance.delete("/api/Donations/DeletItemOfCart", {
      data: { personID, sectionID },
      skipAuth: true, 
    } as CustomAxiosRequestConfig);
    await getAllProjects()
    alert("🗑️ تم حذف المشروع من السلة بنجاح ");
  } catch (error) {
    console.log(error);
    alert("⚠️ فشل الاتصال بالخادم!");
  }
};


  return (
    <div className="container mx-auto px-2">
      <>
      <CustomPopup
        toggle={toggle}
        setToggle={setToggle}
        title="هل أنت متأكد من تنفيذ عملية الدفع؟"
        message="هل ترغب في المتابعة لتأكيد عملية التبرع؟ ستقوم الجمعية بمراجعة طلبك وإتمام الإجراءات."
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
          <div className="bg-gradient-to-b from-indigo-50 to-white rounded-xl border border-indigo-100 p-6 mb-6 text-center shadow-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/icon.png"
                alt="شعار الجمعية"
                width={100}
                height={100}
                className="mx-auto mb-4 drop-shadow-md"
              />
            </motion.div>
            <h2 className="text-xl font-bold mb-3 text-indigo-900">
              جمعية الهدى النبوي الخيرية الدعوية
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              تهدف جمعية الهدى النبوي الخيرية الدعوية إلى نشر العلم الشرعي الصحيح، وتعزيز القيم الإسلامية في المجتمع، وتقديم خدمات دعوية وخيرية بكفاءة وشفافية.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="w-12 h-1 bg-indigo-200 rounded-full"></span>
              <span className="w-4 h-1 bg-indigo-400 rounded-full"></span>
              <span className="w-12 h-1 bg-indigo-200 rounded-full"></span>
            </div>
          </div>

          <div className="mt-4 pt-4 text-right">
            <h3 className="text-md font-semibold mb-3 text-gray-700"> سلة التبرعات  </h3>
      <div className="space-y-4">
            <AnimatePresence>
              {cart.length !== 0 ? (cart.slice(0, visibleCount).map((ele, index) => (
                <motion.div
                  key={`${ele.sectionID}-${index}`}
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
                    <button
                    type="button"
                    onClick={() => deleteCart(ele.personID, ele.sectionID)} 
                    className="bg-red-400 cursor-pointer text-white py-2 px-3 my-2
                    rounded-lg hover:bg-red-500 transition"> حذف </button>
                  </div>
                </motion.div>
              ))) : (<p> لا يوجد تبرعات حاليا</p>)}
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
              تأكيد الدفع
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
