"use client";

/**
 * Monetag Ad Engine
 * Zones:
 * - Onclick Popunder: Zone 12339261 (https://llvpn.com/tag.min.js)
 * - Vignette Banner:  Zone 12339299 (https://dd133.com/vignette.min.js)
 */

export function resetMonetagCapping() {
  if (typeof window === "undefined") return;

  try {
    const keysToRemove = [
      "zfgstorage",
      "ppuWasShown",
      "PuShown",
      "pop_fcap",
      "zfgonclickshown",
      "zfgloadedpopup",
      "zfgformats",
      "zfgonclickfirst",
      "mahClicks",
      "sessionClicks",
      "ppuClicks",
      "ppuCount",
      "ppuWasShownFor",
      "_shownFakepushFormats",
      "shown",
      "popunderAfterClicksObj",
      "canShowNewMessage",
    ];

    keysToRemove.forEach((key) => {
      try { localStorage.removeItem(key); } catch {}
      try { sessionStorage.removeItem(key); } catch {}
    });

    // Clean any dynamic Monetag storage patterns
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && /^(zfg|ppu|pop|vignette|_shown)/i.test(k)) {
        try { localStorage.removeItem(k); } catch {}
      }
    }
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (k && /^(zfg|ppu|pop|vignette|_shown)/i.test(k)) {
        try { sessionStorage.removeItem(k); } catch {}
      }
    }

    // Reset window runtime flags so Monetag listeners re-arm on every click
    const win = window as any;
    delete win.zfgonclickshown;
    delete win.zfgloadedpopup;
    delete win.zfgonclickfirst;
    delete win.zfgstorage;
    delete win.zfgformats;
    delete win.ppuWasShown;
    delete win.PuShown;
    delete win._shownFakepushFormats;

    // Clear pop_fcap cookie if present
    document.cookie = "pop_fcap=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "ppuWasShown=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } catch {
    // Graceful fallback
  }
}

export function triggerMonetagAds() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  try {
    // 1. Reset capping so ad is NOT blocked after 1 view
    resetMonetagCapping();

    const target = document.body || document.documentElement;
    if (!target) return;

    // Clean previous dynamic tags to keep DOM clean
    const oldScripts = document.querySelectorAll('script[data-monetag-dynamic="true"]');
    oldScripts.forEach((s) => s.remove());

    // 2. Re-arm Popunder (Zone 12339261)
    const pop = document.createElement("script");
    pop.dataset.zone = "12339261";
    pop.dataset.monetagDynamic = "true";
    pop.setAttribute("data-cfasync", "false");
    pop.src = "https://llvpn.com/tag.min.js";
    target.appendChild(pop);

    // 3. Re-arm Vignette Banner (Zone 12339299)
    const vig = document.createElement("script");
    vig.dataset.zone = "12339299";
    vig.dataset.monetagDynamic = "true";
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
