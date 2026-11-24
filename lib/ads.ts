"use client";

/**
 * Monetag Ad Engine
 * Zones:
 * - Onclick Popunder: Zone 12339261 (https://llvpn.com/tag.min.js)
 * - Vignette Banner:  Zone 12339299 (https://dd133.com/vignette.min.js)
 */
export function triggerMonetagAds() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  try {
    const target = document.body || document.documentElement;
    if (!target) return;

    // 1. Popunder (Zone 12339261)
    const pop = document.createElement("script");
    pop.dataset.zone = "12339261";
    pop.setAttribute("data-cfasync", "false");
    pop.src = "https://llvpn.com/tag.min.js";
    target.appendChild(pop);

    // 2. Vignette Banner (Zone 12339299)
    const vig = document.createElement("script");
    vig.dataset.zone = "12339299";
    vig.setAttribute("data-cfasync", "false");
    vig.src = "https://dd133.com/vignette.min.js";
    target.appendChild(vig);
  } catch {
    // Graceful fallback
  }
}

// Aliases for compatibility across components
export function openSmartlink() {
  triggerMonetagAds();
}

export function openDirectLink() {
  triggerMonetagAds();
}
