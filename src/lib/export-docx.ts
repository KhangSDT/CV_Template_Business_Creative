import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import type { CVData } from "@/resume";
import { hasCreativeSkills, normalizeCVData } from "@/lib/normalize-cv";

export async function exportCvToDocx(raw: CVData): Promise<Blob> {
  const data = normalizeCVData(raw);
  const { header, creativeSkills, careerObjective, education, experience, projects, activities } =
    data;
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: header.fullName, bold: true, size: 32 })],
    }),
    new Paragraph({
      children: [new TextRun({ text: header.position, size: 24, color: "c45c3e" })],
    }),
  );

  const contactLine = [header.phone, header.address].filter(Boolean).join(" | ");
  if (contactLine) {
    children.push(new Paragraph({ children: [new TextRun(contactLine)] }));
  }

  const linkLine = [
    header.email && `Email: ${header.email}`,
    header.portfolio && `GitHub: ${header.portfolio}`,
    header.facebook && `Facebook: ${header.facebook}`,
    header.zalo && `Zalo: ${header.zalo}`,
  ]
    .filter(Boolean)
    .join(" | ");
  if (linkLine) {
    children.push(new Paragraph({ children: [new TextRun(linkLine)] }));
  }

  children.push(new Paragraph({ text: "" }));

  if (header.tagline) {
    children.push(new Paragraph({ children: [new TextRun({ text: header.tagline, italics: true })] }));
    children.push(new Paragraph({ text: "" }));
  }

  if (hasCreativeSkills(data)) {
    const skillGroups = [
      ["Thiết kế", creativeSkills.design],
      ["Nội dung", creativeSkills.content],
      ["Phần mềm", creativeSkills.software],
      ["Kênh media", creativeSkills.media],
    ] as const;

    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Năng lực sáng tạo" }));
    for (const [label, items] of skillGroups) {
      if (items.length) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: label, bold: true }),
              new TextRun({ text: ": " + items.join(", ") }),
            ],
          }),
        );
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (careerObjective) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Mục tiêu nghề nghiệp" }),
      new Paragraph({ children: [new TextRun(careerObjective)] }),
      new Paragraph({ text: "" }),
    );
  }

  if (education.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Học vấn" }));
    for (const edu of education) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.school, bold: true }),
            ...(edu.period ? [new TextRun({ text: ` (${edu.period})` })] : []),
          ],
        }),
      );
      if (edu.major) {
        children.push(new Paragraph({ text: `Chuyên ngành: ${edu.major}` }));
      }
      if (edu.detail) {
        children.push(new Paragraph({ text: edu.detail }));
      }
      if (edu.gpa) {
        children.push(new Paragraph({ text: edu.gpa }));
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (experience.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Kinh nghiệm làm việc" }));
    for (const job of experience) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: job.company, bold: true }),
            new TextRun({
              text: ` — ${job.role}${job.period ? ` (${job.period})` : ""}`,
            }),
          ],
        }),
      );
      for (const bullet of job.bullets) {
        children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun(bullet)] }));
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (projects.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Dự án / Case study" }));
    for (const project of projects) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: project.name, bold: true }),
            new TextRun({
              text: ` — ${project.role}${project.period ? ` (${project.period})` : ""}`,
            }),
          ],
        }),
      );
      if (project.tools.length) {
        children.push(
          new Paragraph({ children: [new TextRun(`Tools: ${project.tools.join(", ")}`)] }),
        );
      }
      if (project.summary) {
        children.push(new Paragraph({ children: [new TextRun(project.summary)] }));
      }
      for (const bullet of project.bullets) {
        children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun(bullet)] }));
      }
      if (project.result) {
        children.push(new Paragraph({ children: [new TextRun(project.result)] }));
      }
      if (project.portfolioUrl) {
        children.push(
          new Paragraph({ children: [new TextRun(`Portfolio: ${project.portfolioUrl}`)] }),
        );
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (activities.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Hoạt động" }));
    for (const act of activities) {
      const line = act.description
        ? `${act.title}${act.period ? ` (${act.period})` : ""} — ${act.description}`
        : `${act.title}${act.period ? ` (${act.period})` : ""}`;
      children.push(new Paragraph({ text: line }));
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (data.certifications.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Chứng chỉ" }));
    for (const cert of data.certifications) {
      children.push(new Paragraph({ text: `${cert.name}${cert.detail ? ` — ${cert.detail}` : ""}` }));
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (data.languages.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: "Ngôn ngữ" }));
    for (const lang of data.languages) {
      children.push(new Paragraph({ text: `${lang.name}${lang.level ? ` — ${lang.level}` : ""}` }));
    }
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  return Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
