"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import instance from "@/utils/axios";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { motion, Variants, Transition } from "framer-motion";
import { AxiosRequestConfig } from "axios";

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

 type SendData = {
    personID: number;
  otp: string
 }


const Login: React.FC = () => {
  const {setUser, user} = useAuth();
  const [messageError, setMessageError] = useState<string>("");
  const [OTP, setOTP] = useState<number|null>(0)
  const [data, setData] = useState<SendData>({
    personID: Number(user.id),
    otp: "",
  })


  const [loading, setLoading] =  useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.token) {
      if (user.role === "Admin") router.replace("/dashboard");
      else router.replace("/");
    }
  }, [user, router]);


  useEffect(() => {
    const userId = localStorage.getItem("userOTP")
    if (userId) {
      const id = JSON.parse(userId)
      setOTP(id)
    }
  }, [])




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

    if (!OTP) {
      setLoading(false);
      setMessageError("لا يوجد معرف مستخدم!");
      return;
    }

    try {
      const res= await instance.post("/api/Donations/VerifyOTP", 
      {
        personID: Number(OTP),
        otp: data.otp
      },
        {skipAuth: true} as CustomAxiosConfig)
        const { personID, role, token} = res.data;

        const userData = {
          id: personID,
          role,
          token,
        } 
        setUser(userData)
        if(role !== "Admin"){
          window.location.href = "/"
        } else{
          window.location.href = "/dashboard"
        }
      } catch (error) {
        console.log(error);
        alert(" حدث خطأ في الخادم او رقم التحقق غير صحيح ")
      } finally{
        
        setLoading(false);
    }
  }

  const transition: Transition = {
    duration: 0.8, 
    delay: 0,    
    ease: [0.16, 1, 0.3, 1],
  };
  const text = loading ? "جاري التحميل..." : " تحقق ";
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
            amount: 0.3, 
          }}

        className="max-w-md w-11/12 sm:w-full px-6 py-8 bg-white shadow-2xl rounded-lg">
          <form 
          method="get"
          onSubmit={handelForm}
          className="text-right">
            
            <h3 className="text-2xl font-bold mb-2 text-center">  التحقق من الكود </h3>
            
            <p className="mb-6 text-gray-600 text-sm text-center">أدخل  الكود المرسل إليك على الايميل </p>
            


            <input 
              type="text" 
              placeholder=" كود التحقق "
              name="otp"
              value={data.otp}
              onChange={handelChange}
              maxLength={6}
              className="block px-0 py-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-8 w-full text-right"
            /> 
          
            <button
              type="submit"
              disabled={loading}
              className={`bg-[var(--main-color)] transition text-white py-2.5 px-6 
                          w-full min-w-[150px] font-semibold rounded-[var(--border-rounded)]
              ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-500 cursor-pointer"}`}
            >
              {text}
            </button>


                {messageError? (<p className='text-right text-red-500 mt-2.5 text-lg'>{messageError}</p>) : ""}
          </form>
        </motion.div>
      </div>
    )
} 

export default Login;