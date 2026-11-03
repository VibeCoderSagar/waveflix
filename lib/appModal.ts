export const VERSESTREAM_SITE = "https://versestreamapp.com";
export const VERSESTREAM_DOWNLOAD_PAGE = "https://versestreamapp.com/#download-app";
// Keep for backwards compatibility but point to the website
export const VERSESTREAM_APK = "https://versestreamapp.com/#download-app";

export function openAppDownloadModal(title?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-versestream-modal", { detail: { title } })
    );
  }
}

