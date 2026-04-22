"use client";
import { useState, useEffect, useRef } from "react";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";
import FadeInOnScroll from "../ui/FadeInOnScroll";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide {
  slideID: number;
  slideName: string;
  title: string;
  description: string;
  images: string[];
}

const Part4: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const SLIDE_NAME = "message";

  const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetSlideByName", {
        params: { SlideName: SLIDE_NAME },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.data && Array.isArray(res.data)) {
        setSlides(res.data);
      } else {
        setSlides([]);
      }
    } catch (err: unknown) {
      console.error("Error fetching slides:", err);

      if (typeof err === "object" && err !== null && "response" in err) {
        const errorWithResponse = err as { response?: { status?: number } };
        if (errorWithResponse.response?.status === 404) {
          setSlides([]);
        }
      }
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

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
    if (!images || images.length === 0) {
      alert("الرجاء اختيار صورة واحدة على الأقل!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("SlideName", SLIDE_NAME);
    formData.append("Title", title);
    formData.append("Description", description);
    Array.from(images).forEach((img) => formData.append("images", img));

    try {
      const res = await instance.post("/api/Donations/AddSlidePlus", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("✅ تمت إضافة السلايد بنجاح!");
        setTitle("");
        setDescription("");
        setImages(null);
        setImagePreviews([]);
        if (fileRef.current) fileRef.current.value = "";
        await fetchSlides();
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
      const res = await instance.post("/api/Donations/DeleteSlidePlus", null, {
        params: { SlideID: id },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("🗑️ تم حذف السلايد بنجاح!");
        await fetchSlides();
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        إضافة صندوق جديد عن رسالة الجمعية
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
          className="w-full text-right mb-3 p-2 border rounded-lg outline-none"
          required
        />

        <textarea
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-right mb-3 p-2 border rounded-lg outline-none"
          required
        />

        <input
          ref={fileRef}
          type="file"
          multiple
          onChange={handleImageChange}
          className="mb-3 block w-full"
        />

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {imagePreviews.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover rounded-lg border mx-auto"
                width={300}
                height={300}
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

      <div className="grid md:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <FadeInOnScroll key={slide.slideID}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {slide.images && slide.images.length > 0 && (
                <img
                  src={slide.images[0]}
                  alt={slide.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 text-right">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-600 mb-3">{slide.description}</p>

                <button
                  onClick={() => handleDelete(slide.slideID)}
                  className="bg-red-400 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
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
          لا توجد بيانات حالياً — يمكنك الإضافة.
        </p>
      )}
    </div>
  );
};

export default Part4;

