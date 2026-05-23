import Image from "next/image";
import { avatarConfig } from "@/avatar/config";

export default function CVAvatar() {
  if (!avatarConfig.enabled || !avatarConfig.src) {
    return null;
  }

  const aspectClass =
    avatarConfig.aspect === "square" ? "cv-avatar--square" : "cv-avatar--portrait";

  return (
    <div
      className={`cv-avatar relative z-10 ${aspectClass} ${avatarConfig.hideInPrint ? "cv-avatar--no-print" : ""}`}
    >
      <div className="cv-avatar__frame">
        <Image
          src={avatarConfig.src}
          alt={avatarConfig.alt}
          width={400}
          height={avatarConfig.aspect === "square" ? 400 : 500}
          className="cv-avatar__img"
          style={{
            objectFit: avatarConfig.objectFit,
            objectPosition: avatarConfig.objectPosition,
          }}
          priority
        />
      </div>
    </div>
  );
}
