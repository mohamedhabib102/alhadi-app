"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingOverlay from "@/components/layout/SpinnerOverlay";

const GlobalLoading: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return <LoadingOverlay />;
};

export default GlobalLoading;
