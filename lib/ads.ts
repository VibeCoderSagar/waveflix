"use client";

/**
 * Monetag Direct Link Integration
 * URL: https://hai8g.com/4/12321238
 */
export const DIRECT_LINK = 'https://hai8g.com/4/12321238';
export const SMARTLINK = DIRECT_LINK; // Alias for backward compatibility across components

// Smart Frequency Capping:
// Advertisers bid highest CPM on the first quality action in an active session.
// 5-minute cooldown prevents ad fatigue, keeps users engaged, and maximizes revenue.
const DIRECT_LINK_COOLDOWN_MS = 5 * 60 * 1000;
const STORAGE_KEY = 'wf_monetag_direct_link_last_trigger';

export function openSmartlink() {
  openDirectLink();
}

export function openDirectLink() {
  if (typeof window === 'undefined') return;

  try {
    const now = Date.now();
    const lastTrigger = Number(sessionStorage.getItem(STORAGE_KEY) || '0');

    // Skip if within cooldown window to protect user experience and retain high CPM
    if (now - lastTrigger < DIRECT_LINK_COOLDOWN_MS) {
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, String(now));
    window.open(DIRECT_LINK, '_blank', 'noopener');
  } catch {
    // Graceful fallback if storage is restricted
  }
}
