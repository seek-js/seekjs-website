"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Footer from "@/components/ui/Footer";
import { Navigation } from "@/components/ui/Navbar";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocsRoute = pathname.startsWith("/docs");

  if (isDocsRoute) return <>{children}</>;

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
