/**
 * Điểm vào dữ liệu CV — re-export cho app
 *
 * Nhập liệu tại:
 * • src/resume-basic.ts    — CV bắt buộc (tiếng Việt)
 * • src/resume-advanced.ts — Website nâng cao (SEO, gallery)
 *
 * Hướng dẫn: src/huongdan.md
 */

import { buildGalleryImages } from "@/lib/gallery";
import { normalizeCVData } from "@/lib/normalize-cv";
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

/** Dữ liệu CV đã chuẩn hóa — xóa dòng trống / mục rỗng vẫn chạy bình thường */
export const cvData = normalizeCVData(basic);

export const cvMeta = advanced.meta;

export const galleryImages = buildGalleryImages(advanced.gallery.files);

export const GALLERY_INTERVAL_MS = advanced.gallery.intervalMs;

export const GALLERY_PRINT_COLUMNS = advanced.gallery.printColumns;
