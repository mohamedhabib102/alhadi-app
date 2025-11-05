"use client"
import instance from "@/utils/axios";
import { 
    Dispatch, 
    FormEvent, 
    SetStateAction, 
    useState 
} from "react";


interface Toggles {
    toggle: boolean;
    setToggle: Dispatch<SetStateAction<boolean>>;
    getAllUsers: () => Promise<void>;
    userId: number
}




const ChangeUserRole: React.FC<Toggles> = ({toggle, setToggle, getAllUsers,userId})=> {
    
      const [loading, setLoading] =  useState<boolean>(false);
      const [role, setRole] = useState<string>("")






     


   const createNewProject = async(e:FormEvent) => {
          if (!userId) return;
          const id =  Number(userId)
          let letter =  role.charAt(0).toUpperCase()
          const curRole = letter+role.slice(1);
        e.preventDefault()


       try {
         setLoading(true)
        const res = await instance.patch(`/api/Donations/ChangeRoleByAdmin?PersonID=${id}&Role=${curRole}`, 
        
        {
           headers: { "Content-Type": "multipart/form-data" }
        })
        

        setRole("")
        setToggle(!toggle)
        alert( "✅ تمت تغير الدور بنجاح!" )
        getAllUsers();
        
       } catch (error) {
           console.log(error);
       } finally{
        setLoading(false)
    }
   }



    const text = loading ? "جاري التحميل..." : " تغير ";
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
            <h3 className="text-[23px] font-bold text-right"> تغير دور المستخدم </h3>     
             <div>
                
            <input 
              type="text" 
              placeholder=" اكتب الدور المناسب "
              name="Name"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              required
              className="block capitalize py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] 
              focus:border-b-[var(--main-color)] transition mb-6 w-full text-right"
            />







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
export default ChangeUserRole;