import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}


const instance = axios.create({
  baseURL: "https://alhady21.runasp.net/",
  headers: { "Content-Type": "application/json" },
});


instance.interceptors.request.use((config) => {
  const customConfig = config as CustomAxiosRequestConfig;


  if (customConfig.skipAuth) return config;


  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {

    if (error.response?.status === 401) {
      // 🧹 مسح الكوكيز
      Cookies.remove("token");
      Cookies.remove("id");
      Cookies.remove("role");

  
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
