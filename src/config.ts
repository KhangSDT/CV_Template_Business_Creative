/**
 * Cấu hình hiển thị & bật/tắt tính năng website
 * Hướng dẫn: src/huongdan.md
 */

export type DisplayMode = "basic" | "advanced";

export const config = {
  /**
   * basic — chỉ CV + in/PDF cốt lõi (ẩn gallery, dịch EN, DOCX, nền studio…)
   * advanced — đầy đủ theo `features` bên dưới
   */
  displayMode: "advanced" as DisplayMode,

  /**
   * Bật/tắt từng phần CV & website.
   * Ẩn mục nào → STT các mục còn lại tự đánh số lại (01, 02, 03…).
   */
  features: {
    /** Ảnh đại diện ở sidebar trái */
    avatar: true,
    /** Các chip highlight dưới tagline (header) */
    headerHighlights: true,
    /** Dòng Instagram trong khối liên hệ (nếu có URL trong resume-basic) */
    instagram: true,
    /** Mục chứng chỉ & khóa học (sidebar) — cần có dữ liệu trong resume-basic */
    certifications: true,
    /** Mục 01 — Định hướng & mục tiêu nghề nghiệp */
    careerObjective: true,
    /** Mục 02 — Học vấn */
    education: true,
    /** Mục 03 — Kinh nghiệm làm việc — cần có `experience[]` */
    experience: true,
    /** Mục 04 — Hoạt động & cộng đồng — cần có `activities[]` */
    activities: true,
    /** Mục 05 — Dự án & case study — cần có `projects[]` */
    projects: true,
    /** Sidebar: Năng lực sáng tạo (4 nhóm kỹ năng) */
    creativeSkills: true,
    /** Sidebar: Ngôn ngữ */
    languages: true,
    /** Carousel ảnh hoạt động cuối trang (resume-advanced) */
    gallery: true,
    /** Nút chuyển tiếng Anh trên toolbar */
    englishTranslation: true,
    /** Nền gradient động khi xem trên web */
    studioBackground: true,
    /** Nút In CV */
    exportPrint: true,
    /** Nút Tải PDF */
    exportPdf: true,
    /** Nút Tải DOCX */
    exportDocx: true,
    /** Schema.org JSON-LD (tắt khi chặn Google) */
    jsonLd: false,
  },

  seo: {
    /** true = chặn Google & công cụ tìm kiếm (noindex + robots.txt) */
    blockSearchEngines: true,
  },

  preview: {
    /** Tỷ lệ zoom xem trước CV (2 = 200%) */
    scale: 2,
  },

  performance: {
    galleryImageQuality: 75,
    lazyLoadGallery: true,
    lazyLoadExportLibs: true,
    /** Scale html2canvas — tối thiểu; export tự tăng lên ~300 DPI */
    pdfCaptureScale: 3,
  },
} as const;

const ADVANCED_ONLY_FEATURES = [
  "gallery",
  "englishTranslation",
  "studioBackground",
  "exportDocx",
  "jsonLd",
] as const satisfies ReadonlyArray<keyof typeof config.features>;

export function featureEnabled(key: keyof typeof config.features): boolean {
  if (!config.features[key]) return false;
  if (config.displayMode === "basic") {
    return !(ADVANCED_ONLY_FEATURES as readonly string[]).includes(key);
  }
  return true;
}
