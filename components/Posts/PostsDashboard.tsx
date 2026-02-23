"use client";

import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import instance from "@/utils/axios";
import CustomHeader from "@/components/ui/CustomHeader";
import { IoIosAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { AxiosError } from "axios";

interface Post {
  slide4ID: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface NewPost {
  title: string;
  description: string;
  image: File | null;
}

const PostsDashboard: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [toggle, setToggle] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    description: "",
    image: null,
  });

  // Auth guard
  useEffect(() => {
    if (authLoading) return;
    if (!user.token || user.role !== "Admin") {
      router.replace("/");
    }
  }, [user, router, authLoading]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      setFetchLoading(true);
      setFetchError(null);
      const res = await instance.get("/api/Donations/GetAllSlides7");
      setPosts(res.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 404) {
        setPosts([]);
      } else {
        setFetchError("حدث خطأ في السيرفر، يرجى المحاولة لاحقاً.");
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await instance.delete(`/api/Donations/DeleteSlide7?slideID=${id}`);
      alert("🗑️ تم حذف المنشور بنجاح!");
      getAllPosts();
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء الحذف، يرجى المحاولة لاحقاً.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPost.image) {
      alert("من فضلك اختر صورة للمنشور");
      return;
    }
    try {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append("Title", newPost.title);
      formData.append("Description", newPost.description);
      formData.append("image", newPost.image);

      await instance.post("/api/Donations/AddSlides7", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToggle(false);
      setNewPost({ title: "", description: "", image: null });
      setImagePreview("");
      if (fileRef.current) fileRef.current.value = "";
      alert("✅ تمت إضافة المنشور بنجاح!");
      getAllPosts();
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء الإضافة، يرجى المحاولة لاحقاً.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const closeModal = () => {
    setToggle(false);
    setNewPost({ title: "", description: "", image: null });
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed bg-[#0000004c] backdrop-blur-[3px] top-0 left-0 w-full h-full z-50 transition ${
          toggle ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeModal}
      />

      {/* Add Post Modal */}
      <div
        className={`fixed bg-[#eee] w-[90%] max-w-[600px] min-h-[300px]
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          z-[60] p-6 rounded-xl shadow-lg flex flex-col justify-center transition
          ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5">
          <h3 className="text-[23px] font-bold text-right">إضافة منشور جديد</h3>
          <p className="mb-4 text-gray-600 text-lg text-right">أدخل بيانات المنشور</p>

          <input
            type="text"
            name="title"
            placeholder="عنوان المنشور"
            value={newPost.title}
            onChange={handleChange}
            required
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] focus:border-b-[var(--main-color)]
              transition mb-4 w-full text-right"
          />

          <textarea
            name="description"
            placeholder="وصف المنشور"
            value={newPost.description}
            onChange={handleChange}
            required
            rows={3}
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] focus:border-b-[var(--main-color)]
              transition mb-4 w-full text-right resize-none"
          />

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
            required
            className="block py-2 px-2 outline-none bg-transparent border-b-[2px]
              border-b-[var(--border-color)] focus:border-b-[var(--main-color)]
              transition mb-4 w-full text-right"
          />

          {imagePreview && (
            <Image
              src={imagePreview}
              alt="preview"
              className="w-full h-[125px] object-cover rounded-lg mb-4"
              width={300}
              height={125}
            />
          )}

          <button
            type="submit"
            disabled={submitLoading}
            className={`bg-[var(--main-color)] transition text-white py-2.5 px-6
              w-full font-semibold rounded-[var(--border-rounded)] mb-3
              ${submitLoading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-500 cursor-pointer"}`}
          >
            {submitLoading ? "جاري الإضافة..." : "إضافة المنشور"}
          </button>

          <span
            onClick={closeModal}
            className="bg-red-500 transition text-white py-2.5 px-6
              w-full cursor-pointer font-semibold rounded-[var(--border-rounded)]
              hover:bg-red-400 block text-center"
          >
            إلغاء العملية
          </span>
        </form>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <CustomHeader content={{ title: "المنشورات", description: "تحكم في منشورات الصفحة الرئيسية" }} />

        {fetchLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded mb-3 w-3/4 ml-auto" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mt-2 ml-auto" />
                  <div className="h-9 bg-gray-200 rounded mt-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-red-500 text-lg font-semibold">{fetchError}</p>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">لا توجد منشورات حالياً</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-8">
            {posts.map((post) => (
              <div
                key={post.slide4ID}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={200}
                />
                <div className="p-4 text-right">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4" dir="rtl">{post.description}</p>
                  <button
                    onClick={() => deletePost(post.slide4ID)}
                    className="bg-red-500 py-2 px-4 rounded-lg text-white
                      cursor-pointer transition hover:bg-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={() => setToggle(true)}
          className="bg-[var(--main-color)] flex items-center gap-1.5 ml-auto p-2
            rounded-lg text-white cursor-pointer transition hover:bg-blue-500"
        >
          <IoIosAddCircle size={20} />
          <span>إضافة منشور جديد</span>
        </button>
      </div>
    </>
  );
};

export default PostsDashboard;