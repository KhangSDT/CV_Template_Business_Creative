import { featureEnabled } from "@/config";
import { avatar, resolveAvatarSrc } from "@/avatar";

export default function CVAvatar() {
  if (!featureEnabled("avatar") || !avatar.enabled) {
    return null;
  }

  const src = resolveAvatarSrc();
  const aspectClass =
    avatar.aspect === "square" ? "cv-avatar--square" : "cv-avatar--portrait";

  return (
    <div
      className={`cv-avatar relative z-10 ${aspectClass} ${avatar.hideInPrint ? "cv-avatar--no-print" : ""}`}
    >
      <div className="cv-avatar__frame">
        {/* img thường — html2canvas / in ổn định hơn next/image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={avatar.alt}
          width={400}
          height={avatar.aspect === "square" ? 400 : 500}
          className="cv-avatar__img"
          data-cv-print-img=""
          decoding="sync"
          style={{
            objectFit: avatar.objectFit,
            objectPosition: avatar.objectPosition,
          }}
        />
      </div>
    </div>
  );
}
