"use client"

import instance from "@/utils/axios";
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
    getAllSections: () => Promise<void>
}


interface DataCreate {
    Name: string;
    TargetAmount: string;
    Durations: string;
    image: File | null
}

const AddSection: React.FC<Toggles> = ({toggle, setToggle, getAllSections})=> {
    
      const [loading, setLoading] =  useState<boolean>(false);
      const [project, setProject] = useState<DataCreate>({
         Name: "",
         TargetAmount: "",
         Durations: "",
         image: null
      })
      const [image, setImage] = useState<string>("");
      const fileRef =  useRef<HTMLInputElement|null>(null)


      const handelChange = (e:ChangeEvent<HTMLInputElement>) => {
         const {name, value} = e.target;
         setProject((prev) => ({
            ...prev,
            [name]: value
         }))
      }

     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setProject((prev) => ({
            ...prev,
            image: file,
          }));
          setImage(URL.createObjectURL(file)); 
        }
      };

   const createNewProject = async(e:FormEvent) => {
        e.preventDefault()

        const targetAmountNumber  = Number(project.TargetAmount);
        const projectDate =  new Date(project.Durations);
        const today = new Date();

        projectDate.setHours(0,0,0,0)
        today.setHours(0,0,0,0)

        if (projectDate < today){
          alert(" هذا التاريخ قديم الرجاء إضافة تاريخ صحيح ");
          return;
        } else{
          console.log("%cمبروك التاريخ صح", "color: red; font-size: 30px");
        }
        
       if (isNaN(targetAmountNumber) || targetAmountNumber <= 0) {
         alert("من فضلك أدخل رقم صحيح في خانة الهدف");
         return;
       }

       try {
         setLoading(true)


        const formData = new FormData();
        formData.append("Name", project.Name);
        formData.append("TargetAmount", project.TargetAmount); 
        formData.append("Durations", project.Durations); 
        if (project.image) {
          formData.append("image", project.image);
        }
        
        const res = await instance.post("/api/Donations/AddSection", 
        formData, 
        {
           headers: { "Content-Type": "multipart/form-data" }
        })

        if (res.data){
            setToggle(!toggle)
        }
        setProject({
          Name: "",
          TargetAmount: "",
          Durations: "",
          image: null
        })
        setImage("")
        if (fileRef.current){
          fileRef.current.value = "";
        }
        alert( "✅ تمت إضافة المشروع بنجاح!" )
        getAllSections();
        
       } catch (error) {
           console.log(error);
       } finally{
        setLoading(false)
    }
   }



    

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
          onSubmit={createNewProject}
          className="w-full flex flex-col gap-2.5">
            <h3 className="text-[23px] font-bold text-right">تسجيل الدخول إلى المتجر</h3>
            <p className="mb-4 text-gray-600 text-lg text-right">أدخل بيانات المشروع</p>
             
             <div>
                
            <input 
              type="text" 
              placeholder=" اسم المشروع "
              name="Name"
              onChange={handelChange}
              value={project.Name}
              className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />

            <input 
              type="number" 
              placeholder=" الهدف "
              name="TargetAmount"
              onChange={handelChange}
              value={project.TargetAmount}
              className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />

            <input 
              type="date" 
              placeholder=" تاريخ الأنتهاء "
              name="Durations"
              onChange={handelChange}
              value={project.Durations}
              className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />

            <input 
              ref={fileRef}
              type="file" 
              placeholder=" صورة المشروع "
              name="image"
              onChange={handleFileChange}
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />
            {image && (
               <Image
                 src={image}
                 alt="preview"
                 className="w-full h-[125px] object-cover rounded-lg mb-4"
                 width={300}
                 height={200}
               />
             )}


           <button
              type="submit"
              disabled={loading} // يمنع الضغط أثناء التحميل
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
export default AddSection;