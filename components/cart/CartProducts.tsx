"use client";
import { useAuth } from "@/utils/AuthContext";
import instance from "@/utils/axios";
import { motion, AnimatePresence  } from "framer-motion";
import axios, { AxiosRequestConfig } from "axios";
import Image from "next/image";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaUniversity } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

declare var Moyasar: any;

type CartResponse = {
  personID: number;
  sectionID: number;
  amount: number;
  totalAmount: number
  sectionName: string;
  sectionImage: string;
}


interface TokenData {
  token: string;
  last_four: string;
  name: string;
  expiry: string;
}



const CartProducts = () => {
  const [error, setError] = useState<string>("");
  const {user} = useAuth()
  const [cart, setCart] =  useState<CartResponse[]>([])
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState<boolean>(false);
  

  const [visaData, setVisaData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleVisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") {
      formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
    }
    if (name === "expiryDate") {
      formatted = value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    if (name === "cvv") {
      formatted = value.replace(/\D/g, "").slice(0, 3);
    }

    setVisaData((prev) => ({ ...prev, [name]: formatted }));
  };

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

useEffect(() => {
  const processStoredToken = async () => {
    const token = localStorage.getItem("paymentToken");
    const amount = localStorage.getItem("paymentAmount");

      if (!token || !amount || !user?.id) return;
      try {
        setLoading(true);
        const res = await instance.post(
          `/api/Donations/create-payment?PersonID=${user.id}&amount=${amount}&token=${token}`
        );
        localStorage.removeItem("paymentToken");
        localStorage.removeItem("paymentAmount");
        window.location.href = res.data.transaction_url;
      } catch (err) {
        console.error("Error processing payment:", err);
        setError("حدث خطأ أثناء معالجة الدفع");
      } finally {
        setLoading(false);
      }
  };

  processStoredToken();
}, [user.id]);

     
  const totalAmount = () => {
    if (cart.length > 0) {
      return cart[0].totalAmount
    }
    return 0;
  }



  /// 4201 3201 1111 1010 || 4111111111111111 || Ahmed Ibrahim || 4201320111111010
  // 12/28
  // 555 || 123



const createPayment = async (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!visaData.cardNumber.trim() || !visaData.cardHolder.trim() || !visaData.expiryDate.trim() || !visaData.cvv.trim()) {
    alert("يرجى إدخال جميع بيانات البطاقة أولاً.");
    return;
  }


  setLoading(true);
  setError(""); // Clear any previous errors
  try {
    const publicKey = process.env.NEXT_PUBLIC_MYOASAR_PUBLIC_KEY?.trim();
    if (!publicKey) {
      alert("Public Key مش موجود");
      return;
    }
    const [monthStr, yearStr] = visaData.expiryDate.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);

    const requestData = {
      name: visaData.cardHolder,
      number: visaData.cardNumber.replace(/\s+/g, ""),
      cvc: visaData.cvv,
      month,
      year,
      callback_url: `https://alhadi-alnabawy.org.sa/store/cart`,
      // callback_url: `http://localhost:3000/store/cart`,
    };
    const response = await axios.post("https://api.moyasar.com/v1/tokens", requestData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(publicKey + ":"),
      },
    });
    const tokenData = response.data;
    if (tokenData.id) {
      localStorage.setItem("paymentToken", tokenData.id);
      localStorage.setItem("paymentAmount", totalAmount().toString());
      
      if (tokenData.verification_url) {
        window.location.href = tokenData.verification_url;
      } else {
        // Reload to trigger the useEffect if there is no verification URL
        window.location.reload();
      }
    }
  } catch (err) {
    console.error(err);
    setError("حدث خطأ أثناء إنشاء التوكن، يرجى المحاولة مرة أخرى.");
    setLoading(false);
  }
};




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


  useEffect(() => {
    // تم استبدال تحميل السكريبت بالتعامل المباشر مع API ميسر للحصول على التوكن
  }, [])


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
            <span className="font-bold text-gray-800">SAR {
              totalAmount()
              }</span>
          </div>

          <form 
          className="mt-6"
          onSubmit={createPayment}
          >
            <h3 className="text-md font-semibold mb-4 text-gray-700 text-right flex items-center gap-2 justify-end">
              بيانات بطاقة الدفع
              <FaCcVisa className="text-blue-700 text-2xl" />
              <FaCcMastercard className="text-red-500 text-2xl" />
            </h3>

            <div
              className="relative rounded-2xl p-5 mb-5 text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
                minHeight: "160px",
              }}
            >
              <div className="absolute top-3 right-4 opacity-10 text-[80px] font-bold select-none">VISA</div>
              <MdCreditCard className="text-4xl mb-3 opacity-80" />
              <p className="text-lg tracking-widest font-mono mb-3">
                {visaData.cardNumber || "•••• •••• •••• ••••"}
              </p>
              <div className="flex justify-between text-xs opacity-80 flex-row-reverse">
                <span>{visaData.cardHolder || "اسم حامل البطاقة"}</span>
                <span>{visaData.expiryDate || "MM/YY"}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1 text-right">رقم البطاقة</label>
              <input
                type="text"
                name="cardNumber"
                value={visaData.cardNumber}
                onChange={handleVisaChange}
                placeholder="•••• •••• •••• ••••"
                dir="ltr"
                required={true}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition placeholder:text-gray-400 font-mono tracking-widest text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1 text-right">اسم حامل البطاقة</label>
              <input
                type="text"
                name="cardHolder"
                value={visaData.cardHolder}
                onChange={handleVisaChange}
                placeholder="الاسم كما يظهر على البطاقة"
                dir="rtl"
                required={true}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition placeholder:text-gray-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1 text-right">تاريخ الانتهاء</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={visaData.expiryDate}
                  onChange={handleVisaChange}
                  onFocus={() => setFocusedField("expiryDate")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="MM/YY"
                  maxLength={5}
                  dir="ltr"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition placeholder:text-gray-400 font-mono text-sm"
                />
                <AnimatePresence>
                  {focusedField === "expiryDate" && (
                    <motion.p
                      key="expiry-hint"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-blue-400 mt-1 text-right"
                    >
                      مثال: 08/27
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 text-right">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={visaData.cvv}
                  onChange={handleVisaChange}
                  onFocus={() => setFocusedField("cvv")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="•••"
                  maxLength={3}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition placeholder:text-gray-400 font-mono text-sm"
                />
                <AnimatePresence>
                  {focusedField === "cvv" && (
                    <motion.p
                      key="cvv-hint"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-blue-400 mt-1 text-right"
                    >
                      3 أرقام خلف البطاقة
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-right mb-5 flex items-center gap-1 justify-end">
              <FaUniversity className="text-gray-400" />
              بياناتك محمية ومشفرة بالكامل
            </p>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-white font-semibold text-base transition-all cursor-pointer
                ${cart.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
                }`}
            >
              {loading ? (
                <AiOutlineLoading3Quarters size={20} className="mx-auto animate-spin" />
              ) : "ادفع الآن — SAR " + totalAmount()}
            </button>
          </form>
        </div>
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
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
          </div>
      </div>) : (
        <p className="text-black font-medium text-center"> لا يوجد مشاريع هنا يجب عليك التسجيل وإضافة مشروع في السلة </p>
      )}
      </>
    </div>
  );
};

export default CartProducts;
