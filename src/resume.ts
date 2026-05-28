/**
 * Điểm vào dữ liệu CV — re-export cho app
 *
 * Nhập liệu tại:
 * • src/resume-basic.ts   — CV tiếng Việt
 * • src/resume-advanced.ts — SEO, gallery
 *
 * Hướng dẫn: src/huongdan.md
 */

import { buildGalleryImages } from "@/lib/gallery";
import { advanced } from "@/resume-advanced";
import { basic } from "@/resume-basic";

export type {
  Activity,
  Certification,
  CVData,
  Education,
  LanguageSkill,
  Project,
  ResumeAdvanced,
  WorkExperience,
} from "@/resume-types";

export type { GalleryImage } from "@/lib/gallery";
export { buildGalleryImages, captionFromFileName } from "@/lib/gallery";

export { basic } from "@/resume-basic";
export { advanced } from "@/resume-advanced";

/** Dữ liệu CV ( = basic ) */
export const cvData = basic;

export const cvMeta = advanced.meta;

export const galleryImages = buildGalleryImages(advanced.gallery.files);

export const GALLERY_INTERVAL_MS = advanced.gallery.intervalMs;

export const GALLERY_PRINT_COLUMNS = advanced.gallery.printColumns;
