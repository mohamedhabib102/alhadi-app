"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Head from "next/head";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const pathName = usePathname();


  const handleLogout = () => {
    logout("/");
  };




  return (
    <>
          <Head>
            <title>لوحة التحكم - جمعية الهدى النبوي الخيرية الدعوية</title>
            <meta name="description" content=" لوحة التحكم " />
          </Head>
        <div className="container mx-auto px-2">
    <div className="flex lg:flex-row flex-col  items-start min-h-screen gap-6 m-4 text-gray-900 text-right">
      {/* Sidebar */}
          <nav className="lg:w-56 w-full bg-[#f4f4f4] p-4 rounded-lg shadow-sm">
        <div className="mb-6 ml-auto lg:block hidden">

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
              المشاريع
            </Link>
          </li>

          <li className="mb-3">
            <Link
              href="/dashboard/settings"
              className={`block text-lg py-2 px-3 rounded-lg transition ${
                pathName === "/dashboard/settings"
                  ? "bg-[var(--main-color)] text-white"
                  : "hover:bg-[var(--main-color)] hover:text-white bg-blue-100"
              }`}
            >
              التحكم في الرئيسية
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

      <main className="lg:flex-1 w-full bg-[#fafafa] rounded-lg shadow-sm">
        {children}
        </main>
      </div>
    </div>
    </>
  );
};

export default DashboardLayout;
