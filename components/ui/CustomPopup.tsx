"use client";

import { Dispatch, SetStateAction } from "react";


interface Toggles {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  confirmDonation: () => Promise<void>;
  updatePayment: () => Promise<void>;
}

const CustomPopup: React.FC<Toggles> = (
  { toggle, 
    setToggle, 
    title, 
    message,
    confirmDonation,
    updatePayment
  }) => {



    const handelPayment = async() => {
       try {
         await updatePayment()

         await confirmDonation()
       } catch (error) {
         console.log(error);
         
       }
    }



  return (
    <>
      <div
        className={`fixed bg-[#0000004c] backdrop-blur-[3px] top-0 left-0 w-full h-full z-50 
        transition ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setToggle(false)}
      ></div>

      <div
        className={`fixed bg-[#eee] w-[90%] max-w-[500px] min-h-[200px] 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] 
        p-6 rounded-xl shadow-lg flex flex-col justify-center items-center transition
        ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
        <p className="text-gray-700 text-center mb-6">
          {message}
        </p>

        <div className="flex items-center gap-2.5">
          <button
          onClick={() => {
            setToggle(!toggle)
          }}
          className="bg-red-400 cursor-pointer text-white py-2 px-6 rounded-md hover:bg-red-500 transition"
        >
          إغلاق
        </button>

        <button
          onClick={() => {
            setToggle(!toggle)
            handelPayment()
          }}
          className="bg-[var(--main-color)] cursor-pointer text-white py-2 px-6 rounded-md hover:bg-blue-500 transition"
        >
          نعم متاكد
        </button>
        </div>
      </div>
    </>
  );
};

export default CustomPopup;
