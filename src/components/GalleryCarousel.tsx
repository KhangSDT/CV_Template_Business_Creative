"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { config } from "@/config";
import { useInView } from "@/lib/use-in-view";
import {
  GALLERY_INTERVAL_MS,
  galleryImages,
  type GalleryImage,
} from "@/resume";

type Props = {
  images?: GalleryImage[];
  intervalMs?: number;
  title?: string;
  /** Tắt autoplay khi gallery chưa trong viewport */
  autoplay?: boolean;
};

export default function GalleryCarousel({
  images = galleryImages,
  intervalMs = GALLERY_INTERVAL_MS,
  title,
  autoplay = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const { ref: frameRef, inView: frameInView } = useInView<HTMLDivElement>("0px 0px", false);
  const count = images.length;
  const quality = config.performance.galleryImageQuality;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!autoplay || !frameInView || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, frameInView, count, intervalMs]);

  if (count === 0) return null;

  const current = images[index];

  return (
    <section
      className="gallery-section gallery-reveal no-print"
      aria-label={title || "Portfolio gallery"}
    >
      <div className="gallery-screen no-print">
        {title && <p className="gallery-section__title">{title}</p>}

        <div ref={frameRef} className="gallery-carousel__frame">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`gallery-carousel__slide ${i === index ? "is-active" : ""}`}
              aria-hidden={i !== index}
            >
              {i === index && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="gallery-carousel__img"
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  quality={quality}
                  priority={index === 0}
                />
              )}
            </div>
          ))}

          {count > 1 && (
            <>
              <button
                type="button"
                className="gallery-carousel__nav gallery-carousel__nav--prev"
                onClick={prev}
                aria-label="Ảnh trước"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-carousel__nav gallery-carousel__nav--next"
                onClick={next}
                aria-label="Ảnh sau"
              >
                ›
              </button>
            </>
          )}

          <p className="gallery-carousel__caption">{current.caption}</p>
        </div>

        {count > 1 && (
          <div className="gallery-carousel__dots" role="tablist" aria-label="Chọn ảnh">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ảnh ${i + 1}: ${img.alt}`}
                className={`gallery-carousel__dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
