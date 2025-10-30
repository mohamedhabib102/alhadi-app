import CartProducts from "@/components/cart/CartProducts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "السلة - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "راجع تبرعاتك أو مشترياتك قبل إتمام العملية. يمكنك تعديل السلة أو متابعة الدفع لدعم مشاريع جمعية الهدى النبوي الخيرية والدعوية.",
  keywords: [
    "الهدى النبوي",
    "السلة",
    "تبرعات",
    "مشتريات",
    "جمعية خيرية",
    "مشاريع دعوية",
    "دعم خيري",
    "تبرع الآن",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "السلة - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "راجع تفاصيل تبرعاتك أو مشترياتك قبل الإتمام وساهم معنا في دعم المشاريع الخيرية لجمعية الهدى النبوي.",
    url: "https://alhuda-alnabawi.org/cart",
    siteName: "الهدى النبوي",
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

const Cart = () => {
  return (
    <div className="bg-gray-50 py-10">
      <CartProducts />
    </div>
  );
};

export default Cart;
