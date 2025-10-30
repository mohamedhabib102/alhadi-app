"use client";
import { useState, useEffect, useRef } from "react";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide4 {
  slide4ID: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Part4: React.FC = () => {
  const [slides, setSlides] = useState<Slide4[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetAllSlides4", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (Array.isArray(res.data)) {
        setSlides(res.data);
      } else {
        setSlides([]);
      }
    } catch (err: unknown) {
    const error = err as any;
    console.error("Error fetching slides:", error);
    if (error?.response?.status === 404) {
      setSlides([]);
    }
  }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("الرجاء اختيار صورة!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("image", image);

    try {
      const res = await instance.post("/api/Donations/AddSlides4", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("✅ تمت إضافة السلايد بنجاح!");
        setTitle("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
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
      const res = await instance.delete("/api/Donations/DeleteSlide4", {
        params: { slideID: id },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("🗑️ تم حذف السلايد بنجاح!");
        await fetchSlides();
        setImage(null);
        setImagePreview(null);
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
          onChange={handleImageChange}
          className="mb-3 block w-full"
        />

        {imagePreview && (
          <div className="mb-3">
            <Image
              src={imagePreview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg border mx-auto"
              width={300}
              height={200}
            />
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
          <div
            key={slide.slide4ID}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {slide.imageUrl && (
              <img
                src={slide.imageUrl}
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
                onClick={() => handleDelete(slide.slide4ID)}
                className="bg-red-400 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
              >
                حذف
              </button>
            </div>
          </div>
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
