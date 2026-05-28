/**
 * Ảnh đại diện CV — file: public/avatar/avatar.jpg
 * Hướng dẫn: src/huongdan.md
 */

export type AvatarAspect = "portrait" | "square";
export type AvatarObjectFit = "cover" | "contain";

export interface AvatarConfig {
  enabled: boolean;
  /** Mặc định: /avatar/avatar.jpg */
  src: string;
  alt: string;
  aspect: AvatarAspect;
  objectFit: AvatarObjectFit;
  objectPosition: string;
  hideInPrint: boolean;
}

export const DEFAULT_AVATAR_SRC = "/avatar/avatar.jpg";

export const avatar: AvatarConfig = {
  enabled: true,
  src: DEFAULT_AVATAR_SRC,
  alt: "Võ Hoàng Hải Nghĩa — Content Creator & Graphic Designer",
  aspect: "portrait",
  objectFit: "cover",
  objectPosition: "center top",
  hideInPrint: false,
};

/** @deprecated Dùng `avatar` */
export const avatarConfig = avatar;

export function resolveAvatarSrc(): string {
  if (!avatar.enabled) return "";
  return avatar.src.trim() || DEFAULT_AVATAR_SRC;
}
