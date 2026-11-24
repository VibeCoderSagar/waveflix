"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { triggerMonetagAds } from "@/lib/ads";

export default function MonetagAdManager() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial mount is handled by layout <head> scripts.
    // On subsequent SPA route transitions (Tabs, OTT, Detail page, Player page, etc.),
    // re-trigger both Popunder and Vignette ads.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    triggerMonetagAds();
  }, [pathname]);

  return null;
}
