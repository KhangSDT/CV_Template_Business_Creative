"use client";

import { useEffect, useRef, useState } from "react";

import { config } from "@/config";

const PREVIEW_SCALE = config.preview.scale;

/**
 * Phóng to CV ×2 khi xem trước (giống Ctrl+ zoom 200%).
 * In PDF vẫn khổ A4 gốc — transform tắt khi @media print.
 */
export default function CVScaleFit({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(PREVIEW_SCALE);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let frame = 0;

    const update = () => {
      const availableW = outer.clientWidth;
      const naturalW = inner.offsetWidth;
      const naturalH = inner.offsetHeight;
      if (!naturalW) return;

      const fitWidth = availableW / naturalW;
      const next = fitWidth < PREVIEW_SCALE ? fitWidth : PREVIEW_SCALE;

      setScale(next);
      setScaledHeight(naturalH * next);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    scheduleUpdate();
    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(outer);
    ro.observe(inner);
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [children]);

  return (
    <div
      ref={outerRef}
      className="preview-cv-fit"
      style={{ height: scaledHeight ? `${scaledHeight}px` : undefined }}
    >
      <div
        ref={innerRef}
        className="preview-cv-fit__inner"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
