"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { openAppDownloadModal } from "@/lib/appModal";

export default function FloatingAppButton() {
  return (
    <motion.button
      onClick={() => openAppDownloadModal()}
      aria-label="Download VerseStream Android App"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-2.5 rounded-full bg-[#12121e]/90 hover:bg-[#1a1a2b] border border-white/20 text-white shadow-xl shadow-[#FF385C]/25 hover:shadow-[#FF385C]/40 backdrop-blur-md transition-all duration-300 group"
    >
      {/* Outer Glow Pulse */}
      <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF385C] to-[#FF8A00] opacity-40 blur-sm group-hover:opacity-75 transition-opacity duration-300 -z-10 animate-pulse" />

      {/* App Logo */}
      <div className="relative w-6 h-6 md:w-7 md:h-7 rounded-lg overflow-hidden border border-white/20 shrink-0">
        <Image
          src="/versestream-logo.png"
          alt="VerseStream App"
          width={28}
          height={28}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Label */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-extrabold text-[11px] md:text-xs tracking-wide uppercase text-white">
            Get App
          </span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-gradient-to-r from-[#FF385C] to-[#FF8A00] text-white">
            4K
          </span>
        </div>
        <span className="hidden sm:inline-block text-[9px] text-white/50 leading-none">
          Ad-Free Android &amp; TV
        </span>
      </div>

      <Download size={14} className="text-[#FF8A00] ml-0.5 group-hover:translate-y-0.5 transition-transform" />
    </motion.button>
  );
}

