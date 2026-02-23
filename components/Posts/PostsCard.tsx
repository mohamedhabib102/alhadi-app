"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeInOnScroll from "../ui/FadeInOnScroll";
import instance from "@/utils/axios";
import { AxiosError } from "axios";

interface Post {
  slide4ID: number;
  title: string;
  description: string;
  imageUrl: string;
}

const PostsCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await instance.get("/api/Donations/GetAllSlides7");
        setPosts(response.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 404) {
          // لا توجد بيانات - مش هيظهر رسالة خطأ
          setPosts([]);
        } else {
          setError("حدث خطأ في السيرفر، يرجى المحاولة لاحقاً.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded mb-3 w-3/4 ml-auto" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6 mt-2 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 text-lg">لا توجد منشورات متاحة حالياً.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <FadeInOnScroll key={post.slide4ID}>
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={post.imageUrl || "/icon.png"}
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
