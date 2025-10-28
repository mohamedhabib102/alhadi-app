import ProductCard from "@/components/Store/ProductCard";
import ProductsPage from "@/components/Store/ProductsPage";
import CustomHeader from "@/components/ui/CustomHeader";

export const metadata = {
  title: " جمعية الهدى | المتجر ",
  description: " إدارة المتجر ",
};

const data = {
    title: "متجرنا",
    description: "كل عملية شراء تدعم قضيتنا! تصفح منتجاتنا الفريدة وساهم معنا في توفير الرعاية والحماية للحيوانات المحتاجة"
}

const Store: React.FC = () => {
    return (
       <section className="py-16">
           <div className="container mx-auto px-3.5"> 
             <CustomHeader content={data}/>

             <div className="text-right">
                    <ProductsPage />
                </div>
           </div>
       </section>
    )
}

export default Store;