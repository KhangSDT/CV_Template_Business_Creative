/**
 * ═══════════════════════════════════════════════════════════════
 *  DỮ LIỆU NÂNG CAO — SEO, branding web, gallery
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 */

import type { ResumeAdvanced } from "@/resume-types";

export const advanced: ResumeAdvanced = {
  meta: {
    siteUrl: "https://cv-business-creative.example.com",
    siteTitle: "Võ Hoàng Hải Nghĩa — Content Creator & Graphic Designer",
    description:
      "CV Portfolio — Nhà sáng tạo nội dung & Thiết kế hình ảnh (Nghĩa Zakshin). Visual cho TikTok, Instagram, Facebook.",
    keywords: [
      "content creator",
      "graphic designer",
      "thiết kế hình ảnh",
      "social media visual",
      "ZakShinn",
    ],
    ogImage: "/avatar/avatar.jpg",
  },

  branding: {
    toolbarName: "Võ Hoàng Hải Nghĩa",
    toolbarSubtitle: "Nghĩa Zakshin · Content Creator · Graphic Designer",
    galleryTitle: "Hoạt động & việc đã làm",
  },

  gallery: {
    files: [
      "blood-moon-mountain-3840x2160-26295.jpg",
      "assassins-creed-3840x2160-26403.jpg",
      "sage-green-abstract-3840x2160-26355.jpg",
      "planet-earth-dark-3840x2160-26342.jpg",
      "iridescent-spheres-3840x2160-26346.jpg",
      "lord-of-mysteries-3840x2160-26428.jpg",
      "monkey-d-luffy-3840x2160-26035.jpg",
      "pragmata-characters-3840x2160-26390.jpg",
      "zhuang-fangyi-5k-3840x2160-26452.jpg",
      "silver-wolf-honkai-3840x2160-26449.jpg",
      "silver-wolf-level-3840x2160-26448.png",
    ],
    intervalMs: 4500,
    printColumns: 3,
  },
};
