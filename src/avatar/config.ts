/**
 * ═══════════════════════════════════════════════════════════════
 *  CẤU HÌNH ẢNH ĐẠI DIỆN — chỉnh tại file này
 *  Hướng dẫn: src/avatar/HUONG_DAN_ANH_DAI_DIEN.md
 * ═══════════════════════════════════════════════════════════════
 */

export type AvatarAspect = "portrait" | "square";
export type AvatarObjectFit = "cover" | "contain";

export interface AvatarConfig {
  /** `true` = hiển thị ảnh trên CV; `false` = ẩn hoàn toàn */
  enabled: boolean;
  /**
   * Đường dẫn ảnh từ thư mục `public/`
   * Ví dụ: đặt `public/avatar/anh-cua-toi.jpg` → `src: "/avatar/anh-cua-toi.jpg"`
   */
  src: string;
  /** Mô tả ảnh (accessibility — không bị dịch khi bấm English) */
  alt: string;
  /** Tỷ lệ khung hiển thị trên CV */
  aspect: AvatarAspect;
  /** Cách cắt/khớp ảnh trong khung */
  objectFit: AvatarObjectFit;
  /** Căn vùng hiển thị khi crop, vd: "center top", "50% 20%" */
  objectPosition: string;
  /** `true` = không in ảnh ra PDF (chỉ xem trên web) */
  hideInPrint: boolean;
}

export const DEFAULT_AVATAR_SRC = "/avatar/anh_dai_dien.png"; // CV + favicon

export const avatarConfig: AvatarConfig = {
  enabled: true,
  src: DEFAULT_AVATAR_SRC,
  alt: "Ảnh đại diện — thay bằng ảnh của bạn",
  aspect: "portrait",
  objectFit: "cover",
  objectPosition: "center top",
  hideInPrint: false,
};

export function resolveAvatarSrc(): string {
  if (!avatarConfig.enabled) return "";
  return avatarConfig.src.trim() || DEFAULT_AVATAR_SRC;
}
