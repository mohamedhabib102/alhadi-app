"use client";

import { Dispatch, SetStateAction } from "react";

interface CustomPopupProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  paymentData: {
    last_four: string;
    name: string;
    expiry: string;
    token: string;
  } | null;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ 
  toggle, 
  setToggle, 
  paymentData,
}) => {
  if (!paymentData) return null;

  return (
    <>
      <div
        className={`fixed bg-[#0000004c] backdrop-blur-[3px] top-0 left-0 w-full h-full z-[100] 
        transition ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setToggle(false)}
      ></div>

      <div
        className={`fixed bg-white w-[95%] max-w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] 
        p-8 rounded-2xl shadow-2xl flex flex-col transition text-right
        ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        dir="rtl"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-800">تأكيد عملية التبرع</h3>
        <p className="text-gray-500 text-sm mb-6">هل أنت متأكد من رغبتك في إتمام عملية التبرع باستخدام البطاقة التالية؟</p>

        <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-xs">رقم البطاقة</span>
            <span className="font-mono text-gray-700 tracking-wider" dir="ltr">
              •••• •••• •••• {paymentData.last_four}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-xs">حامل البطاقة</span>
            <span className="text-gray-700 text-sm font-medium">{paymentData.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">تاريخ الانتهاء</span>
            <span className="text-gray-700 font-mono text-sm">{paymentData.expiry}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setToggle(false)}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={() => setToggle(false)}
            className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            نعم، أنا متأكد
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomPopup;
