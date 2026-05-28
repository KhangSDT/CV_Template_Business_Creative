import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import {
  injectExportSnapshotStyles,
  sanitizeImagesInClone,
  shouldIgnoreForCapture,
} from "@/lib/export-capture-sanitize";
import { prepareCVPrintMedia } from "@/lib/print-prepare";

const A4_WIDTH = 210;
const A4_HEIGHT = 297;
/** ~300 DPI cho khổ A4 (210mm) */
const TARGET_CAPTURE_WIDTH_PX = Math.round((210 / 25.4) * 300);
const MAX_CAPTURE_SCALE = 4;

function resolveCaptureScale(element: HTMLElement, minScale: number): number {
  const width = Math.max(
    element.offsetWidth,
    element.scrollWidth,
    element.getBoundingClientRect().width,
    1,
  );
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const dpiScale = Math.ceil((TARGET_CAPTURE_WIDTH_PX / width) * dpr);
  return Math.min(MAX_CAPTURE_SCALE, Math.max(minScale, dpiScale));
}

export async function exportToPDF(
  element: HTMLElement,
  filename = "cv.pdf",
  scale = 3,
): Promise<void> {
  await prepareCVPrintMedia();

  const fitInner = element.closest(".preview-cv-fit__inner") as HTMLElement | null;
  const fitOuter = element.closest(".preview-cv-fit") as HTMLElement | null;
  const savedTransform = fitInner?.style.transform ?? "";
  const savedOrigin = fitInner?.style.transformOrigin ?? "";
  const savedFitHeight = fitOuter?.style.height ?? "";

  document.body.classList.add("cv-capturing");

  if (fitInner) {
    fitInner.style.transform = "none";
    fitInner.style.transformOrigin = "top center";
  }
  if (fitOuter) {
    fitOuter.style.height = "auto";
  }

  const savedWidth = element.style.width;
  if (element.offsetWidth < 100) {
    element.style.width = "210mm";
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  const captureScale = resolveCaptureScale(element, scale);

  try {
    const canvas = await html2canvas(element, {
      scale: captureScale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#fdfcfa",
      imageTimeout: 15000,
      ignoreElements: shouldIgnoreForCapture,
      onclone: (clonedDoc) => {
        const clonedFit = clonedDoc.querySelector(".preview-cv-fit__inner") as HTMLElement | null;
        if (clonedFit) {
          clonedFit.style.transform = "none";
        }
        injectExportSnapshotStyles(clonedDoc);
        sanitizeImagesInClone(clonedDoc);
      },
    });

    if (canvas.width < 1 || canvas.height < 1) {
      throw new Error("Không chụp được CV — kích thước canvas bằng 0. Thử tải lại trang.");
    }

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const imgWidth = A4_WIDTH;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = A4_HEIGHT;

    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    pdf.save(filename);
  } finally {
    document.body.classList.remove("cv-capturing");
    element.style.width = savedWidth;
    if (fitInner) {
      fitInner.style.transform = savedTransform;
      fitInner.style.transformOrigin = savedOrigin;
    }
    if (fitOuter) {
      fitOuter.style.height = savedFitHeight;
    }
  }
}
