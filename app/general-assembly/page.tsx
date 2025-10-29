"use client";
import CustomHeader from "@/components/ui/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

const GeneralAssembly: React.FC = () => {
  return (
    <section className="bg-gray-50 py-10 text-gray-800 text-right">
      <div className="mx-auto px-4 max-w-6xl space-y-12">
        {/* Header */}
        <CustomHeader
          content={{
            title: "الجمعية العمومية",
            description:
              "تمثل الجمعية العمومية الركيزة الأساسية في حوكمة الجمعية، وتُعنى بمشاركة الأعضاء في اتخاذ القرارات وتطوير مسار العمل الدعوي والخيري.",
          }}
        />

        {/* أعضاء الجمعية العمومية */}
        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              أعضاء الجمعية العمومية
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <p className="flex-1 leading-loose">
                تضم الجمعية العمومية نخبة من الأعضاء الفاعلين الذين يمثلون جميع
                فئات المجتمع المهتمة بالعمل الدعوي والخيري، حيث يشاركون في
                صياغة القرارات، واعتماد الخطط الاستراتيجية، والإشراف على أداء
                الجمعية لضمان تحقيق أهدافها وفق منهجية واضحة ومبنية على الشفافية
                والمساءلة.
              </p>
              <div className="w-full md:w-1/3">
                <Image
                  src="/images/post.jpg"
                  alt="أعضاء الجمعية العمومية"
                  width={400}
                  height={300}
                  className="rounded-xl h-82 shadow-md border border-gray-200"
                />
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* محاضر اجتماع الجمعية العمومية */}
        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              محاضر اجتماع الجمعية العمومية
            </h2>
            <p className="leading-loose mb-6">
              تُعقد اجتماعات الجمعية العمومية بشكل دوري لمناقشة تقارير الأداء
              الإداري والمالي، واعتماد الميزانيات، وانتخاب مجلس الإدارة، ومراجعة
              المشاريع الدعوية والخيرية.  
              يتم توثيق جميع المحاضر والقرارات لضمان
              الشفافية، وحفظ الحقوق، وتعزيز ثقة المجتمع في أعمال الجمعية.
            </p>

            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="https://www.instagram.com/yourpage"
                target="_blank"
                className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                عرض على إنستغرام
              </Link>
              <Link
                href="https://twitter.com/yourpage"
                target="_blank"
                className="px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
              >
                عرض على تويتر
              </Link>
            </div>
          </div>
        </FadeInOnScroll>

        {/* طلب الانضمام للجمعية العمومية */}
        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              طلب الانضمام للجمعية العمومية
            </h2>
            <p className="leading-loose mb-6">
              ترحب الجمعية بانضمام الأفراد الراغبين في المساهمة في العمل الخيري
              والدعوي، وفق الضوابط والشروط المعتمدة.  
              يمكن للراغبين تعبئة نموذج
              الانضمام عبر الرابط التالي لاستكمال بياناتهم وإرسال الطلب إلكترونيًا.
            </p>

            <div className="text-left">
              <Link
                href="https://forms.gle/exampleFormLink"
                target="_blank"
                className="inline-block px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
              >
                تعبئة نموذج الانضمام
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default GeneralAssembly;
