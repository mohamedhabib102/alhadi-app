import type { Metadata } from "next";
import "./globals.css";
import {  Noto_Sans_Arabic } from "next/font/google";


import {
  Header, 
  Footer
} from "@/components/layout"
import { AuthProvider } from "@/utils/AuthContext";
// import GlobalLoading from "@/components/layout/GlobalLoading";


const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-sansarabic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "الهدى النبوي - جمعية خيرية دعوية",
  description:
    "جمعية الهدى النبوي الخيرية الدعوية تهدف إلى نشر العلم الشرعي الصحيح، وتعزيز القيم الإسلامية في المجتمع، وتقديم خدمات دعوية وخيرية بكفاءة وشفافية.",
  keywords: [
    "الهدى النبوي",
    "جمعية خيرية",
    "جمعية دعوية",
    "نشر العلم الشرعي",
    "خدمات خيرية",
    "مشاريع دعوية",
    "التوعية الدينية",
    "التطوع",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],


  metadataBase: new URL("http://localhost:3000"), 

  openGraph: {
    title: "الهدى النبوي - جمعية خيرية دعوية",
    description:
      "جمعية الهدى النبوي الخيرية الدعوية تهدف إلى نشر العلم الشرعي الصحيح وتعزيز القيم الإسلامية، مع تقديم خدمات دعوية وخيرية بكفاءة وشفافية.",
    url: "http://localhost:3000",
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${notoSansArabic.variable} antialiased`}
      >
        <AuthProvider>
          {/* <GlobalLoading /> */}
           <Header />
            {children}
           <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
