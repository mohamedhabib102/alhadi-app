"use client"

import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState
} from "react";


interface Toggles {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  getAllSercices: () => Promise<void>
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}


const CreateServices: React.FC<Toggles> = ({ toggle, setToggle, getAllSercices }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string>("");

  const SLIDE_NAME = "services";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file));
    }
  };

  const addService = async (e: FormEvent) => {
    e.preventDefault();

    if (!image) return alert("الرجاء اختيار صورة");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("SlideName", SLIDE_NAME);
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("images", image);

      const res = await instance.post(
        "/api/Donations/AddSlidePlus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          skipAuth: true,
        } as CustomAxiosRequestConfig
      )
      
      if (res.status === 200) {
        if (fileRef.current) fileRef.current.value = "";
        setImage(null);
        setPreview("");
        setTitle("");
        setDescription("");
        setToggle(false);
        await getAllSercices();
        alert("✅ تمت إضافة الخدمة بنجاح!");
      }
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء إضافة الخدمة");
    } finally {
      setLoading(false);
    }
  };


  const text = loading ? "جاري التحميل..." : " إضافة الخدمة ";
  return (
    <>
      <div className={
        `fixed bg-[#0000004c] backdrop-blur-[3px] top-0 left-0 w-full 
        h-full z-50 ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`
      }></div>
      <div
        className={`
            fixed bg-[#eee] 
            w-[90%] max-w-[600px]  min-h-[300px] 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            z-[60] p-6 rounded-xl shadow-lg 
            flex flex-col justify-center
            transition
            ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-0"}
          `}
      >
        <form
          onSubmit={addService}
          className="w-full flex flex-col gap-2.5">
          <h3 className="text-[23px] font-bold text-right"> اضافة خدمة جديدة </h3>
          <p className="mb-4 text-gray-600 text-lg text-right">أدخل بيانات الخدمة الجديدة</p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder=" عنوان الخدمة "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition w-full text-right"
            />

            <textarea
              placeholder=" وصف الخدمة "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition w-full text-right min-h-[80px]"
            />

            <input
              ref={fileRef}
              type="file"
              placeholder=" صورة الخدمة "
              name="image"
              required
              onChange={handleFileChange}
              className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />
            {image && (
              <Image
                src={preview}
                alt="preview"
                className="w-full h-[125px] object-cover rounded-lg mb-4"
                width={300}
                height={200}
              />
            )}


            <button
              type="submit"
              disabled={loading}
              className={`bg-[var(--main-color)] transition text-white py-2.5 px-6 
                          w-full min-w-[150px] font-semibold rounded-[var(--border-rounded)] mb-4
              ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-500 cursor-pointer"}`}
            >
              {text}
            </button>
            <span
              onClick={() => setToggle(!toggle)}
              className={`bg-red-500 transition text-white py-2.5 px-6 
             w-full min-w-[150px] cursor-pointer font-semibold rounded-[var(--border-rounded)] 
            hover:bg-red-400 block text-center`
              }>
              إلغاء العمليه
            </span>
          </div>

        </form>
      </div>

    </>
  )
}
export default CreateServices;