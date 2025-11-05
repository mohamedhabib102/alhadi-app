import UsersContent from "@/components/dashboard/UserContent";




export const metadata = {
  title: "المستخدمين - لوحة التحكم - جمعية الهدى النبوي الخيرية الدعوية",
  description: "تحكم في المستخدمين",
};



const UsersPage: React.FC = () => {


  return (
    <>
    <UsersContent />
    </>
 
  );
};

export default UsersPage;
