import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDetails, getTrending, getPopular, img, MediaType } from "@/lib/tmdb";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import WatchClient from "@/components/WatchClient";
import ContentRow from "@/components/ContentRow";

export const revalidate = 3600;
export const dynamicParams = true;

// Pre-render watch pages for today's trending + popular titles at build
// time — this is the page behind the "Play" tap, so pre-building it is
// what makes that tap open near-instantly for the content people watch most.
export async function generateStaticParams() {
  try {
    const [trending, popularMovies, popularTV] = await Promise.all([
      getTrending("all", "day"),
      getPopular("movie"),
      getPopular("tv"),
    ]);
    const seen = new Set<string>();
    const items = [...trending, ...popularMovies, ...popularTV];
    return items.reduce<{ type: string; id: string }[]>((acc, item) => {
      const key = `${item.mediaType}-${item.id}`;
      if (seen.has(key)) return acc;
      seen.add(key);
      acc.push({ type: item.mediaType, id: String(item.id) });
      return acc;
    }, []);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { type: string; id: string };
}): Promise<Metadata> {
  const mediaType = params.type as MediaType;
  if (mediaType !== "movie" && mediaType !== "tv") return {};

  try {
    const data = await getDetails(mediaType, params.id);
    if (!data || data.success === false) return {};
    const title = data.title || data.name;
    const year = (data.release_date || data.first_air_date || "").slice(0, 4);
    const formattedYear = year ? ` (${year})` : "";
    const actionText = mediaType === "movie" ? "Full Movie Online Free HD" : "Full Series Online Free HD";
    const pageTitle = `Watch ${title}${formattedYear} ${actionText}`;
    const description = `Stream and watch ${title}${formattedYear} online free in HD on ${SITE_NAME}. No signup required.`;
    const url = `${SITE_URL}/watch/${mediaType}/${params.id}`;
    const backdrop = img.backdrop(data.backdrop_path, "w1280");

    return {
      title: pageTitle,
      description,
      keywords: [
        `watch ${title} free`,
        `watch ${title} online free`,
        `stream ${title}${formattedYear} hd`,
        `${title} watch free online`,
      ],
      alternates: { canonical: url },
      openGraph: {
        type: mediaType === "movie" ? "video.movie" : "video.tv_show",
        url,
        title: pageTitle,
        description,
        images: [{ url: backdrop, width: 1280, height: 720, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description,
        images: [backdrop],
      },
    };
  } catch {
    return {};
  }
}

export default async function WatchPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const mediaType = params.type as MediaType;
  if (mediaType !== "movie" && mediaType !== "tv") notFound();

  let data: any;
  try {
    data = await getDetails(mediaType, params.id);
  } catch {
    notFound();
  }
  if (!data || data.success === false) notFound();

  const title = data.title || data.name;
  const recommendations = (data.recommendations?.results || []).map((r: any) => ({
    id: r.id,
    mediaType: (r.media_type || mediaType) as MediaType,
    title: r.title || r.name,
    overview: r.overview,
    posterPath: r.poster_path,
    backdropPath: r.backdrop_path,
    rating: r.vote_average || 0,
    releaseDate: r.release_date || r.first_air_date || "",
    genreIds: r.genre_ids || [],
    popularity: r.popularity || 0,
  }));

  return (
    <div>
      {/* Next.js hoists these into <head> — warming up the connection to the
         embed servers before the iframe even mounts is what removes most of
         the "tap play, wait for the video to appear" delay. */}
      <link rel="preconnect" href="https://nxsha.space" />
      <link rel="preconnect" href="https://screenscape.me" />
      <link rel="preconnect" href="https://peachify.pro" />
      <WatchClient
        mediaType={mediaType}
        tmdbId={data.id}
        title={title}
        posterPath={data.poster_path}
        seasons={data.seasons}
      />
      {recommendations.length > 0 && (
        <ContentRow title="More Like This" items={recommendations} accent="#ff8a3d" />
      )}

    </div>
  );
}
