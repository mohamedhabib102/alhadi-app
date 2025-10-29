"use client";
import CustomHeader from "@/components/ui/CustomHeader";
import Image from "next/image";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

const About: React.FC = () => {
  return (
    <section className="mx-auto px-4 py-10 max-w-5xl space-y-10 leading-relaxed text-gray-800 text-right">
      <FadeInOnScroll>
        <CustomHeader
          content={{
            title: "عن الجمعية",
            description:
              "جمعية خيرية دعوية تُعنى بنشر العلم الشرعي الصحيح المبني على الكتاب والسنة، وتعزيز الوعي الديني في المجتمع.",
          }}
        />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">شهادة التسجيل</h2>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
            <p className="flex-1">
              تم تأسيس الجمعية بترخيص رسمي من وزارة الشؤون الإسلامية والدعوة
              والإرشاد، وتحمل شهادة تسجيل رقم (xxxx/2025)، مما يضمن عملها وفق
              الأنظمة واللوائح المعتمدة في المملكة، وبإشراف الجهات الرسمية المختصة.
            </p>
            <div className="w-full md:w-1/3">
              <Image
                src="/images/post.jpg"
                alt="شهادة تسجيل الجمعية"
                width={400}
                height={200}
                className="rounded-xl h-82 shadow-md border border-gray-200"
              />
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">السجل التجاري</h2>
          <p className="mt-3">
            تمتلك الجمعية سجلاً تجارياً نظامياً يتيح لها تنفيذ أنشطتها الخيرية
            والتوعوية وفق القوانين المحلية، بما في ذلك تنفيذ المشاريع الدعوية،
            وتنظيم الدورات الشرعية، وإدارة الموارد المالية بشفافية واحترافية.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">الهيكل التنظيمي</h2>
          <p className="mt-3">
            تتكون الجمعية من مجلس إدارة يشرف على التوجه العام والبرامج
            الاستراتيجية، بالإضافة إلى لجان متخصصة في الدعوة، والتوعية، والتعليم،
            والإدارة المالية. ويعمل تحت هذه اللجان عدد من الموظفين والمتطوعين
            الملتزمين برسالة الجمعية وأهدافها.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">
            الخطة الاستراتيجية
          </h2>
          <p className="mt-3">
            تسعى الجمعية إلى تحقيق رؤيتها من خلال خطة استراتيجية تمتد لخمس سنوات،
            تركز على نشر العلم الشرعي، وتنمية مهارات الدعاة، وتفعيل دور المرأة
            والشباب في العمل الدعوي، إضافة إلى التوسع في استخدام التقنية في خدمة
            الدين والتوعية.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-5 text-blue-400">
            الرؤية والرسالة والأهداف والقيم
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">الرؤية</h3>
              <p>
                أن تكون الجمعية نموذجاً رائداً في الدعوة إلى الله على بصيرة، تسهم
                في بناء مجتمع واعٍ ومتمسك بالمنهج الصحيح
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900">الرسالة</h3>
              <p>
                نشر العلم الشرعي وتعزيز القيم الإسلامية في المجتمع من خلال برامج
                دعوية وتعليمية هادفة، بأساليب عصرية مؤثرة
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900">الأهداف</h3>
              <ul className="list-none list-inside space-y-1">
                <li>تعليم العقيدة الصحيحة ونشر منهج أهل السنة والجماعة</li>
                <li>تأهيل الدعاة والعاملين في المجال الدعوي.</li>
                <li>تنظيم محاضرات ودورات وملتقيات علمية.</li>
                <li>خدمة المجتمع من خلال المبادرات الدينية والتربوية</li>
                <li>استخدام التقنية والإعلام الحديث في نشر الوعي الديني</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900">القيم</h3>
              <ul className="list-none list-inside space-y-1">
                <li>الإخلاص في العمل لله تعالى</li>
                <li>الاعتدال والوسطية في الطرح</li>
                <li>المصداقية والشفافية</li>
                <li>التعاون والعمل الجماعي</li>
                <li>الابتكار في وسائل الدعوة والتعليم</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
};

export default About;
