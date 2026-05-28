export const CV_PREPARE_PRINT_EVENT = "cv-prepare-print";
export const CV_PRINT_READY_EVENT = "cv-print-ready";

const DEFAULT_TIMEOUT_MS = 5000;

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

function collectPrintImageUrls(): string[] {
  const urls = new Set<string>();
  document
    .querySelectorAll<HTMLImageElement>("img[data-cv-print-img], .gallery-print__img, .cv-avatar__img")
    .forEach((img) => {
      if (img.currentSrc) urls.add(img.currentSrc);
      else if (img.src) urls.add(img.src);
    });
  return [...urls];
}

async function waitForPrintReady(timeoutMs: number): Promise<void> {
  await Promise.race([
    new Promise<void>((resolve) => {
      const done = () => {
        window.removeEventListener(CV_PRINT_READY_EVENT, done);
        resolve();
      };
      window.addEventListener(CV_PRINT_READY_EVENT, done, { once: true });
    }),
    new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs)),
  ]);
}

/** Tải font + ảnh trước khi in hoặc xuất PDF */
export async function prepareCVPrintMedia(timeoutMs = DEFAULT_TIMEOUT_MS): Promise<void> {
  window.dispatchEvent(new CustomEvent(CV_PREPARE_PRINT_EVENT));

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await waitForPrintReady(timeoutMs);

  const urls = collectPrintImageUrls();
  await Promise.all(urls.map(preloadImage));

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}
