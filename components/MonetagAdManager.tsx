"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { triggerMonetagAds } from "@/lib/ads";

export default function MonetagAdManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-arm and trigger Popunder & Vignette on initial load and on every page/tab change
    triggerMonetagAds();
  }, [pathname]);

  return null;
}
