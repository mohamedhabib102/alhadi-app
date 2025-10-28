"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user.token || user.role !== "Admin") {
      router.replace("/");
      return;
    }

    if (pathName === "/dashboard") {
      router.replace("/dashboard/sections");
    }
  }, [user, pathName, router]);

  return null;
};

export default Dashboard;
