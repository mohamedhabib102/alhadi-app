"use client"
import Link from "next/link";
import React from 'react';

const Login: React.FC = () => {
    return (
      <div 
        className="flex flex-col items-center justify-center min-h-screen lg:min-h-[80vh] py-12"
      >
        <div className="max-w-md w-11/12 sm:w-full px-6 py-8 bg-white shadow-2xl rounded-lg">
          <form className="text-right">
            
            <h3 className="text-2xl font-bold mb-2 text-center">تسجيل الدخول إلى المتجر</h3>
            
            <p className="mb-6 text-gray-600 text-sm text-center">أدخل بياناتك أدناه للمتابعة</p>
            

            <input 
              type="text" 
              placeholder=" رقم الهاتف "
              name="phone"
              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />


            <input 
              type="email" 
              placeholder="البريد الإلكتروني"
              name="email"
              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />
            

            <input 
              type="password" 
              placeholder="كلمة المرور"
              name="password"
              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-8 w-full text-right"
            /> 
          
            <button
                className="bg-[var(--main-color)] cursor-pointer transition hover:bg-blue-500 text-white py-2.5 px-6 
                w-full  min-w-[150px] font-semibold rounded-[var(--border-rounded)]"
            >
                تسجيل الدخول
            </button>
                
          </form>
        </div>
      </div>
    )
} 

export default Login;