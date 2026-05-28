/** Kiểu dữ liệu CV — dùng chung cho resume-basic & app */

export interface Certification {
  name: string;
  detail?: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
}

export interface Education {
  school: string;
  /** Chuyên ngành — bỏ trống nếu không áp dụng (THPT, THCS, TH) */
  major?: string;
  period: string;
  gpa?: string;
  /** Nội dung / hoạt động / giai đoạn học tập */
  detail?: string;
}

export interface Project {
  name: string;
  role: string;
  period: string;
  tools: string[];
  summary: string;
  bullets: string[];
  result?: string;
  portfolioUrl?: string;
}

export interface Activity {
  title: string;
  period?: string;
  description: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface CVData {
  header: {
    fullName: string;
    position: string;
    tagline: string;
    highlights: string[];
    phone: string;
    email?: string;
    address: string;
    portfolio: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    zalo?: string;
  };
  creativeSkills: {
    design: string[];
    content: string[];
    software: string[];
    media: string[];
  };
  certifications: Certification[];
  languages: LanguageSkill[];
  careerObjective: string;
  education: Education[];
  experience: WorkExperience[];
  projects: Project[];
  activities: Activity[];
}

/** Dữ liệu nâng cao — SEO, branding web, gallery */
export interface ResumeAdvanced {
  meta: {
    siteUrl: string;
    siteTitle: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
  };
  branding: {
    toolbarName: string;
    toolbarSubtitle: string;
    galleryTitle: string;
  };
  gallery: {
    files: string[];
    intervalMs: number;
    printColumns: number;
  };
}
