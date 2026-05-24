# Hướng dẫn nhập liệu — Business Creative

Mẫu CV cho **thiết kế hình ảnh**, **sáng tạo nội dung** và **visual brand**. Nội dung lấy từ `src/data/cv.ts`.

| Tuỳ chỉnh | File | Hướng dẫn |
|-----------|------|-----------|
| Nội dung CV | `src/data/cv.ts` | File này |
| Ảnh đại diện | `src/avatar/config.ts` | `src/avatar/HUONG_DAN_ANH_DAI_DIEN.md` |
| Màu / font | `src/color/theme.ts`, `src/font/config.ts` | `HUONG_DAN_DOI_MAU.md`, `HUONG_DAN_DOI_FONT.md` |
| Gallery portfolio | `src/data/gallery.ts` + `public/gallery/` | Ảnh case study in kèm trang 2 |

## Layout chuẩn ngành sáng tạo

| Vùng | Nội dung | Ghi chú |
|------|----------|---------|
| **Header tối** | Họ tên, vị trí, tagline, chip highlight, liên hệ | Portfolio link **bắt buộc** |
| **Sidebar (~33%)** | Ảnh, năng lực sáng tạo (design/content/software/media), chứng chỉ, ngôn ngữ | Gradient tối — thể hiện visual identity |
| **Main (~67%)** | Mục tiêu → Học vấn → **Case study dự án** → Hoạt động | Dự án là phần quan trọng nhất |

## Ngôn ngữ

- **Chỉ nhập tiếng Việt** trong `cv.ts`.
- Bấm **English** trên website để dịch tự động sang tiếng Anh.
- URL, email, SĐT và tên phần mềm (Photoshop, Figma…) **không bị dịch**.

## `header`

| Trường | Ghi chú |
|--------|---------|
| `fullName`, `position` | Họ tên · vị trí (vd: Content Creator Intern) |
| `tagline` | 1 câu về phong cách sáng tạo / định hướng visual |
| `highlights` | 3–4 chip: Visual Storytelling, Brand Identity… |
| `portfolio` | **Bắt buộc** — Behance / Dribbble / website |
| `linkedin`, `instagram?` | Mạng xã hội & professional |

## `creativeSkills` (cột trái)

| Nhóm | Ví dụ |
|------|--------|
| `design` | Layout, typography, brand guideline |
| `content` | Copywriting, content calendar, script Reels |
| `software` | Photoshop, Illustrator, Premiere, Figma |
| `media` | Instagram, TikTok, CapCut… |

## `projects` — Case study (quan trọng nhất)

| Trường | Ghi chú |
|--------|---------|
| `name`, `role`, `period` | Tên chiến dịch / dự án |
| `tools` | Phần mềm & kênh đã dùng |
| `summary` | 1–2 câu concept |
| `bullets` | Kết quả có số liệu (reach, engagement, điểm đồ án…) |
| `portfolioUrl` | Link case study trên Behance |

Giữ **đúng 1 trang A4** khi in — tối đa 2 dự án nếu nội dung dài.

## In & xuất file

| Nút | Chức năng |
|-----|-----------|
| **In CV** | Hộp thoại in trình duyệt (Ctrl+P) → A4, bật **In nền** |
| **Tải PDF** | Tải file PDF từ giao diện CV hiện tại |
| **Tải DOCX** | Tải Word từ dữ liệu `cv.ts` |

## Xem thay đổi

Sau khi sửa `cv.ts` hoặc file cấu hình, lưu và làm mới trình duyệt trên trang preview.
