import AboutPage from "@/components/about/About";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "من نحن - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "جمعية الهدى النبوي الخيرية الدعوية تهدف إلى نشر العلم الشرعي الصحيح وتعزيز القيم الإسلامية، مع تقديم خدمات خيرية ودعوية بكفاءة وشفافية. تعرف على رسالتنا ورؤيتنا وأهدافنا في خدمة المجتمع الإسلامي.",
  keywords: [
    "الهدى النبوي",
    "جمعية خيرية",
    "جمعية دعوية",
    "من نحن",
    "رسالة الجمعية",
    "أهداف الجمعية",
    "خدمات خيرية",
    "التوعية الدينية",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],
  metadataBase: new URL("https://alhuda-alnabawi.org"),
  openGraph: {
    title: "من نحن - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "اكتشف رسالتنا وأهدافنا في جمعية الهدى النبوي الخيرية الدعوية، حيث نسعى لنشر العلم الشرعي الصحيح وتعزيز القيم الإسلامية من خلال خدمات دعوية وخيرية متميزة.",
    url: "https://alhuda-alnabawi.org/about",
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



const About: React.FC = () => {
  return (
    <>
      <AboutPage/>
    </>
  );
};

export default About;
