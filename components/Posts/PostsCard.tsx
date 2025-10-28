"use client";

import Image from "next/image";
import FadeInOnScroll from "../ui/FadeInOnScroll";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "الهدى النبوي",
    description: "السنة النبوية تعلّمنا الأخلاق الحميدة في التعامل مع الآخرين.",
    image: "/images/post.jpg",
  },
  {
    id: 2,
    title: "الهدى النبوي",
    description: "الاستغفار وذكر الله يوميًا يزيد من البركة في الحياة.",
    image: "/images/post.jpg",
  },
  {
    id: 3,
    title: "الهدى النبوي",
    description: "الصدقة تُطهّر النفس وتزيد من أجر المسلم عند الله.",
    image: "/images/post.jpg",
  },
  {
    id: 4,
    title: "الهدى النبوي",
    description: "الصلاة على وقتها تربي النفس على الانضباط وتقوي العلاقة مع الله.",
    image: "/images/post.jpg",
  },
];

const PostsCard: React.FC = () => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
            <FadeInOnScroll key={post.id}>
              <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-right">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600" dir="rtl">{post.description}</p>
                  </div>
                </div>
            </FadeInOnScroll>
        ))}
      </div>
  );
};

export default PostsCard;
