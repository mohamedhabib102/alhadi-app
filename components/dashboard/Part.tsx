"use client"
import { useState, useEffect, useRef } from "react";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Slide6 {
  slide6ID: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Slides6Page: React.FC = () => {
  const [slides, setSlides] = useState<Slide6[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // 🔹 جلب السلايدات
  const fetchSlides = async () => {
    try {
      const res = await instance.get("/api/Donations/GetAllSlides6", {
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

  // 🔹 عرض الصورة المختارة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // 🔹 إضافة سلايد جديد
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
      const res = await instance.post("/api/Donations/AddSlides6", formData, {
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
        fetchSlides();
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

  // 🔹 حذف سلايد
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا السلايد؟")) return;

    try {
      const res = await instance.delete("/api/Donations/DeleteSlide6", {
        params: { slideID: id },
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      if (res.status === 200) {
        alert("🗑️ تم حذف السلايد بنجاح!");
        fetchSlides();
        // إعادة ضبط الصورة
        setImage(null);
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = "";
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
        ></textarea>

        <input
          ref={fileRef}
          type="file"
          onChange={handleImageChange}
          className="mb-3"
        />

        {imagePreview && (
          <div className="mb-3">
            <img
              src={imagePreview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-400 cursor-pointer hover:bg-blue-500 text-white py-2 rounded-lg transition disabled:bg-gray-400"
        >
          {loading ? "جارٍ الإرسال..." : "إضافة"}
        </button>
      </form>

      {/* عرض السلايدات */}
      <div className="grid md:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.slide6ID}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {slide.imageUrl && (
              <img
                src={slide.imageUrl}
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
                onClick={() => handleDelete(slide.slide6ID)}
                className="bg-red-400 cursor-pointer hover:bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          لا توجد محتويات حالياً
        </p>
      )}
    </div>
  );
};

export default Slides6Page;
