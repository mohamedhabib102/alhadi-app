import EleServices from "@/components/electronic-services/eleServices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخدمات الإلكترونية - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "توفر جمعية الهدى النبوي الخيرية الدعوية مجموعة من الخدمات الإلكترونية التي تسهّل على المستفيدين الوصول إلى برامجنا ومشاريعنا الدعوية والخيرية بطريقة ميسّرة وسريعة.",
  keywords: [
    "الخدمات الإلكترونية",
    "الهدى النبوي",
    "جمعية خيرية",
    "خدمات دعوية",
    "خدمات خيرية",
    "خدمة المجتمع",
    "التحول الرقمي",
    "خدمات عبر الإنترنت",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "الخدمات الإلكترونية - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "اكتشف الخدمات الإلكترونية التي تقدمها جمعية الهدى النبوي لتسهيل الوصول إلى أنشطتها ومشاريعها الدعوية والخيرية من أي مكان.",
    url: "https://alhuda-alnabawi.org/electronic-services",
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

const ElectronicServices: React.FC = () => {
  return <EleServices />;
};

export default ElectronicServices;
