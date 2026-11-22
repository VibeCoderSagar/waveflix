"use client";

import SafeImage from "@/components/SafeImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { ContentItem, img } from "@/lib/tmdb";
import { openSmartlink } from "@/lib/ads";
import { triggerAllMonetagAds } from "@/lib/monetag";
import { detailsUrl } from "@/lib/utils";
import { openAppDownloadModal } from "@/lib/appModal";

export default function ContentCard({
  item,
  index = 0,
  size = "md",
  fluid = false,
}: {
  item: ContentItem;
  index?: number;
  size?: "sm" | "md" | "lg";
  fluid?: boolean;
}) {
  const router = useRouter();

  const widths: Record<string, string> = {
    sm: "w-[104px] md:w-[128px]",
    md: "w-[122px] md:w-[152px]",
    lg: "w-[140px] md:w-[176px]",
  };

  const handleClick = () => {
    openSmartlink();
    triggerAllMonetagAds();
    router.push(detailsUrl(item.mediaType, item.id, item.title));
  };

  /* Staggered CSS fade-in — zero JS, zero rAF, browser handles natively */
  const delay = Math.min(index * 0.03, 0.25);

  return (
    <div
      className={fluid ? "w-full" : `shrink-0 ${widths[size]}`}
      style={{
        animation: `fadeSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
        /* Each card is a self-contained paint boundary */
        contain: "layout" as React.CSSProperties["contain"],
      }}
    >
      <div onClick={handleClick} className="block group cursor-pointer">
        <div className="card-glow card-hover rounded-[18px] overflow-hidden bg-base-700 relative">
          <div className="relative aspect-[2/3] overflow-hidden rounded-[16px]">
            <SafeImage
              src={img.poster(item.posterPath, "w500")}
              fallbackSrc="/placeholder-poster.svg"
              alt={item.title}
              fill
              sizes={
                fluid
                  ? "(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 16vw"
                  : "(max-width: 768px) 150px, 190px"
              }
              /* scale(1.05) instead of 1.10 — smaller composited layer, less VRAM */
              className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />

            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-[11px] font-bold text-neon-yellow border border-white/10">
              <Star size={11} fill="currentColor" strokeWidth={0} />
              {item.rating ? item.rating.toFixed(1) : "N/A"}
            </div>

            <span className="absolute top-2 left-2 text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 border border-white/10">
              {item.mediaType === "tv" ? "Series" : "Movie"}
            </span>

            {/* Quick App Stream Trigger on Hover */}
            <div className="absolute inset-x-2 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openAppDownloadModal(item.title);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-gradient-to-r from-[#FF385C] to-[#FF8A00] text-white text-[11px] font-black tracking-wide shadow-lg shadow-black/60 hover:scale-[1.03] active:scale-[0.97] transition-all"
              >
                <div className="w-3.5 h-3.5 rounded overflow-hidden shrink-0">
                  <Image
                    src="/versestream-logo.png"
                    alt="App"
                    width={14}
                    height={14}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Watch in 4K App</span>
              </button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[13px] md:text-sm font-semibold text-white/90 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-pink group-hover:to-neon-blue transition-all duration-200">
          {item.title}
        </p>
        <p className="text-[11px] text-white/40">
          {item.releaseDate ? item.releaseDate.slice(0, 4) : "TBA"}
        </p>
      </div>
    </div>
  );
}
