"use client"
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import instance from "@/utils/axios";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { motion, Variants, Transition } from "framer-motion";




type LoginResponse = {
  personID: string;
  role: string;
  token: string;
};


type DataLogin = {
  name: string;
  e_Mail: string;
  phoneNumber: string
}


const Login: React.FC = () => {
  const [data, setData] = useState<DataLogin>({
    name: "",
    e_Mail: "",
    phoneNumber: ""
  })
  const {setUser, user} = useAuth();
  const [loading, setLoading] =  useState<boolean>(false);

;
  const router = useRouter();

  useEffect(() => {
    if (user?.token) {
      if (user.role === "Admin") router.replace("/dashboard");
      else router.replace("/");
    }
  }, [user, router]);




  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
     const {name, value} = e.target;
     setData(prevData => ({
      ...prevData,
      [name]: value
     }))
  }

  const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};



  const handelForm =  async (e:FormEvent) => {
    e.preventDefault()
    setLoading(true);

    try {
      console.log(data);
      const res= await instance.post<LoginResponse>("/api/Donations/Login", data,
        {skipAuth: true} as any)
        console.log(res);

        const { personID, role } = res.data;

        const userData = {
          id: personID,
          role,
          token: "mm",
        } 

        setUser(userData)
      } catch (error) {
        console.log(error);
      } finally{
        
        setLoading(false);
    }
  }

  const transition: Transition = {
    duration: 0.8, 
    delay: 0,    
    ease: [0.16, 1, 0.3, 1],
  };
  const text = loading ? "جاري التحميل..." : "تسجيل الدخول";
    return (
      <div 
        className="flex flex-col items-center justify-center min-h-screen lg:min-h-[80vh] py-12"
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={defaultVariants}
          transition={transition}
          viewport={{
            once: true,
            amount: 0.3, // جزء العنصر اللي يظهر قبل الانيميشن
          }}

        className="max-w-md w-11/12 sm:w-full px-6 py-8 bg-white shadow-2xl rounded-lg">
          <form 
          method="get"
          onSubmit={handelForm}
          className="text-right">
            
            <h3 className="text-2xl font-bold mb-2 text-center">تسجيل الدخول إلى المتجر</h3>
            
            <p className="mb-6 text-gray-600 text-sm text-center">أدخل بياناتك أدناه للمتابعة</p>
            

            <input 
              type="text" 
              placeholder=" الأسم "
              name="name"
              value={data.name}
              onChange={handelChange}
              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />


            <input 
              type="email" 
              placeholder="البريد الإلكتروني"
              name="e_Mail"
              value={data.e_Mail}
              onChange={handelChange}              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />
            

            <input 
              type="text" 
              placeholder=" رقم الهاتف "
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handelChange}
              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-8 w-full text-right"
            /> 
          
            <button
              type="submit"
              disabled={loading} // يمنع الضغط أثناء التحميل
              className={`bg-[var(--main-color)] transition text-white py-2.5 px-6 
                          w-full min-w-[150px] font-semibold rounded-[var(--border-rounded)]
                          ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-500 cursor-pointer"}`}
            >
              {text}
            </button>


                
          </form>
        </motion.div>
      </div>
    )
} 

export default Login;