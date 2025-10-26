"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout("/");
  };

  return (
    <div className="flex items-start min-h-screen gap-6 m-4 text-gray-900 text-right">
      {/* Sidebar */}
      <nav className="w-56 bg-[#f4f4f4] p-4 rounded-lg shadow-sm">
        <div className="mb-6 ml-auto">
          <h2 className="text-xl font-bold text-[var(--main-color)]">لوحة التحكم</h2>
        </div>

        <ul>
          <li className="mb-3">
            <Link
              href="/dashboard/sections"
              className={`block text-lg py-2 px-3 rounded-lg transition ${
                pathName === "/dashboard/sections"
                  ? "bg-[var(--main-color)] text-white"
                  : "hover:bg-[var(--main-color)] hover:text-white bg-blue-100"
              }`}
            >
              الأقسام
            </Link>
          </li>

          <li className="mb-3">
            <Link
              href="/dashboard/posts"
              className={`block text-lg py-2 px-3 rounded-lg transition ${
                pathName === "/dashboard/posts"
                  ? "bg-[var(--main-color)] text-white"
                  : "hover:bg-[var(--main-color)] hover:text-white bg-blue-100"
              }`}
            >
              المقالات
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer py-2 px-3 gap-2 ml-auto text-red-600 hover:text-red-700 text-lg font-medium"
        >
          <BiLogOut size={22} /> تسجيل الخروج
        </button>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 bg-[#fafafa] p-6 rounded-lg shadow-sm">{children}</main>
    </div>
  );
};

export default DashboardLayout;
