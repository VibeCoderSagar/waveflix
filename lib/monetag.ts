"use client";

/**
 * Monetag Ad Integration Helper
 * Push Notifications Zone: 12321229
 * Vignette Banner Zone: 12321236
 */

export function triggerMonetagPush() {
  if (typeof window === "undefined") return;
  try {
    // 1. Service Worker registration for Push Notifications
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // 2. Ensure Monetag push tag script exists
    const scriptId = "monetag-push-tag";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://5gvci.com/act/files/tag.min.js?z=12321229";
      s.setAttribute("data-cfasync", "false");
      s.async = true;
      (document.head || document.body || document.documentElement).appendChild(s);
    }
  } catch (err) {
    // Graceful error ignore
  }
}

export function triggerMonetagVignette() {
  if (typeof window === "undefined") return;
  try {
    // Remove previous script instances to force re-evaluation on page/tab changes
    const existing = document.querySelectorAll('script[data-zone="12321236"]');
    existing.forEach((el) => {
      try {
        el.remove();
      } catch (_) {}
    });

    // Create fresh Vignette script
    const s = document.createElement("script");
    s.dataset.zone = "12321236";
    s.src = "https://dd133.com/vignette.min.js";
    s.setAttribute("data-cfasync", "false");
    s.async = true;
    (document.body || document.documentElement).appendChild(s);
  } catch (err) {
    // Graceful error ignore
  }
}
