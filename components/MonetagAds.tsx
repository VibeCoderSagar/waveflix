"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { triggerAllMonetagAds, triggerMonetagMultiTag, triggerMonetagVignette } from "@/lib/monetag";

export default function MonetagAds() {
  const pathname = usePathname();
  const lastPath = useRef<string>("");

  useEffect(() => {
    // Trigger all Monetag ads (MultiTag, Push, Vignette) on mount & every route/tab change
    triggerAllMonetagAds();
    lastPath.current = pathname;

    // Trigger on link / tab clicks across all pages
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [role='button'], nav");
      if (target) {
        setTimeout(() => {
          triggerMonetagMultiTag();
          triggerMonetagVignette();
        }, 150);
      }
    };

    document.addEventListener("click", handleDocumentClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [pathname]);

  return null;
}
