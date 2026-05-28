"use client";

import { useEffect } from "react";
import { GALLERY_PRINT_COLUMNS, galleryImages } from "@/resume";
import { CV_PRINT_READY_EVENT } from "@/lib/print-prepare";

type Props = {
  title?: string;
};

/**
 * Lưới ảnh chỉ dùng khi in — luôn mount (không lazy) để trình duyệt tải ảnh trước khi in.
 */
export default function GalleryPrintGrid({ title }: Props) {
  useEffect(() => {
    if (galleryImages.length === 0) {
      window.dispatchEvent(new CustomEvent(CV_PRINT_READY_EVENT));
      return;
    }

    let cancelled = false;

    void Promise.all(
      galleryImages.map(
        (img) =>
          new Promise<void>((resolve) => {
            const el = new Image();
            el.onload = () => resolve();
            el.onerror = () => resolve();
            el.src = img.src;
          }),
      ),
    ).then(() => {
      if (!cancelled) {
        window.dispatchEvent(new CustomEvent(CV_PRINT_READY_EVENT));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (galleryImages.length === 0) return null;

  return (
    <section
      className="gallery-section only-print"
      aria-label={title || "Portfolio gallery print"}
    >
      <div className="gallery-print">
        {title && <p className="gallery-print__title">{title}</p>}
        <div
          className="gallery-print__grid"
          style={{
            gridTemplateColumns: `repeat(${GALLERY_PRINT_COLUMNS}, 1fr)`,
          }}
        >
          {galleryImages.map((img) => (
            <figure key={img.src} className="gallery-print__item">
              <div className="gallery-print__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery-print__img"
                  data-cv-print-img=""
                  loading="eager"
                  decoding="sync"
                />
              </div>
              <figcaption className="gallery-print__caption">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
