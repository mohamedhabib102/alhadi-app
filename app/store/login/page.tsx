"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import instance from "@/utils/axios";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { motion, Variants, Transition } from "framer-motion";
import { AxiosRequestConfig } from "axios";
import Head from 'next/head';

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}



type LoginResponse = {
  personID: string;
  otpRequired: boolean;
  role?: string;
  message?: string;
  token: string
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
  const {setUser,user} = useAuth();
  const [messageError, setMessageError] = useState<string>("");
  const [loading, setLoading] =  useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.token) {
      if (user.role === "Admin") router.replace("/dashboard");
      else router.replace("/");
    }
  }, [user, router]);



  /*
  
  sfesdf
  01094544522
  byaalkhy43@gmail.com
  

  admin

  Admin5153920

  01027227798
  mhabib7000880@gmail.com

  */


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

   const phonePattern = /^(?:966\d{9}|20\d{10})$/;

   if (!data.phoneNumber || !phonePattern.test(data.phoneNumber) || !data.e_Mail || !data.name) {
     setMessageError(" الرجاء ادخال البينات صحيحة ");
     setLoading(false);
     return;
   }

    

    try {
      setMessageError("")
      const res= await instance.post<LoginResponse>("/api/Donations/Login", data,
        {skipAuth: true} as CustomAxiosConfig)

        const { personID, otpRequired, role, token } = res.data;


        if (role === "Admin"){
          router.push("/dashboard")
          const userData = {
            id: personID,
            role,
            token,
          }
          setUser(userData)
        } else{
          if (otpRequired){
          router.push("/store/verifyotp")     
          localStorage.setItem("userOTP", JSON.stringify(personID))
        } else{
          router.push("/store/")
          const userData = {
            id: personID,
            role,
            token,
          }
          setUser(userData)
        }
        }

      } catch (error) {
        console.log(error);
        alert(" حدث خطأ  في الخادم ")
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
      <>
      <Head>
        <title>تسجيل الدخول - جمعية الهدى النبوي الخيرية الدعوية</title>
        <meta
          name="description"
          content="قم بتسجيل الدخول للوصول إلى حسابك في جمعية الهدى النبوي الخيرية الدعوية، ومتابعة تبرعاتك ومشاريعك بكل سهولة وأمان."
        />
      </Head>
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

             {messageError && (
              <p className='text-red-500 font-medium mt-2.5'>{messageError}</p>
             )}
                
          </form>
        </motion.div>
      </div>
      </>
    )
} 

export default Login;