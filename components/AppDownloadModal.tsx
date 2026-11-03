"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, Zap, ShieldCheck, Tv, Film, Sparkles } from "lucide-react";
import { VERSESTREAM_SITE, VERSESTREAM_APK } from "@/lib/appModal";

export default function AppDownloadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("versestream_modal_dismissed", Date.now().toString());
      } catch (e) {}
    }
  }, []);

  const openModal = useCallback((title?: string) => {
    setCustomTitle(title || null);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    // Listen for custom trigger events across all components
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ title?: string }>;
      openModal(customEvent.detail?.title);
    };

    window.addEventListener("open-versestream-modal", handleOpen);

    // Auto trigger once after 12 seconds if not dismissed in the last 24h
    let timer: NodeJS.Timeout | null = null;
    try {
      const dismissed = localStorage.getItem("versestream_modal_dismissed");
      const oneDay = 24 * 60 * 60 * 1000;
      if (!dismissed || Date.now() - parseInt(dismissed, 10) > oneDay) {
        timer = setTimeout(() => {
          openModal();
        }, 12000);
      }
    } catch (e) {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-versestream-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
      if (timer) clearTimeout(timer);
    };
  }, [openModal, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#0e0e17] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-brand-orange/20 overflow-hidden my-auto"
          >
            {/* Ambient background glow inside modal */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-[#FF385C]/30 to-[#FF8A00]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-[#8b5cf6]/25 to-[#22e2d6]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-20"
            >
              <X size={18} />
            </button>

            {/* Header Content */}
            <div className="flex flex-col items-center text-center relative z-10">
              {/* App Icon with animated pulse glow */}
              <div className="relative mb-4 group">
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#FF385C] to-[#FF8A00] opacity-75 blur-md group-hover:opacity-100 transition duration-300 animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#141420] flex items-center justify-center">
                  <Image
                    src="/versestream-logo.png"
                    alt="VerseStream App Logo"
                    width={80}
                    height={80}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FF385C] text-white border border-white/20 shadow-md">
                  v1.0
                </span>
              </div>

              {/* Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF385C]/15 to-[#FF8A00]/15 border border-[#FF385C]/30 text-[#FF8A00] text-xs font-bold tracking-wide uppercase mb-2">
                <Sparkles size={13} className="text-[#FF8A00]" />
                Official Android &amp; TV App
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-2">
                {customTitle ? `Watch in 4K on VerseStream` : "Download VerseStream App"}
              </h3>

              {customTitle && (
                <p className="text-xs sm:text-sm font-semibold text-[#FF8A00] mb-2 line-clamp-1">
                  Enjoy {customTitle} in Ultra HD buffer-free
                </p>
              )}

              <p className="text-white/70 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                Experience seamless 4K playback, zero intrusive ads, multi-source stream engine, and Dolby audio on your phone &amp; TV.
              </p>

              {/* Features Badges Grid */}
              <div className="grid grid-cols-2 gap-2.5 w-full text-left mb-6">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FF385C]/20 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} className="text-[#FF385C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">100% Ad-Free</p>
                    <p className="text-[10px] text-white/50">No annoying popups</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/20 flex items-center justify-center shrink-0">
                    <Film size={16} className="text-[#FF8A00]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">4K Ultra HD</p>
                    <p className="text-[10px] text-white/50">Multi-source cinema</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#22e2d6]/20 flex items-center justify-center shrink-0">
                    <Zap size={16} className="text-[#22e2d6]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Zero Buffering</p>
                    <p className="text-[10px] text-white/50">High-speed engine</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                    <Tv size={16} className="text-[#8b5cf6]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Android &amp; TV</p>
                    <p className="text-[10px] text-white/50">Phone, TV &amp; FireStick</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 w-full">
                {/* Primary Download App Button — Visits versestreamapp.com */}
                <a
                  href={VERSESTREAM_SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF385C] to-[#FF8A00] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#FF385C]/30 hover:shadow-[#FF385C]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download App on VerseStream</span>
                </a>

                {/* Secondary Website Link */}
                <a
                  href={VERSESTREAM_SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-semibold text-xs sm:text-sm transition-colors"
                >
                  <span>Visit versestreamapp.com</span>
                  <ExternalLink size={14} />
                </a>

                {/* Dismiss Link */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white/40 hover:text-white/70 text-xs py-1 transition-colors mt-1"
                >
                  Continue watching in browser
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

