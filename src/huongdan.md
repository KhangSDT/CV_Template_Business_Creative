# Hướng dẫn nhập liệu — CV Business Creative

## Cấu trúc file cấu hình

| File | Nội dung |
|------|----------|
| **`src/resume-basic.ts`** | Dữ liệu CV cơ bản (tiếng Việt) |
| **`src/resume-advanced.ts`** | SEO, gallery, meta website |
| **`src/resume.ts`** | Re-export cho app (không cần sửa) |
| **`src/avatar.ts`** | Ảnh đại diện (`public/avatar/avatar.jpg`) |
| **`src/color.ts`** | Màu website & CV |
| **`src/font.ts`** | Font Google Fonts |
| **`src/config.ts`** | Chế độ basic/advanced, bật/tắt tính năng, chặn Google |

---

## 1. `resume-basic.ts` (bắt buộc)

Mở **`src/resume-basic.ts`** — chỉ nhập **tiếng Việt**. Bấm **English** trên web để dịch (nếu bật trong `config.ts`).

| Nhóm | Ghi chú |
|------|---------|
| `header` | Họ tên, vị trí, tagline, highlights, liên hệ, portfolio |
| `creativeSkills` | design · content · software · media |
| `careerObjective` | Mục tiêu nghề nghiệp |
| `education` | Học vấn: `school`, `period`, `major?`, `detail?` (nội dung / hoạt động / giai đoạn) |
| `experience` | Kinh nghiệm / thực tập (công ty, bullet + KPI) |
| `projects` | Mục **05** — Dự án & case study (không còn link「Xem Portfolio」) |
| `activities` | Hoạt động, CLB (tùy chọn) |
| `certifications`, `languages` | Chứng chỉ, ngoại ngữ |

Giữ **1 trang A4** khi in — tối đa 2 dự án nếu nội dung dài.

---

## 2. `resume-advanced.ts` (website)

SEO, nhãn toolbar và gallery (không in lên CV A4).

### `meta` — SEO

| Trường | Ghi chú |
|--------|---------|
| `siteUrl` | URL sau khi deploy Vercel |
| `siteTitle`, `description` | Tiêu đề tab & mô tả share link |
| `keywords` | Từ khóa (tùy chọn) |
| `ogImage` | Ảnh share link, vd: `/avatar/avatar.jpg` |

### `branding` — Giao diện web

| Trường | Ghi chú |
|--------|---------|
| `toolbarName` | Tên trên thanh công cụ |
| `toolbarSubtitle` | Dòng phụ toolbar |
| `galleryTitle` | Tiêu đề mục ảnh hoạt động |

### `gallery`

| Trường | Ghi chú |
|--------|---------|
| `files` | **Chỉ tên file** trong `public/gallery/` — chú thích = tên file |
| `intervalMs` | Thời gian chuyển slide carousel |
| `printColumns` | Số cột ảnh khi in PDF (mặc định 3) |

Gallery = ảnh **hoạt động / việc đã làm**. Đặt tên file có nghĩa (tiếng Việt được).

Thêm ảnh:

1. Copy vào `public/gallery/`
2. Thêm tên file vào `resume-advanced.ts` → `gallery.files`:

```ts
files: [
  "Workshop Visual Storytelling.jpg",
  "Rebrand quán cà phê — mockup menu.png",
],
```

---

## 3. `avatar.ts`

1. Thay file **`public/avatar/avatar.jpg`** (JPG/PNG, khuyến nghị 400×500 px, dọc).
2. Sửa `alt`, `enabled`, `aspect`, `objectPosition` nếu cần.

```ts
export const avatar = {
  enabled: true,
  src: "/avatar/avatar.jpg",
  alt: "Họ tên — Content Creator",
  // ...
};
```

---

## 4. `color.ts`

Sửa hex trong `brand` (màu chính) và `cv` (chữ). Có sẵn `presets` (creative, navy, editorial).

---

## 5. `font.ts`

Chọn font trên [Google Fonts](https://fonts.google.com/) — copy tên vào `fonts.sans`, `display`, `accent`. Ưu tiên font hỗ trợ **Vietnamese**.

---

## 6. `config.ts`

```ts
displayMode: "basic" | "advanced"
```

| Chế độ | Ý nghĩa |
|--------|---------|
| `basic` | CV + in/PDF — ẩn gallery, dịch EN, DOCX, nền studio |
| `advanced` | Theo từng `features.*` bên dưới |

### Thứ tự STT cột phải CV (khi bật đủ mục)

| STT | `features` | Mục |
|-----|------------|-----|
| 01 | `careerObjective` | Định hướng & mục tiêu |
| 02 | `education` | Học vấn |
| 03 | `experience` | Kinh nghiệm (cần có dữ liệu) |
| 04 | `activities` | Hoạt động (cần có dữ liệu) |
| 05 | `projects` | Dự án & case study — tắt bằng `projects: false` |

Ẩn bất kỳ mục nào → các STT còn lại **tự đánh số lại** (01, 02, 03…).

### Giải thích `features`

| Key | Ý nghĩa |
|-----|---------|
| `avatar` | Ảnh đại diện sidebar |
| `headerHighlights` | Chip dưới tagline header |
| `instagram` | Dòng Instagram trong liên hệ |
| `certifications` | Chứng chỉ (sidebar) |
| `careerObjective` | Mục 01 — Mục tiêu nghề nghiệp |
| `education` | Mục 02 — Học vấn |
| `experience` | Mục 03 — Kinh nghiệm |
| `activities` | Mục 04 — Hoạt động |
| `projects` | Mục 05 — Dự án (bỏ = không hiện cả mục) |
| `creativeSkills` | Năng lực sáng tạo (sidebar) |
| `languages` | Ngôn ngữ (sidebar) |
| `gallery` | Carousel ảnh cuối trang |
| `englishTranslation` | Nút dịch EN |
| `studioBackground` | Nền web động |
| `exportPrint` | Nút In CV |
| `exportPdf` | Nút Tải PDF |
| `exportDocx` | Nút Tải DOCX |
| `jsonLd` | Dữ liệu có cấu trúc SEO (khi cho phép index) |

**Chặn Google tìm kiếm** (mặc định bật):

```ts
seo: { blockSearchEngines: true }
```

---

## In PDF

**In / Xuất PDF** hoặc Ctrl+P → **A4** → **bật In nền** (Background graphics). Gallery in ở trang 2 (ảnh luôn tải sẵn, không cần cuộn tới gallery). PDF chụp ở độ phân giải ~300 DPI — chữ sắc hơn khi zoom xem trước ×2.

## Tối ưu hiệu năng (`config.ts` → `performance`)

| Tùy chọn | Ghi chú |
|----------|---------|
| `galleryImageQuality` | 75 = cân bằng; giảm nếu gallery nặng |
| `lazyLoadGallery` | Chỉ tải carousel khi cuộn gần tới |
| `lazyLoadExportLibs` | PDF/DOCX tải khi bấm nút (giảm JS ban đầu) |
| `pdfCaptureScale` | `1.5` = xuất PDF nhanh hơn, `2` = sắc hơn |

**Gallery:** nên resize ảnh ~1920px ngang, &lt;500KB/file — file 4K làm trang chậm.

## Chạy local

```bash
npm install
npm run dev
```
