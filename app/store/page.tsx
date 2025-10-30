import ProductsPage from "@/components/Store/ProductsPage";
import CustomHeader from "@/components/ui/CustomHeader";

export const metadata = {
  title: "التبرعات - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "ساهم معنا في دعم مشاريع جمعية الهدى النبوي الخيرية الدعوية. بتبرعك، تساعد في نشر العلم الشرعي، ورعاية المحتاجين، وتمويل الأنشطة الدعوية والخيرية التي تخدم المجتمع الإسلامي.",
  keywords: [
    "الهدى النبوي",
    "تبرعات",
    "جمعية خيرية",
    "مشاريع دعوية",
    "مساعدة المحتاجين",
    "تبرع الآن",
    "خدمات خيرية",
    "دعم الجمعيات",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"), // ← غيّرها للدومين الحقيقي بعد النشر

  openGraph: {
    title: "التبرعات - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "كن سببًا في نشر الخير! تبرع لدعم مشاريع جمعية الهدى النبوي الدعوية والخيرية وساهم في بناء مجتمع واعٍ ملتزم بقيم الإسلام.",
    url: "https://alhuda-alnabawi.org/donations",
    siteName: "جمعية الهدى النبوي",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "شعار جمعية الهدى النبوي",
      },
    ],
    locale: "ar-SA",
    type: "website",
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
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