"use client";

import dynamic from "next/dynamic";
import { config, featureEnabled } from "@/config";
import { useInView } from "@/lib/use-in-view";

const GalleryCarousel = dynamic(() => import("@/components/GalleryCarousel"), {
  loading: () => <div className="gallery-lazy-placeholder" aria-hidden />,
});

type Props = {
  title: string;
};

export default function LazyGallery({ title }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>("280px 0px", true);
  const eager = !config.performance.lazyLoadGallery;

  if (!featureEnabled("gallery")) return null;

  return (
    <div ref={ref} className="gallery-lazy-slot">
      {eager || inView ? (
        <GalleryCarousel title={title} autoplay={inView || eager} />
      ) : (
        <div className="gallery-lazy-placeholder" aria-hidden />
      )}
    </div>
  );
}
