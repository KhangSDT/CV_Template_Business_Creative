/**
 * ═══════════════════════════════════════════════════════════════
 *  RESUME ADVANCED — Thông tin NÂNG CAO (website, không in lên CV A4)
 *  • SEO (meta, keywords, ogImage), nhãn toolbar, danh sách gallery
 *  • Không chứa nội dung CV chính — sửa CV tại resume-basic.ts
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 */

import type { ResumeAdvanced } from "@/resume-types";

export const advanced: ResumeAdvanced = {
  meta: {
    siteUrl: "https://cv-business-creative.example.com",
    siteTitle: "NGUYẾN CHÍ KHANG — Content Creator & Graphic Designer",
    description:
      "CV Portfolio — Nhà sáng tạo nội dung & Thiết kế hình ảnh ( KhangSDT ). Visual cho TikTok, Instagram, Facebook.",
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
    toolbarName: "NGUYẾN CHÍ KHANG",
    toolbarSubtitle: "KhangSDT · Content Creator · Graphic Designer",
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
