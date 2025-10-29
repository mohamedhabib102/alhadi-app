"use client";
import CustomHeader from "@/components/ui/CustomHeader";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

const Governance: React.FC = () => {
  return (
    <section className="bg-gray-50 py-10 text-gray-800 text-right">
      <div className="mx-auto px-4 max-w-6xl space-y-12">
        <CustomHeader
          content={{
            title: "بيانات الحوكمة",
            description:
              "تسعى الجمعية للشفافية والوضوح في جميع أعمالها الإدارية والمالية، من خلال توفير بيانات الحوكمة والسياسات واللوائح، والتقارير المالية والسنوية، بالإضافة إلى إحصائيات المساعدات العينية وعقارات واستثمارات الجمعية.",
          }}
        />

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">أهداف الجمعية</h2>
            <p className="leading-loose">
              تهدف الجمعية إلى نشر العلم الشرعي الصحيح، وتعزيز القيم الإسلامية في المجتمع، ودعم المشاريع الخيرية والدعوية، مع التركيز على خدمة المستفيدين بكفاءة وشفافية. كما تسعى لتعزيز مشاركة المجتمع في المبادرات الدعوية والخيرية، والعمل على تطوير القدرات البشرية والمؤسسية لضمان استدامة العمل.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">السياسات واللوائح</h2>
            <p className="leading-loose">
              تلتزم الجمعية بالعمل وفق السياسات واللوائح الداخلية المعتمدة، بما يشمل الشؤون المالية والإدارية، وضوابط التطوع، ومعايير العمل الدعوي والخيري، لضمان تنظيم كافة العمليات وضمان الالتزام بالقوانين المحلية والمعايير الدولية للشفافية والمساءلة.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">التقارير المالية</h2>
            <p className="leading-loose">
              توفر الجمعية تقارير مالية دورية توضح الإيرادات والنفقات، وتفاصيل المشاريع والأنشطة المنفذة، لضمان الشفافية المالية أمام أعضاء الجمعية والمجتمع والداعمين. يمكن تحميل التقارير المالية السنوية للاطلاع الكامل على استخدام الموارد.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">التقارير السنوية</h2>
            <p className="leading-loose">
              تحتوي التقارير السنوية على ملخص أنشطة الجمعية طوال العام، بما يشمل المشاريع المنفذة، الفعاليات الدعوية، برامج التوعية، وعدد المستفيدين من خدمات الجمعية. يتم إعداد هذه التقارير بدقة لضمان تقييم الأداء وتحسين الخطط المستقبلية.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">إحصائيات المساعدات العينية</h2>
            <p className="leading-loose">
              تقوم الجمعية بتوزيع مساعدات عينية متنوعة تشمل المواد الغذائية، الملابس، والمستلزمات الأساسية، مع متابعة دقيقة لتوثيق الكميات وعدد المستفيدين. تُظهر الإحصائيات شفافية العملية وسهولة تتبع أثر الدعم المقدم على المجتمع.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">عقارات واستثمارات الجمعية</h2>
            <p className="leading-loose">
              تمتلك الجمعية مجموعة من العقارات والاستثمارات التي تُدار بشكل احترافي لدعم الأهداف الدعوية والخيرية. تلتزم الجمعية بمبادئ الشفافية في جميع التعاملات العقارية والاستثمارية لضمان الاستفادة المثلى من الموارد واستدامة العمل الخيري.
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Governance;
