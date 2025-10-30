import MyDonationFC from "@/components/myDination/MyDonationFC";
import CustomHeader from "@/components/ui/CustomHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تبرعاتي - جمعية الهدى النبوي الخيرية الدعوية",
  description:
    "تابع تبرعاتك بسهولة وشفافية عبر حسابك في جمعية الهدى النبوي. يمكنك التعرف على المشاريع التي ساهمت فيها، والمبالغ المتبرع بها، وتواريخ التبرع، في مكان واحد منظم وواضح.",
  keywords: [
    "تبرعاتي",
    "الهدى النبوي",
    "جمعية خيرية",
    "مشاريع خيرية",
    "العمل الدعوي",
    "التبرعات",
    "شفافية",
    "إدارة التبرعات",
  ],
  authors: [{ name: "جمعية الهدى النبوي" }],

  metadataBase: new URL("https://alhuda-alnabawi.org"),

  openGraph: {
    title: "تبرعاتي - جمعية الهدى النبوي الخيرية الدعوية",
    description:
      "شاهد سجل تبرعاتك ومساهماتك الخيرية عبر منصة جمعية الهدى النبوي، وتابع أثر عطائك في دعم المشاريع الدعوية والخيرية.",
    url: "https://alhuda-alnabawi.org/my-donations",
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

const MyDonation: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-3.5">
        <CustomHeader
          content={{
            title: "تبرعاتي",
            description:
              "تابع تبرعاتك بسهولة وشفافية، تعرف على الأقسام التي دعمتها، المبالغ التي قدمتها، وتواريخ التبرع الخاصة بك، كل ذلك في مكان واحد وبطريقة مرتبة وواضحة.",
          }}
        />
        <MyDonationFC />
      </div>
    </section>
  );
};

export default MyDonation;
