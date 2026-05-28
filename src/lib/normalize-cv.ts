import type { CVData } from "@/resume-types";

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function opt(value: unknown): string | undefined {
  const t = trim(value);
  return t || undefined;
}

function cleanStrings(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => trim(item)).filter(Boolean);
}

/** Dữ liệu CV sau chuẩn hóa — dùng cho hiển thị / xuất file */
export function normalizeCVData(raw: CVData): CVData {
  const header = raw.header ?? ({} as CVData["header"]);

  const creativeSkills = raw.creativeSkills ?? ({} as CVData["creativeSkills"]);

  return {
    header: {
      fullName: trim(header.fullName) || "—",
      position: trim(header.position) || "—",
      tagline: trim(header.tagline),
      highlights: cleanStrings(header.highlights),
      phone: trim(header.phone),
      email: opt(header.email),
      address: trim(header.address),
      portfolio: trim(header.portfolio),
      linkedin: opt(header.linkedin),
      instagram: opt(header.instagram),
      facebook: opt(header.facebook),
      zalo: opt(header.zalo),
    },
    creativeSkills: {
      design: cleanStrings(creativeSkills.design),
      content: cleanStrings(creativeSkills.content),
      software: cleanStrings(creativeSkills.software),
      media: cleanStrings(creativeSkills.media),
    },
    certifications: (Array.isArray(raw.certifications) ? raw.certifications : [])
      .map((c) => ({
        name: trim(c?.name),
        detail: opt(c?.detail),
      }))
      .filter((c) => c.name),
    languages: (Array.isArray(raw.languages) ? raw.languages : [])
      .map((l) => ({
        name: trim(l?.name),
        level: trim(l?.level),
      }))
      .filter((l) => l.name),
    careerObjective: trim(raw.careerObjective),
    education: (Array.isArray(raw.education) ? raw.education : [])
      .map((e) => ({
        school: trim(e?.school),
        major: opt(e?.major),
        period: trim(e?.period),
        gpa: opt(e?.gpa),
        detail: opt(e?.detail),
      }))
      .filter((e) => e.school),
    experience: (Array.isArray(raw.experience) ? raw.experience : [])
      .map((x) => ({
        company: trim(x?.company),
        role: trim(x?.role),
        period: trim(x?.period),
        bullets: cleanStrings(x?.bullets),
      }))
      .filter((x) => x.company && x.role),
    projects: (Array.isArray(raw.projects) ? raw.projects : [])
      .map((p) => ({
        name: trim(p?.name),
        role: trim(p?.role),
        period: trim(p?.period),
        tools: cleanStrings(p?.tools),
        summary: trim(p?.summary),
        bullets: cleanStrings(p?.bullets),
        result: opt(p?.result),
        portfolioUrl: opt(p?.portfolioUrl),
      }))
      .filter((p) => p.name),
    activities: (Array.isArray(raw.activities) ? raw.activities : [])
      .map((a) => ({
        title: trim(a?.title),
        period: opt(a?.period),
        description: trim(a?.description),
      }))
      .filter((a) => a.title),
  };
}

export function hasCreativeSkills(data: CVData): boolean {
  const { design, content, software, media } = data.creativeSkills;
  return design.length + content.length + software.length + media.length > 0;
}
