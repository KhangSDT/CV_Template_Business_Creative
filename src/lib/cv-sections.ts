import { featureEnabled } from "@/config";
import type { CVData } from "@/resume-types";

/** Thứ tự mục cột phải CV (STT 01 → 05) */
export const MAIN_SECTION_ORDER = [
  "careerObjective",
  "education",
  "experience",
  "activities",
  "projects",
] as const;

export type MainSectionKey = (typeof MAIN_SECTION_ORDER)[number];

function isMainSectionVisible(key: MainSectionKey, data: CVData): boolean {
  switch (key) {
    case "careerObjective":
      return featureEnabled("careerObjective");
    case "education":
      return featureEnabled("education");
    case "experience":
      return featureEnabled("experience") && data.experience.length > 0;
    case "activities":
      return featureEnabled("activities") && data.activities.length > 0;
    case "projects":
      return featureEnabled("projects") && data.projects.length > 0;
    default:
      return false;
  }
}

/** STT liên tục (01, 02, …) — bỏ qua mục bị tắt hoặc không có dữ liệu */
export function getMainSectionNumbers(data: CVData): Record<MainSectionKey, string | null> {
  const nums = {} as Record<MainSectionKey, string | null>;
  for (const key of MAIN_SECTION_ORDER) {
    nums[key] = null;
  }

  let index = 0;
  for (const key of MAIN_SECTION_ORDER) {
    if (!isMainSectionVisible(key, data)) continue;
    index += 1;
    nums[key] = String(index).padStart(2, "0");
  }

  return nums;
}
