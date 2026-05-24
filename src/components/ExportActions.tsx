"use client";

import { useState } from "react";
import { cvData, type CVData } from "@/data/cv";
import { downloadBlob, exportCvToDocx } from "@/lib/export-docx";
import { exportToPDF } from "@/lib/export-pdf";
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
      await exportToPDF(el, `CV_${baseName}.pdf`);
    } finally {
      setLoading(null);
    }
  }

  async function handleDocx() {
    setLoading("docx");
    try {
      const blob = await exportCvToDocx(data);
      downloadBlob(blob, `CV_${baseName}.docx`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={printCV}
        className="preview-btn preview-btn--ghost"
      >
        {labels.print}
      </button>
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
      <button
        type="button"
        onClick={handleDocx}
        disabled={loading !== null}
        className="preview-btn preview-btn--ghost"
      >
        {loading === "docx" ? "…" : labels.docx}
      </button>
    </div>
  );
}
