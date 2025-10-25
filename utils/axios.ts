import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://onlinestoreapitest.runasp.net/api",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  // نفترض إن فيه skipAuth مؤقتًا فقط TypeScript
  const c = config as typeof config & { skipAuth?: boolean };

  if (c.skipAuth) return config;

  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
