export const VERSESTREAM_SITE = "https://versestreamapp.com";
export const VERSESTREAM_APK = "https://versestreamapp.com/downloads/universal/VerseStream.apk";

export function openAppDownloadModal(title?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-versestream-modal", { detail: { title } })
    );
  }
}

