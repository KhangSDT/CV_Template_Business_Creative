import type { MetadataRoute } from "next";
import { isSearchBlocked } from "@/config";

export default function robots(): MetadataRoute.Robots {
  if (isSearchBlocked()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
