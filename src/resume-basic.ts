/** 
 * ═══════════════════════════════════════════════════════════════
 *  RESUME BASIC — Thông tin BẮT BUỘC của CV (in / PDF / DOCX)
 *  • Header, kỹ năng, mục tiêu, học vấn, kinh nghiệm, dự án, hoạt động…
 *  • Chỉ nhập tiếng Việt — bấm English trên web để dịch
 *  Hướng dẫn: src/huongdan.md
 
 * ═══════════════════════════════════════════════════════════════
 */

import type { CVData } from "@/resume-types";

export const basic: CVData = {
  header: {
    fullName: "NGUYẾN CHÍ KHANG",
    position: "Nhà sáng tạo nội dung / Thiết kế hình ảnh",
    tagline:
      "(KhangSDT) · Sinh 12/06/1996 — Content Creator & Graphic Designer, tư duy sáng tạo hiện đại, thiết kế visual đa nền tảng và xây dựng thương hiệu cá nhân.",
    highlights: [
      "Graphic Design",
      "Content Creator",
      "Social Media Branding",
      "Visual Storytelling",
      "Ubuntu Server",
    ],
    phone: "0365882061",
    email: "chikhang9812@gmail.com",
    address: "Tây Ninh, Việt Nam",
    portfolio: "https://github.com/KhangSDT",
    facebook: "https://www.facebook.com/profile.php?id=100006985387032",
    zalo: "https://zalo.me/0365882061",
  },

  creativeSkills: {
    design: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "CorelDRAW",
      "Canva",
      "Lightroom",
      "Banner · Poster · Thumbnail",
      "Social Media Visual",
      "Nhận diện thương hiệu cá nhân",
      "Chỉnh màu & retouch",
    ],
    content: [
      "Nội dung TikTok · Instagram · Facebook",
      "Biên tập video ngắn (CapCut)",
      "Facebook Ads visual",
      "Storytelling & ý tưởng nội dung",
      "Tối ưu theo xu hướng MXH",
    ],
    software: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "CorelDRAW",
      "Canva",
      "Lightroom",
      "CapCut",
    ],
    media: ["TikTok", "Instagram", "Facebook", "Facebook Ads", "CapCut"],
  },

  certifications: [],

  languages: [{ name: "Tiếng Việt", level: "Bản ngữ" }],

  careerObjective:
    "Nhà sáng tạo nội dung số (Content Creator) & Graphic Designer với tư duy sáng tạo hiện đại, tập trung thiết kế hình ảnh truyền thông, xây dựng thương hiệu cá nhân và phát triển nội dung đa nền tảng. Có kinh nghiệm thiết kế visual cho Facebook, TikTok, Instagram; xây dựng nội dung thẩm mỹ cao, tối ưu tương tác và bắt trend. Thành thạo công cụ thiết kế/chỉnh sửa hình ảnh–video, phát triển ý tưởng từ concept đến sản phẩm hoàn chỉnh. Phong cách linh hoạt, chú trọng thẩm mỹ, hướng tới sản phẩm truyền thông nổi bật và chuyên nghiệp.",

  education: [
    {
      school: "Đại học TP. Hồ Chí Minh",
      major: "Công nghệ thông tin",
      period: "2022 – 2024",
      detail:
        "Hoàn thiện và nâng cao tư duy hệ thống, thuật toán và các công nghệ phần mềm chuyên sâu.",
    },
    {
      school: "Trường Cao Đẳng Công Nghệ Ladec",
      major: "Công nghệ thông tin",
      period: "2016 – 2019",
      detail:
        "Giữ vai trò Quản lý nhóm thanh niên tham gia các hoạt động phong trào, tình nguyện do trường và tỉnh tổ chức; rèn luyện kỹ năng lãnh đạo (Leadership) và làm việc nhóm.",
    },
    {
      school: "Trường Cao đẳng Bách Khoa Nam Sài Gòn",
      major: "Y Sỹ Đa Khoa",
      period: "2014 – 2016",
      detail:
        "Tích cực tham gia các hoạt động ngoại khóa, xây dựng nền tảng kỹ năng mềm phong phú và tích lũy kiến thức y khoa thực tiễn phục vụ cho công việc tại hệ thống Y tế sau này.",
    },
    {
      school: "Trường THPT Hùng Vương",
      period: "2011 – 2014",
      detail:
        "Học sinh khối THPT, trải qua những bài học lớn từ cuộc sống để trưởng thành và định hình trách nhiệm cá nhân.",
    },
    {
      school: "Trường THCS Trần Phú",
      period: "2007 – 2011",
      detail:
        "Hoàn thành chương trình Trung học cơ sở, rèn luyện tính tự lập trước các biến cố gia đình.",
    },
    {
      school: "Trường TH Vĩnh Công",
      period: "2002 – 2007",
      detail:
        "Tập trung học tập và bắt đầu hình thành niềm đam mê tự nghiên cứu, tìm tòi những điều yêu thích xung quanh.",
    },
  ],

  experience: [
    {
      company: "Trường Cao đẳng Công nghệ và Du lịch",
      role: "Giảng viên",
      period: "2024 – Hiện tại",
      bullets: [
        "Hướng dẫn và hỗ trợ sinh viên trong hoạt động sáng tạo, kỹ năng thực hành và tư duy làm việc thực tế.",
        "Đồng hành sinh viên trong dự án truyền thông, kỹ năng mềm và định hướng nghề nghiệp.",
      ],
    },
    {
      company: "Freelance / Personal Brand",
      role: "Content Creator & Graphic Designer",
      period: "2023 – nay",
      bullets: [
        "Thiết kế hình ảnh truyền thông cho mạng xã hội; sản xuất visual TikTok, Instagram, Facebook.",
        "Thiết kế banner, poster, thumbnail và social media branding.",
        "Chỉnh sửa ảnh/video phục vụ truyền thông quảng bá; xây dựng concept hiện đại, tối giản, bắt trend.",
      ],
    },
  ],

  projects: [
    {
      name: "Freelance — Công việc nổi bật",
      role: "Content Creator & Graphic Designer",
      period: "2023 – nay",
      tools: ["Photoshop", "Illustrator", "CapCut", "Canva", "Facebook Ads"],
      summary:
        "Sản xuất visual và nội dung marketing online cho thương hiệu cá nhân và khách hàng freelance.",
      bullets: [
        "Thiết kế social post và visual quảng cáo.",
        "Xây dựng nội dung video ngắn.",
        "Thiết kế hình ảnh thương hiệu cá nhân.",
        "Chỉnh màu và tối ưu hình ảnh truyền thông.",
        "Sáng tạo nội dung phục vụ marketing online.",
      ],
      portfolioUrl: "https://github.com/ZakShinn",
    },
  ],

  activities: [
    {
      title: "Sở thích",
      description:
        "Thiết kế hình ảnh theo xu hướng hiện đại; chỉnh màu ảnh & edit video ngắn; xây dựng concept thương hiệu cá nhân; theo dõi trend thiết kế & MXH; visual tối giản, cinematic, modern; chụp ảnh & nghe nhạc tìm cảm hứng sáng tạo.",
    },
    {
      title: "Điểm mạnh cá nhân",
      description:
        "Tư duy thẩm mỹ tốt; học hỏi nhanh, thích nghi linh hoạt; chủ động và có trách nhiệm với deadline; làm việc độc lập và teamwork hiệu quả.",
    },
    {
      title: "Hoạt động — Cao đẳng LADEC",
      period: "2016 – 2019",
      description:
        "Tham gia phong trào và quản lý nhóm thanh niên tình nguyện; rèn luyện kỹ năng lãnh đạo và làm việc nhóm.",
    },
    {
      title: "Định hướng phát triển",
      description:
        "Graphic Design · Content Creator · Social Media Branding · Visual Storytelling · Digital Media · Creative Design · Social Content Production.",
    },
  ],
};
