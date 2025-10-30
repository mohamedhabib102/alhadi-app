import GovePage from "@/components/governance/GoverPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "البيانات الحكومية والحوكمة - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "تعرف على نظام الحوكمة والبيانات الحكومية لجمعية الهدى النبوي الخيرية الدعوية، التي تلتزم بالشفافية والمساءلة في جميع أنشطتها لتحقيق رسالتها الدعوية والخيرية بأعلى معايير الجودة والنزاهة.",
  keywords: [
    "الهدى النبوي",
    "البيانات الحكومية",
    "حوكمة الجمعيات",
    "الشفافية",
    "النزاهة",
    "جمعية خيرية",
    "جمعية دعوية",
    "حوكمة",
    "الالتزام المؤسسي",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "البيانات الحكومية والحوكمة - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "اطلع على سياسات الحوكمة والبيانات الحكومية الخاصة بجمعية الهدى النبوي التي تعكس التزامها بالشفافية والإدارة الرشيدة في العمل الخيري والدعوي.",
    url: "https://alhuda-alnabawi.org/governance",
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

const Governance: React.FC = () => {
  return <GovePage />;
};

export default Governance;
