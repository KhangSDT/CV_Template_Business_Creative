"use client";

import { useCallback, useEffect, useState } from "react";
import { featureEnabled } from "@/config";
import { cvData, type CVData } from "@/resume";
import { uiLabels, type Locale } from "@/i18n/ui";
import CVScaleFit from "@/components/CVScaleFit";
import CVTemplate from "@/components/CVTemplate";
import GalleryPrintGrid from "@/components/GalleryPrintGrid";
import LazyGallery from "@/components/LazyGallery";
import { advanced } from "@/resume-advanced";
import PreviewToolbar from "@/components/PreviewToolbar";
import StudioBackground from "@/components/StudioBackground";

export default function CVPageClient() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [enData, setEnData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = uiLabels[locale];
  const displayData = locale === "vi" ? cvData : (enData ?? cvData);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const fetchTranslation = useCallback(async () => {
    if (enData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Translate failed");
      setEnData(json.data as CVData);
    } catch {
      setError(uiLabels.vi.page.translateError);
      setLocale("vi");
    } finally {
      setLoading(false);
    }
  }, [enData]);

  const handleToggle = () => {
    if (locale === "vi") {
      if (!enData && !loading) {
        setLocale("en");
        void fetchTranslation();
      } else {
        setLocale("en");
      }
    } else {
      setLocale("vi");
    }
  };

  return (
    <div className="preview-shell">
      {featureEnabled("studioBackground") && <StudioBackground />}

      <PreviewToolbar
        locale={locale}
        labels={labels}
        cvData={displayData}
        loading={loading}
        onToggleLocale={handleToggle}
        error={error}
      />

      <div className="preview-stage">
        <div className="cv-paper-wrap">
          <div className="cv-paper-glow" aria-hidden />
          <CVScaleFit>
            {loading && locale === "en" && !enData ? (
              <div className="cv-page cv-loading cv-reveal" aria-busy="true" aria-live="polite">
                <div className="cv-loading__ring" aria-hidden />
                <div className="cv-loading__spinner" />
                <p className="cv-loading__text">{labels.page.translating}</p>
              </div>
            ) : (
              <div className="cv-reveal" key={locale}>
                <CVTemplate data={displayData} labels={labels} locale={locale} />
              </div>
            )}
          </CVScaleFit>
        </div>

        {featureEnabled("gallery") && (
          <GalleryPrintGrid title={advanced.branding.galleryTitle} />
        )}
        <LazyGallery title={advanced.branding.galleryTitle} />
      </div>
    </div>
  );
}
