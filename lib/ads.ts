"use client";

export const SMARTLINK = 'https://interventioncopiedloitering.com/g03g5niay?key=52ba61e02cb2350e4750869bcde8f6bb';

// Smart Frequency Capping:
// Advertisers bid highest CPM on the first conversion of an active user.
// Rapid repeated popups decrease CPM and increase bounce rate.
// 5-minute cooldown ensures high CPM, sustainable revenue, and zero user irritation.
const SMARTLINK_COOLDOWN_MS = 5 * 60 * 1000;
const STORAGE_KEY = 'wf_smartlink_last_trigger';

export function openSmartlink() {
  if (typeof window === 'undefined') return;

  try {
    const now = Date.now();
    const lastTrigger = Number(sessionStorage.getItem(STORAGE_KEY) || '0');

    // Skip if within cooldown window to protect user experience and retain high CPM
    if (now - lastTrigger < SMARTLINK_COOLDOWN_MS) {
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, String(now));
    window.open(SMARTLINK, '_blank', 'noopener');
  } catch {
    // Graceful fallback if storage is restricted
  }
}
