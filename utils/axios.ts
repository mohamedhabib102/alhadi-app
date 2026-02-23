import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}


const instance = axios.create({
  baseURL: "https://alhady21.runasp.net/",
  headers: { "Content-Type": "application/json" },
});


const getToken = async (): Promise<string | undefined> => {
  if (typeof window !== "undefined") {
    return Cookies.get("token");
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
  }
};

instance.interceptors.request.use(async (config) => {
  const customConfig = config as CustomAxiosRequestConfig;

  if (customConfig.skipAuth) return config;

  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// instance.interceptors.response.use(
  // (response) => response,
  // (error: AxiosError) => {

  //   if (error.response?.status === 401) {
  //     Cookies.remove("token");
  //     Cookies.remove("id");
  //     Cookies.remove("role");

  //     if (typeof window !== "undefined") {
  //       window.location.href = "/login";
  //     }
  //   }

  //   return Promise.reject(error);
  // }
//);

export default instance;
