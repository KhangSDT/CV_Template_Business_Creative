import type { CVData } from "@/data/cv";
import { translateTextFree } from "@/lib/translate-providers";

/** Không dịch URL, email, SĐT; giữ tên phần mềm / kênh Latin */
export function shouldSkipTranslation(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(t)) return true;
  if (/^[+\d\s\-().[\]]+$/.test(t)) return true;
  if (!/[\u00C0-\u1EF9]/i.test(t) && /^[a-zA-Z0-9\s#.+/&\-–—():,'"]+$/.test(t)) {
    return true;
  }
  return false;
}

const CONCURRENCY = 4;

async function runPool<T>(
  items: T[],
  worker: (item: T) => Promise<void>,
  concurrency = CONCURRENCY,
) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function translateString(text: string): Promise<string> {
  if (shouldSkipTranslation(text)) return text;

  if (text.length <= 1800) {
    return translateTextFree(text);
  }

  const parts = text.match(/[^.!?…]+[.!?…]?/g) || [text];
  const out: string[] = [];
  for (const part of parts) {
    if (!part.trim()) continue;
    out.push(await translateTextFree(part));
  }
  return out.join("") || text;
}

function collectTranslatableStrings(data: CVData, set: Set<string>) {
  const add = (s?: string) => {
    if (s && !shouldSkipTranslation(s)) set.add(s);
  };

  add(data.header.fullName);
  add(data.header.position);
  add(data.header.tagline);
  data.header.highlights.forEach(add);
  add(data.header.address);

  [
    ...data.creativeSkills.design,
    ...data.creativeSkills.content,
    ...data.creativeSkills.software,
    ...data.creativeSkills.media,
  ].forEach(add);

  data.certifications.forEach((c) => {
    add(c.name);
    add(c.detail);
  });
  data.languages.forEach((l) => {
    add(l.name);
    add(l.level);
  });

  add(data.careerObjective);

  data.education.forEach((e) => {
    add(e.school);
    add(e.major);
    add(e.period);
    add(e.gpa);
  });

  data.experience.forEach((x) => {
    add(x.company);
    add(x.role);
    add(x.period);
    x.bullets.forEach(add);
  });

  data.projects.forEach((p) => {
    add(p.name);
    add(p.role);
    add(p.period);
    add(p.summary);
    p.bullets.forEach(add);
    add(p.result);
    p.tools.forEach(add);
  });

  data.activities.forEach((a) => {
    add(a.title);
    add(a.period);
    add(a.description);
  });
}

function applyMap(text: string, map: Map<string, string>): string {
  if (shouldSkipTranslation(text)) return text;
  return map.get(text.trim()) ?? text;
}

export async function translateCVData(data: CVData): Promise<CVData> {
  const unique = new Set<string>();
  collectTranslatableStrings(data, unique);

  const map = new Map<string, string>();

  await runPool([...unique], async (original) => {
    try {
      map.set(original, await translateString(original));
    } catch {
      map.set(original, original);
    }
  });

  return {
    header: {
      ...data.header,
      fullName: applyMap(data.header.fullName, map),
      position: applyMap(data.header.position, map),
      tagline: applyMap(data.header.tagline, map),
      highlights: data.header.highlights.map((h) => applyMap(h, map)),
      address: applyMap(data.header.address, map),
    },
    creativeSkills: {
      design: data.creativeSkills.design.map((s) => applyMap(s, map)),
      content: data.creativeSkills.content.map((s) => applyMap(s, map)),
      software: data.creativeSkills.software.map((s) => applyMap(s, map)),
      media: data.creativeSkills.media.map((s) => applyMap(s, map)),
    },
    certifications: data.certifications.map((c) => ({
      name: applyMap(c.name, map),
      detail: c.detail ? applyMap(c.detail, map) : undefined,
    })),
    languages: data.languages.map((l) => ({
      name: applyMap(l.name, map),
      level: applyMap(l.level, map),
    })),
    careerObjective: applyMap(data.careerObjective, map),
    education: data.education.map((e) => ({
      ...e,
      school: applyMap(e.school, map),
      major: applyMap(e.major, map),
      period: applyMap(e.period, map),
      gpa: e.gpa ? applyMap(e.gpa, map) : undefined,
    })),
    experience: data.experience.map((x) => ({
      company: applyMap(x.company, map),
      role: applyMap(x.role, map),
      period: applyMap(x.period, map),
      bullets: x.bullets.map((b) => applyMap(b, map)),
    })),
    projects: data.projects.map((p) => ({
      ...p,
      name: applyMap(p.name, map),
      role: applyMap(p.role, map),
      period: applyMap(p.period, map),
      summary: applyMap(p.summary, map),
      bullets: p.bullets.map((b) => applyMap(b, map)),
      result: p.result ? applyMap(p.result, map) : undefined,
      tools: p.tools.map((t) => applyMap(t, map)),
    })),
    activities: data.activities.map((a) => ({
      ...a,
      title: applyMap(a.title, map),
      period: a.period ? applyMap(a.period, map) : undefined,
      description: applyMap(a.description, map),
    })),
  };
}
