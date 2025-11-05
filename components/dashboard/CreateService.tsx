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




const CreateServices: React.FC<Toggles> = ({toggle, setToggle, getAllSercices})=> {
    
      const [loading, setLoading] =  useState<boolean>(false);
      const [image, setImage] = useState<File | null>(null);
      const [api, setApi] = useState<number>(0)
      const fileRef =  useRef<HTMLInputElement|null>(null)
      const [preview, setPreview] = useState<string>("");


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
             formData.append("image", image);
             const res = await instance.post(
               `/api/Donations/UploadImage?ServicesID=${api}`,
               formData,
               {
                 headers: {
                   "Content-Type": "multipart/form-data",
                 },
                 skipAuth: true,
               } as CustomAxiosRequestConfig
             )
             if (fileRef.current) fileRef.current.value = "";
             setImage(null);
             setPreview("");
             setApi(0);
             setToggle(false);
             await getAllSercices();
             alert("✅ تمت إضافة الصورة بنجاح!");
           } catch (error) {
             console.log(error);
             alert("حدث خطأ أثناء رفع الصورة");
           } finally {
             setLoading(false);
           }
         };
              

    const text = loading ? "جاري التحميل..." : " إضافة المشروع ";
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
            ${toggle? "opacity-100 scale-100" : "opacity-0 scale-0"}
          `}
        >
          <form
          onSubmit={addService}
          className="w-full flex flex-col gap-2.5">
            <h3 className="text-[23px] font-bold text-right">  اضافة خدمة جديدة </h3>
            <p className="mb-4 text-gray-600 text-lg text-right">أدخل صورة الخدمة</p>
             
             <div>
            <label
                htmlFor="service"
                className="text-gray-700 text-right block font-medium"
              >
                اختر الدور الجديد:
              </label>
              <select
                id="service"
                name="service"
                onChange={(e) => setApi(Number(e.target.value))}
                value={api}
                required
                className="block w-full border-b-2 border-gray-300 bg-transparent py-2 px-2 text-right
                  outline-none focus:border-blue-500 transition rounded-md"
              >
                <option value={0}>-- اختر الخدمة --</option>
                <option value={1}> اعضاء مجلس الأدارة </option>
                <option value={2}> المسؤول التنفيذي </option>
                <option value={3}> مجلس اللجان </option>
                <option value={4}> الجمعية العمومية </option>
              </select>
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