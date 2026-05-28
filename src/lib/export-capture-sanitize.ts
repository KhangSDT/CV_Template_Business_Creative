/** CSS inject vào bản clone — tránh lỗi createPattern / canvas 0×0 của html2canvas */
export const EXPORT_SNAPSHOT_STYLE = `
#cv-document.cv-export-snapshot,
#cv-document.cv-export-snapshot * {
  animation: none !important;
  transition: none !important;
}
#cv-document.cv-export-snapshot .cv-header-accent {
  background-size: 100% 100% !important;
}
#cv-document.cv-export-snapshot .cv-sidebar::before,
#cv-document.cv-export-snapshot .cv-header-glow {
  display: none !important;
  content: none !important;
}
#cv-document.cv-export-snapshot .bg-gradient-to-r,
#cv-document.cv-export-snapshot [class*="bg-gradient"] {
  background-image: none !important;
  background-color: rgba(196, 92, 62, 0.2) !important;
}
#cv-document.cv-export-snapshot img {
  opacity: 1 !important;
}
`;

export function injectExportSnapshotStyles(clonedDoc: Document): void {
  const root = clonedDoc.getElementById("cv-document");
  if (!root) return;

  root.classList.add("cv-export-snapshot");

  const style = clonedDoc.createElement("style");
  style.textContent = EXPORT_SNAPSHOT_STYLE;
  clonedDoc.head.appendChild(style);
}

export function sanitizeImagesInClone(clonedDoc: Document): void {
  clonedDoc.querySelectorAll("img").forEach((node) => {
    const img = node as HTMLImageElement;
    img.removeAttribute("loading");

    const rect = img.getBoundingClientRect();
    const w = img.naturalWidth || rect.width;
    const h = img.naturalHeight || rect.height;

    if (w < 1 || h < 1 || rect.width < 1 || rect.height < 1) {
      img.remove();
      return;
    }

    const wrapper = img.parentElement;
    if (wrapper && wrapper !== img.closest(".cv-avatar__frame")) {
      if (wrapper.tagName === "SPAN" || wrapper.classList.contains("relative")) {
        wrapper.style.overflow = "visible";
        wrapper.style.position = "static";
        wrapper.style.width = "auto";
        wrapper.style.height = "auto";
      }
    }

    if (!img.getAttribute("width")) {
      img.setAttribute("width", String(Math.round(w)));
      img.setAttribute("height", String(Math.round(h)));
    }
  });
}

export function shouldIgnoreForCapture(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;

  if (element.tagName === "IMG") {
    const img = element as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return true;
    if (img.naturalWidth < 1 && img.naturalHeight < 1 && !img.complete) return true;
  }

  if (element.getAttribute("aria-hidden") === "true") {
    const rect = element.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return true;
  }

  return false;
}
