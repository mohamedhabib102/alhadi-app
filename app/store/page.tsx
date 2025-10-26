import ProductCard from "@/components/Store/ProductCard";
import CustomHeader from "@/components/ui/CustomHeader";
import { productsData } from "@/data/ProductsData";

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
           <div className="container mx-auto px-2.5"> 
             <CustomHeader content={data}/>

             <div className="text-right">
                    {/* <h2 className="text-3xl font-bold text-[var(--main-color)] mb-6">كل المنتجات</h2> */}
                    
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
                        {productsData.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
           </div>
       </section>
    )
}

export default Store;