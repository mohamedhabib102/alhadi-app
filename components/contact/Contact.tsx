"use client";
import CustomHeader from "@/components/ui/CustomHeader";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact: React.FC = () => {
  const contactInfo = [
    {
      title: "أرقام التواصل",
      value: ["+966 123 456 789", "+966 987 654 321"],
      icon: <FaPhoneAlt size={28} className="text-white" />,
      bgColor: "bg-blue-400"
    },
    {
      title: "البريد الإلكتروني",
      value: ["info@yourassociation.com", "support@yourassociation.com"],
      icon: <FaEnvelope size={28} className="text-white" />,
      bgColor: "bg-green-400"
    },
    {
      title: "الموقع الجغرافي",
      value: ["الرياض، المملكة العربية السعودية"],
      icon: <FaMapMarkerAlt size={28} className="text-white" />,
      bgColor: "bg-red-400"
    }
  ];

  return (
    <section className="bg-gray-50 py-10 text-gray-800 text-right">
      <div className="mx-auto px-4 max-w-6xl space-y-10">
        {/* Header */}
        <CustomHeader
          content={{
            title: "تواصل معنا",
            description:
              "لأي استفسار أو تواصل مع الجمعية، يمكنكم استخدام المعلومات التالية للوصول إلينا بسهولة.",
          }}
        />

        {/* البوكسات */}
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
            <FadeInOnScroll key={index}>
               <div
                 key={index}
                 className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
               >
                 <div
                   className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${item.bgColor}`}
                 >
                   {item.icon}
                 </div>
   
                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                 {item.value.map((val, idx) => (
                   <p key={idx} className="text-gray-700 text-sm">
                     {val}
                   </p>
                 ))}
               </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
