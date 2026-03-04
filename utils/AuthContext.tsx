"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode
} from "react";
import Cookies from "js-cookie";

type AuthData = {
  id: string | null;
  role: string | null | undefined;
  token: string | null;
};

type AuthContextType = {
  user: AuthData;
  setUser: (data: AuthData) => void;
  storeToken: (token: string) => void;
  logout: (redirectTo?: string) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthData>({
    id: null,
    role: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);

  const cookieOptions: {
    sameSite: "lax" | "strict" | "none";
    secure: boolean;
    path: string;
    expires: number;
  } = {
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: 1 / 24, // ساعة
  };

  useEffect(() => {
    const id = Cookies.get("id") || null;
    const role = Cookies.get("role") || null;
    const token = Cookies.get("token") || null;

    setUserState({ id, role, token });
    setLoading(false); 
  }, []);

  // يخزن التوكن في كوكي لوحده
  const storeToken = (token: string) => {
    Cookies.set("token", token, cookieOptions);
  };

  const setUser = (data: AuthData) => {
    if (data.id) Cookies.set("id", data.id, cookieOptions);
    if (data.role) Cookies.set("role", data.role, cookieOptions);
    if (data.token) storeToken(data.token);
    setUserState(data);
  };

  const logout = (redirectTo?: string) => {
    Cookies.remove("id", cookieOptions);
    Cookies.remove("role", cookieOptions);
    Cookies.remove("token", cookieOptions);

    setUserState({ id: null, role: null, token: null });

    if (redirectTo) window.location.href = redirectTo;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, storeToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
