"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Sparkles, Tv, ShieldCheck } from "lucide-react";
import { openAppDownloadModal } from "@/lib/appModal";

export default function DetailAppButton({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3.5 w-full sm:w-auto">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openAppDownloadModal(title)}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF385C] via-[#FF6036] to-[#FF8A00] text-white font-extrabold text-sm shadow-xl shadow-[#FF385C]/30 hover:shadow-[#FF385C]/50 transition-all border border-white/20"
        >
          <div className="w-5 h-5 rounded-md overflow-hidden shrink-0 border border-white/30 shadow-sm">
            <Image
              src="/versestream-logo.png"
              alt="VerseStream"
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>
          <span>Watch in VerseStream App</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-black/30 text-white">4K</span>
        </motion.button>
      </div>

      {/* Mini App Ad Card */}
      <div
        onClick={() => openAppDownloadModal(title)}
        className="cursor-pointer max-w-md p-3 rounded-2xl bg-gradient-to-r from-[#FF385C]/10 via-[#FF8A00]/10 to-transparent border border-[#FF385C]/20 hover:border-[#FF385C]/40 transition-colors flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-md">
            <Image
              src="/versestream-logo.png"
              alt="VerseStream"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white group-hover:text-[#FF8A00] transition-colors">
                Tired of buffering or ads?
              </span>
              <span className="text-[10px] text-[#FF385C] font-black uppercase">Free App</span>
            </div>
            <p className="text-[11px] text-white/50">
              Stream {title} in 4K Ultra HD on phone, Android TV &amp; FireStick
            </p>
          </div>
        </div>
        <div className="shrink-0 w-7 h-7 rounded-full bg-[#FF385C]/20 text-[#FF8A00] flex items-center justify-center group-hover:bg-[#FF385C] group-hover:text-white transition-all">
          <Download size={13} />
        </div>
      </div>
    </div>
  );
}

