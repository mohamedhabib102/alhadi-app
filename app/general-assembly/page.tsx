import Assembly from "@/components/general-assembly/assemble";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الجمعية العمومية - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "تعرف على الجمعية العمومية لجمعية الهدى النبوي الخيرية الدعوية، التي تضم نخبة من الأعضاء المساهمين في رسم السياسات العامة والإشراف على أعمال الجمعية ومتابعة تحقيق أهدافها الدعوية والخيرية.",
  keywords: [
    "الجمعية العمومية",
    "الهدى النبوي",
    "أعضاء الجمعية",
    "جمعية خيرية",
    "جمعية دعوية",
    "الهيئة الإدارية",
    "حوكمة الجمعيات",
    "الإشراف الإداري",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "الجمعية العمومية - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "الجمعية العمومية لجمعية الهدى النبوي هي الجهة العليا المسؤولة عن اعتماد الخطط ومتابعة تنفيذ المشاريع الخيرية والدعوية، وضمان الشفافية وتحقيق الأهداف المنشودة.",
    url: "https://alhuda-alnabawi.org/general-assembly",
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

const GeneralAssembly: React.FC = () => {
  return <Assembly />;
};

export default GeneralAssembly;
