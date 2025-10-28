import PostsCard from "@/components/Posts/PostsCard";
import CustomHeader from "@/components/ui/CustomHeader";


 export const metadata ={
    title: " الهدى النبوي | المقالات ",
    description: " تابع آخر المقالات والنصائح لتثقيف المجتمع وزيادة الوعي حول الموضوعات المهمة "
 }

const Posts: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-3.5">
        <CustomHeader
          content={{
            title: " المقالات ",
            description: "تابع آخر المقالات والنصائح لتثقيف المجتمع وزيادة الوعي حول الموضوعات المهمة"
          }}
        />
        <PostsCard/>
      </div>
    </section>
  );
};

export default Posts;
