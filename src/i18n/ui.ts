export type Locale = "vi" | "en";

export type UILabels = {
  cvDocument: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    portfolio: string;
    github: string;
    facebook: string;
    zalo: string;
    linkedin: string;
    instagram: string;
  };
  sidebar: {
    creativeSkills: string;
    skillGroups: {
      design: string;
      content: string;
      software: string;
      media: string;
    };
    certifications: string;
    languages: string;
    footer: string;
  };
  main: {
    careerObjective: string;
    education: string;
    experience: string;
    projects: string;
    activities: string;
    viewPortfolio: string;
    toolsLabel: string;
  };
  page: {
    brand: string;
    previewLabel: string;
    subtitle: string;
    galleryTitle: string;
    print: string;
    pdf: string;
    docx: string;
    switchToEn: string;
    switchToVi: string;
    translating: string;
    translateError: string;
  };
};

export const uiLabels: Record<Locale, UILabels> = {
  vi: {
    cvDocument: "Portfolio & CV",
    contact: {
      phone: "Điện thoại",
      email: "Email",
      location: "Địa chỉ",
      portfolio: "Portfolio",
      github: "GitHub",
      facebook: "Facebook",
      zalo: "Zalo",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
    sidebar: {
      creativeSkills: "Năng lực sáng tạo",
      skillGroups: {
        design: "Thiết kế hình ảnh",
        content: "Sáng tạo nội dung",
        software: "Phần mềm",
        media: "Kênh & định dạng",
      },
      certifications: "Chứng chỉ & khóa học",
      languages: "Ngôn ngữ",
      footer: "Design · Content · Visual",
    },
    main: {
      careerObjective: "Định hướng & mục tiêu",
      education: "Học vấn",
      experience: "Kinh nghiệm làm việc",
      projects: "Dự án & case study",
      activities: "Hoạt động & cộng đồng",
      viewPortfolio: "→ Xem trên Portfolio",
      toolsLabel: "Công cụ",
    },
    page: {
      brand: "Business Creative",
      previewLabel: "Xem trước",
      subtitle: "Thiết kế hình ảnh · Sáng tạo nội dung · Visual Brand",
      galleryTitle: "Hoạt động & việc đã làm",
      print: "In CV",
      pdf: "Tải PDF",
      docx: "Tải DOCX",
      switchToEn: "English",
      switchToVi: "Tiếng Việt",
      translating: "Đang dịch…",
      translateError: "Không thể dịch. Vui lòng thử lại.",
    },
  },
  en: {
    cvDocument: "Portfolio & CV",
    contact: {
      phone: "Phone",
      email: "Email",
      location: "Location",
      portfolio: "Portfolio",
      github: "GitHub",
      facebook: "Facebook",
      zalo: "Zalo",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
    sidebar: {
      creativeSkills: "Creative Skills",
      skillGroups: {
        design: "Visual Design",
        content: "Content Creation",
        software: "Software",
        media: "Channels & Formats",
      },
      certifications: "Certifications & Courses",
      languages: "Languages",
      footer: "Design · Content · Visual",
    },
    main: {
      careerObjective: "Creative Direction & Goals",
      education: "Education",
      experience: "Work Experience",
      projects: "Projects & Case Studies",
      activities: "Activities & Community",
      viewPortfolio: "→ View Case Study",
      toolsLabel: "Tools",
    },
    page: {
      brand: "Business Creative",
      previewLabel: "Preview",
      subtitle: "Visual Design · Content Creation · Brand",
      galleryTitle: "Activities & Work Done",
      print: "Print",
      pdf: "Download PDF",
      docx: "Download DOCX",
      switchToEn: "English",
      switchToVi: "Tiếng Việt",
      translating: "Translating…",
      translateError: "Translation failed. Please try again.",
    },
  },
};
