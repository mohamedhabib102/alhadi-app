import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}


export const getAllSlides = async () => {
  try {
    const res = await instance.get("/api/Donations/GetAllSlides", {
      skipAuth: true,
    } as CustomAxiosConfig);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ✅ إحضار سلايدز القسم الثاني
export const getAllSlides2 = async () => {
  try {
    const res = await instance.get("/api/Donations/GetSlide2", {
      skipAuth: true,
    } as CustomAxiosConfig);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ✅ حذف سلايد
export const deleteSlid = async (id: number) => {
  try {
    const res = await instance.delete(`/api/Donations/DeleteSlide?slideID=${id}`, {
      skipAuth: true,
    } as CustomAxiosConfig);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ✅ إحضار سلايدز القسم الثالث (تم تصحيح الـ endpoint)
export const getAllSlides3 = async () => {
  try {
    const res = await instance.get("/api/Donations/GetAllSlides3", {
      skipAuth: true,
    } as CustomAxiosConfig);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
