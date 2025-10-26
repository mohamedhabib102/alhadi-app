"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.token || user.role !== "admin") {
      router.replace("/");
      return;
    }

    if (pathName === "/dashboard") {
      router.replace("/dashboard/sections");
    }
  }, [user, pathName, router]);

  if (!user.token || user.role !== "admin") return null;

  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      جاري التحويل إلى لوحة الأقسام...
    </div>
  );
};

export default Dashboard;
