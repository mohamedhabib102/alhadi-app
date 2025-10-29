"use client";
import { useState, useEffect, useRef } from "react";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import FadeInOnScroll from "../ui/FadeInOnScroll";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide {
  slide2ID: number;
  title: string;
  description: string;
  images: string[];
}

const SlidesPage: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // 🔹 جلب السلايدات
  const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetSlide2", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.data && Array.isArray(res.data)) {
        setSlides(res.data);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // 🔹 عرض الصور اللي المستخدم بيختارها
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
    if (files && files.length > 0) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    } else {
      setImagePreviews([]);
    }
  };


  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    if (images) {
      Array.from(images).forEach((img) => formData.append("images", img));
    }

    try {
      const res = await instance.post("/api/Donations/AddSlide2", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("✅ تمت إضافة السلايد بنجاح!");
        setTitle("");
        setDescription("");
        setImages(null);
        setImagePreviews([]);
        await fetchSlides();
        if (fileRef.current) {
            fileRef.current.value = ""
         }
      } else {
        alert("⚠️ حدث خطأ أثناء الإضافة!");
      }
    } catch (error) {
      console.error("Error adding slide:", error);
      alert("⚠️ فشل الاتصال بالخادم!");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا السلايد؟")) return;

    try {
      const res = await instance.delete("/api/Donations/DeleteSlide2", {
        params: { Slide2ID: id },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("🗑️ تم حذف السلايد بنجاح!");
        fetchSlides();
      } else {
        alert("⚠️ فشل الحذف!");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("⚠️ فشل الاتصال بالخادم!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700" dir="rtl">
        إضافة Slide جديد
      </h1>

      <form
        onSubmit={handleAddSlide}
        className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto mb-10"
      >
        <input
          type="text"
          placeholder="العنوان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none  text-right mb-3 p-2 border rounded-lg"
          required
        />

        <textarea
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full outline-none  text-right mb-3 p-2 border rounded-lg"
          required
        ></textarea>

        <input
          ref={fileRef}
          type="file"
          multiple
          onChange={handleImageChange}
          className="mb-3"
        />
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-400 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-500 transition disabled:bg-gray-400"
        >
          {loading ? "جارٍ الإرسال..." : "إضافة"}
        </button>
      </form>

      {/* عرض السلايدات */}
      <div className="grid md:grid-cols-3 gap-6">
        {slides.map((slide) => (
            <FadeInOnScroll key={slide.slide2ID}>
         <div
            key={slide.slide2ID}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {slide.images && slide.images.length > 0 && (
              <img
                src={slide.images[0]}
                alt={slide.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {slide.title}
              </h3>
              <p className="text-gray-600 mb-3">{slide.description}</p>

              <button
                onClick={() => handleDelete(slide.slide2ID)}
                className="bg-red-400 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-500"
              >
                حذف
              </button>
            </div>
          </div>
            </FadeInOnScroll>
        ))}
      </div>

      {slides.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          لا توجد سلايدات حالياً يمكنك الأضافة
        </p>
      )}
    </div>
  );
};

export default SlidesPage;
