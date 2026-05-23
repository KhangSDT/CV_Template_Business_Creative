/**
 * CV — Business Creative (Designer · Sáng tạo nội dung)
 *
 * ⚠️ CHỈ NHẬP NỘI DUNG BẰNG TIẾNG VIỆT tại file này.
 * Bản tiếng Anh: bấm "English" trên website.
 *
 * Hướng dẫn: src/data/HUONG_DAN_NHAP_LIEU.md
 * Màu sắc: src/color/theme.ts
 * Ảnh đại diện: src/avatar/config.ts
 */

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
  major: string;
  period: string;
  gpa?: string;
}

export interface Project {
  name: string;
  role: string;
  period: string;
  /** Công cụ / phần mềm / kênh liên quan dự án */
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

export interface CVData {
  header: {
    fullName: string;
    position: string;
    tagline: string;
    highlights: string[];
    phone: string;
    email: string;
    address: string;
    /** Behance / Dribbble / website portfolio — bắt buộc */
    portfolio: string;
    linkedin: string;
    instagram?: string;
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
  projects: Project[];
  activities: Activity[];
}

export const cvData: CVData = {
  header: {
    fullName: "[NGUYỄN VĂN A]",
    position: "[Content Creator / Graphic Designer] Intern",
    tagline:
      "Đam mê kể chuyện bằng hình ảnh và nội dung số — mong tạo ra những ấn phẩm visual nhất quán, có chiều sâu thương hiệu.",
    highlights: [
      "Visual Storytelling",
      "Social Content",
      "Brand Identity",
      "Reels / Short-form",
    ],
    phone: "[0901 234 567]",
    email: "[ten.cua.ban@email.com]",
    address: "[Quận/Huyện, TP. Hồ Chí Minh]",
    portfolio: "https://behance.net/[username]",
    linkedin: "https://linkedin.com/in/[username-linkedin]",
    instagram: "https://instagram.com/[username]",
  },

  creativeSkills: {
    design: [
      "Layout & Composition",
      "Typography",
      "Color Theory",
      "Brand Guideline",
    ],
    content: [
      "Copywriting ngắn",
      "Content Calendar",
      "Script Reels/TikTok",
      "Hashtag Strategy",
    ],
    software: [
      "Adobe Photoshop",
      "Illustrator",
      "Premiere Pro",
      "Figma",
      "Canva Pro",
    ],
    media: [
      "Instagram",
      "TikTok",
      "Facebook Ads",
      "CapCut",
      "Lightroom",
    ],
  },

  certifications: [
    { name: "[Google Digital Garage]", detail: "Fundamentals of Digital Marketing — [2024]" },
    { name: "[Adobe Certified Professional]", detail: "Visual Design — [2023]" },
  ],

  languages: [
    {
      name: "Tiếng Anh",
      level: "Đọc brief, viết caption và trao đổi ý tưởng creative với team",
    },
    { name: "Tiếng Việt", level: "Bản ngữ · copywriting" },
  ],

  careerObjective:
    "Sinh viên [Thiết kế Đồ họa / Truyền thông] hướng tới vai trò [Content Creator & Designer] tại agency hoặc in-house brand. Tôi kết hợp mắt thẩm mỹ, tư duy nội dung và nhịp làm việc nhanh để sản xuất bộ nhận diện, post social và video ngắn đồng bộ. Mong được học hỏi quy trình brief–concept–delivery từ team senior và đóng góp ý tưởng fresh cho chiến dịch thực tế.",

  education: [
    {
      school: "[Đại học Mỹ thuật TP.HCM / Học viện FPT Arena]",
      major: "[Thiết kế Đồ họa / Truyền thông Đa phương tiện]",
      period: "[2021 – 2025]",
      gpa: "GPA [3.5/4.0]",
    },
  ],

  projects: [
    {
      name: "[Rebrand Concept — Thương hiệu F&B địa phương]",
      role: "Lead Designer · Content",
      period: "[02 – 05/2024]",
      tools: ["Illustrator", "Photoshop", "Figma", "Instagram"],
      summary:
        "Xây dựng concept nhận diện và bộ post launch cho quán cà phê specialty — tone ấm, hiện đại, Gen Z.",
      bullets: [
        "Phát triển logo, palette, typography và 12 template post đồng bộ trên Figma.",
        "Viết caption + script 4 Reels giới thiệu sản phẩm; tăng ~35% tương tác so với mức trung bình trang trước đó.",
        "Trình bày case study trên Behance — được giảng viên chọn trưng bày cuối khóa.",
      ],
      result: "Điểm đồ án [9.2/10]",
      portfolioUrl: "https://behance.net/[username]/[fnb-rebrand]",
    },
    {
      name: "[Chiến dịch Social — Tuần lễ Sinh viên]",
      role: "Visual & Content Creator",
      period: "[09 – 11/2023]",
      tools: ["Premiere Pro", "CapCut", "Canva", "TikTok", "Facebook"],
      summary:
        "Sản xuất visual và nội dung cho chiến dịch 3 tuần trên TikTok + Facebook — 20+ ấn phẩm static & 6 video ngắn.",
      bullets: [
        "Lên content pillar, lịch đăng và moodboard; phối hợp 3 bạn copy + quay phim trong nhóm lớp.",
        "Thiết kế KV chính, story template và sticker pack; duy trì nhất quán visual xuyên suốt chiến dịch.",
        "Video recap đạt [120K+ views] organic; học cách A/B test thumbnail và hook 3 giây đầu.",
      ],
      result: "Hoàn thành đúng timeline · Nhận feedback tích cực từ ban tổ chức",
      portfolioUrl: "https://behance.net/[username]/[student-week]",
    },
  ],

  activities: [
    {
      title: "[CLB Truyền thông & Sáng tạo — ĐH]",
      period: "[2022 – nay]",
      description:
        "Thiết kế poster sự kiện, cover album yearbook và hỗ trợ quay/edit highlight cuối năm.",
    },
    {
      title: "[Workshop “Visual Storytelling 101”]",
      period: "[03/2024]",
      description: "Facilitator nhóm 15 bạn — chia sẻ quy trình moodboard → layout → publish.",
    },
  ],
};
