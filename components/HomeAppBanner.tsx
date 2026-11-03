"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Sparkles, Tv, ShieldCheck, Zap } from "lucide-react";
import { openAppDownloadModal } from "@/lib/appModal";

export default function HomeAppBanner() {
  return (
    <section className="px-4 md:px-8 my-8 md:my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#170e1a] via-[#151124] to-[#0e1624] border border-white/10 p-6 md:p-10 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF385C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#FF8A00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left: App Logo & Badges */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF385C] to-[#FF8A00] opacity-70 blur-md group-hover:opacity-100 transition duration-300 animate-pulse" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#141420] flex items-center justify-center">
                <Image
                  src="/versestream-logo.png"
                  alt="VerseStream Official App"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF385C]/15 border border-[#FF385C]/30 text-[#FF8A00] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={13} /> Official Media Engine
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
                Download VerseStream for Android &amp; TV
              </h3>
              <p className="text-white/60 text-xs md:text-sm mt-1.5 max-w-xl">
                Tired of web ads and buffering? Switch to the open-source VerseStream app for seamless 4K cinema streaming, Dolby audio, and multi-source engines.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-4 text-xs font-semibold text-white/80">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <ShieldCheck size={14} className="text-[#FF385C]" /> 100% Ad-Free
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <Zap size={14} className="text-[#FF8A00]" /> 4K Ultra HD
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <Tv size={14} className="text-[#22e2d6]" /> Android TV &amp; FireStick
                </span>
              </div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openAppDownloadModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF385C] via-[#FF6036] to-[#FF8A00] text-white font-extrabold text-sm md:text-base shadow-xl shadow-[#FF385C]/35 hover:shadow-[#FF385C]/50 transition-all duration-300"
            >
              <Download size={20} />
              <span>Get VerseStream App</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

