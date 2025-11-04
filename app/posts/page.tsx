import PostsCard from "@/components/Posts/PostsCard";
import CustomHeader from "@/components/ui/CustomHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المقالات - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "تابع أحدث المقالات الصادرة عن جمعية الهدى النبوي الخيرية الدعوية، التي تهدف إلى تثقيف المجتمع ونشر الوعي حول الموضوعات الإسلامية والاجتماعية المهمة.",
  keywords: [
    "الهدى النبوي",
    "مقالات",
    "نصائح دعوية",
    "تثقيف المجتمع",
    "الوعي الديني",
    "جمعية خيرية",
    "جمعية دعوية",
    "العلم الشرعي",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "المقالات - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "اقرأ أحدث المقالات الدعوية والتوعوية من جمعية الهدى النبوي التي تسعى لنشر العلم الشرعي الصحيح وتعزيز القيم الإسلامية في المجتمع.",
    url: "https://alhuda-alnabawi.org/posts",
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
    type: "article",
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

const Posts: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-3.5">
        <CustomHeader
          content={{
            title: "المنشورات",
            description:
              "تابع آخر المنشورات والنصائح لتثقيف المجتمع وزيادة الوعي حول الموضوعات المهمة.",
          }}
        />
        <PostsCard />
      </div>
    </section>
  );
};

export default Posts;
