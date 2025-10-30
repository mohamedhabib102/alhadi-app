import Contact from "@/components/contact/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "يسرّ جمعية الهدى النبوي الخيرية الدعوية استقبال استفساراتكم ومقترحاتكم عبر صفحة التواصل معنا. نسعد بخدمتكم والإجابة عن جميع الأسئلة المتعلقة بمشاريعنا وخدماتنا الدعوية والخيرية.",
  keywords: [
    "الهدى النبوي",
    "تواصل معنا",
    "اتصل بنا",
    "جمعية خيرية",
    "جمعية دعوية",
    "التواصل مع الجمعية",
    "خدمة المجتمع",
    "استفسارات",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "تواصل معنا - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "تواصل مع جمعية الهدى النبوي الخيرية الدعوية للاستفسار عن أنشطتنا ومشاريعنا الخيرية والدعوية. نرحب بمشاركتكم واقتراحاتكم لخدمة المجتمع الإسلامي.",
    url: "https://alhuda-alnabawi.org/contact",
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

const ContactUs: React.FC = () => {
  return <Contact />;
};

export default ContactUs;
