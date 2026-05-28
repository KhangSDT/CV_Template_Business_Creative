"use client";

import { useState } from "react";
import { config, featureEnabled } from "@/config";
import { cvData, type CVData } from "@/resume";
import { printCV } from "@/lib/print";
import { ATS_PDF_HINT } from "@/lib/seo";

type Props = {
  data?: CVData;
  labels: {
    print: string;
    pdf: string;
    docx: string;
  };
};

export default function ExportActions({ data = cvData, labels }: Props) {
  const [loading, setLoading] = useState<"pdf" | "docx" | null>(null);
  const baseName = data.header.fullName.replace(/[\[\]\s]+/g, "_").replace(/_+/g, "_");

  async function handlePdf() {
    const el = document.getElementById("cv-document");
    if (!el) return;
    setLoading("pdf");
    try {
      const { exportToPDF } = await import("@/lib/export-pdf");
      await exportToPDF(el, `CV_${baseName}.pdf`, config.performance.pdfCaptureScale);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Xuất PDF thất bại";
      window.alert(msg);
    } finally {
      setLoading(null);
    }
  }

  async function handleDocx() {
    setLoading("docx");
    try {
      const { exportCvToDocx, downloadBlob } = await import("@/lib/export-docx");
      const blob = await exportCvToDocx(data);
      downloadBlob(blob, `CV_${baseName}.docx`);
    } finally {
      setLoading(null);
    }
  }

  const showPrint = featureEnabled("exportPrint");
  const showPdf = featureEnabled("exportPdf");
  const showDocx = featureEnabled("exportDocx");

  if (!showPrint && !showPdf && !showDocx) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showPrint && (
        <button
          type="button"
          onClick={() => void printCV()}
          className="preview-btn preview-btn--ghost"
        >
          {labels.print}
        </button>
      )}
      {showPdf && (
        <button
          type="button"
          onClick={handlePdf}
          disabled={loading !== null}
          className="preview-btn preview-btn--primary"
          title={ATS_PDF_HINT}
          aria-label={labels.pdf}
        >
          {loading === "pdf" ? "…" : labels.pdf}
        </button>
      )}
      {showDocx && (
        <button
          type="button"
          onClick={handleDocx}
          disabled={loading !== null}
          className="preview-btn preview-btn--ghost"
        >
          {loading === "docx" ? "…" : labels.docx}
        </button>
      )}
    </div>
  );
}
