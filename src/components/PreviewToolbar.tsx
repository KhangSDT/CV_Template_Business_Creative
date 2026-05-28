"use client";

import { featureEnabled } from "@/config";
import { advanced } from "@/resume-advanced";
import type { CVData } from "@/resume";
import type { Locale, UILabels } from "@/i18n/ui";
import ExportActions from "@/components/ExportActions";
import LanguageToggle from "@/components/LanguageToggle";

type Props = {
  locale: Locale;
  labels: UILabels;
  cvData: CVData;
  loading: boolean;
  onToggleLocale: () => void;
  error: string | null;
};

export default function PreviewToolbar({
  locale,
  labels,
  cvData,
  loading,
  onToggleLocale,
  error,
}: Props) {
  const p = labels.page;

  return (
    <header className="preview-toolbar no-print">
      <div className="preview-toolbar__inner">
        <div className="preview-toolbar__brand">
          <span className="preview-toolbar__mark preview-toolbar__mark--live" aria-hidden />
          <div>
            <p className="preview-toolbar__name">{advanced.branding.toolbarName || p.brand}</p>
            <p className="preview-toolbar__meta">
              <span className="preview-toolbar__live" aria-hidden />
              {p.previewLabel}
              <span className="preview-toolbar__dot" aria-hidden />
              A4
            </p>
          </div>
        </div>

        <p className="preview-toolbar__subtitle hidden sm:block">
          {advanced.branding.toolbarSubtitle || p.subtitle}
        </p>

        <div className="preview-toolbar__actions">
          {featureEnabled("englishTranslation") && (
            <LanguageToggle locale={locale} loading={loading} onToggle={onToggleLocale} />
          )}
          <ExportActions
            data={cvData}
            labels={{ print: p.print, pdf: p.pdf, docx: p.docx }}
          />
        </div>
      </div>

      {error && (
        <p className="preview-toolbar__error" role="alert">
          {error}
        </p>
      )}
    </header>
  );
}
