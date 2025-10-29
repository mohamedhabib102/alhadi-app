"use client";

import { useAuth } from "@/utils/AuthContext";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Toggles {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  onLoad: () => Promise<void>;
}

interface DataCreate {
  title: string;
  description: string;
  images: File[];
}

const AddNewSlide: React.FC<Toggles> = ({ toggle, setToggle, onLoad }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [project, setProject] = useState<DataCreate>({
    title: "",
    description: "",
    images: [],
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();

  // 🔹 تحديث النصوص
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 تحديث الصور (تعدد الملفات)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setProject((prev) => ({
        ...prev,
        images: fileArray,
      }));
    }
  };

  // 🔹 رفع السلايد
  const sendSlide = async () => {
    if (!project.title || !project.description || project.images.length === 0) {
      alert("يرجى إدخال جميع البيانات وإضافة الصور!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Title", project.title);
      formData.append("Description", project.description);

      project.images.forEach((file) => {
        formData.append("Images", file);
      });

      await instance.post("/api/Donations/AddSlide", formData, {
        skipAuth: true,
      } as CustomAxiosConfig);

      await onLoad();
      setToggle(false);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء رفع السلايد.");
    } finally {
      setLoading(false);
    }
  };

  const text = loading ? "جاري التحميل..." : "إضافة Slide";

  return (
    <>
      {/* خلفية التعتيم */}
      <div
        className={`fixed bg-[#0000004c] backdrop-blur-[3px] top-0 left-0 w-full h-full z-50 
        ${toggle ? "opacity-100 visible" : "opacity-0 invisible"} transition`}
      ></div>

      {/* نافذة الإدخال */}
      <div
        className={`
          fixed bg-[#eee] 
          w-[90%] max-w-[600px] min-h-[300px] 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          z-[60] p-6 rounded-xl shadow-lg 
          flex flex-col justify-center
          transition-all
          ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendSlide();
          }}
          className="w-full flex flex-col gap-2.5"
        >
          <h3 className="text-[23px] font-bold text-right" dir="rtl">
            يمكنك إضافة Slide جديدة
          </h3>
          <p className="mb-4 text-gray-600 text-lg text-right" dir="rtl">
            أدخل بيانات الـ Slide
          </p>

          {/* العنوان */}
          <input
            type="text"
            placeholder="العنوان"
            name="title"
            onChange={handleChange}
            value={project.title}
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] focus:border-b-[var(--main-color)] 
              transition mb-6 w-full text-right"
          />

          {/* الوصف */}
          <input
            type="text"
            placeholder="الوصف"
            name="description"
            onChange={handleChange}
            value={project.description}
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] focus:border-b-[var(--main-color)] 
              transition mb-6 w-full text-right"
          />

          {/* الصور */}
          <input
            ref={fileRef}
            type="file"
            multiple
            name="images"
            onChange={handleFileChange}
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] focus:border-b-[var(--main-color)] 
              transition mb-6 w-full text-right"
          />

          {/* عرض الصور */}
          {project.images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {project.images.map((file, index) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  width={250}
                  height={150}
                  className="rounded-lg object-cover shadow-md"
                />
              ))}
            </div>
          )}

          {/* الأزرار */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-[var(--main-color)] transition text-white py-2.5 px-6 
              w-full font-semibold rounded-[var(--border-rounded)] mb-4
              ${
                loading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-blue-500 cursor-pointer"
              }`}
          >
            {text}
          </button>

          <span
            onClick={() => setToggle(false)}
            className="bg-red-500 transition text-white py-2.5 px-6 
              w-full font-semibold rounded-[var(--border-rounded)] 
              hover:bg-red-400 block text-center cursor-pointer"
          >
            إلغاء العملية
          </span>
        </form>
      </div>
    </>
  );
};

export default AddNewSlide;
