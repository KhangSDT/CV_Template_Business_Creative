/**
 * Gallery = thư mục public/gallery/
 * Chú thích hiển thị = tên file (có thể đặt tên tiếng Việt, vd: "Chiến dịch Tết 2024.jpg")
 */

export interface GalleryImage {
  src: string;
  /** Tên file — dùng làm chú thích & alt */
  caption: string;
  alt: string;
}

const GALLERY_DIR = "/gallery";

/** Lấy tên file làm chú thích (giữ nguyên, gồm đuôi .jpg/.png nếu có) */
export function captionFromFileName(fileName: string): string {
  const base = fileName.trim().split(/[/\\]/).pop() ?? fileName;
  return base;
}

export function buildGalleryImages(fileNames: string[]): GalleryImage[] {
  return fileNames
    .map((file) => file.trim())
    .filter(Boolean)
    .map((file) => {
      const caption = captionFromFileName(file);
      const src = `${GALLERY_DIR}/${file.replace(/^\/gallery\//, "")}`;
      return { src, caption, alt: caption };
    });
}
