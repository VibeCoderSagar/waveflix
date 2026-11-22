"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { triggerMonetagPush, triggerMonetagVignette } from "@/lib/monetag";

export default function MonetagAds() {
  const pathname = usePathname();
  const lastPath = useRef<string>("");

  useEffect(() => {
    // Trigger on mount and whenever the tab / route changes
    triggerMonetagPush();
    triggerMonetagVignette();
    lastPath.current = pathname;

    // Also trigger on link / tab clicks across all pages
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [role='button'], nav");
      if (target) {
        setTimeout(() => {
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
