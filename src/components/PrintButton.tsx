"use client";

import { printCV } from "@/lib/print";

type Props = {
  label?: string;
};

export default function PrintButton({ label = "Xuất PDF" }: Props) {
  return (
    <button type="button" onClick={() => void printCV()} className="preview-btn preview-btn--primary">
      <svg
        className="preview-btn__icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      {label}
    </button>
  );
}
