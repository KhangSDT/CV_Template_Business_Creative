# CV Template — Business Creative

Mẫu CV **một trang A4** cho **designer**, **content creator** và **visual brand** — editorial, ấm, chuẩn ATS. Deploy trên **Vercel**.

## Điểm nhấn thiết kế

- Palette **charcoal + coral + gold** (không tone IT/xanh cyan)
- Typography **Playfair Display** + Jakarta — cảm giác portfolio creative
- Sidebar: Năng lực sáng tạo (thiết kế, nội dung, phần mềm, kênh)
- Dự án dạng **case study** — Behance, chiến dịch social, rebrand
- Liên hệ: Portfolio · LinkedIn · Instagram

## Ngôn ngữ

- Nhập liệu **chỉ bằng tiếng Việt** trong `src/data/cv.ts`.
- Nút **English** → dịch tự động sang tiếng Anh (nhãn mục + nội dung CV).
- **Dịch miễn phí** (không API key): ưu tiên [Lingva](https://github.com/tardisphere/Lingva-Translate), dự phòng [MyMemory](https://mymemory.translated.net/).
- Tùy chọn: `MYMEMORY_EMAIL` trong `.env` để tăng giới hạn dự phòng (xem `.env.example`).

## Gallery ảnh portfolio

- Đặt ảnh tại `public/gallery/`
- Khai báo trong `src/data/gallery.ts`
- Carousel tự động chuyển slide (~4.5s), có nút prev/next và chấm chọn
- Xem `public/gallery/README.md`

## Màu sắc

Chỉnh tại **`src/color/theme.ts`** — hướng dẫn: [`src/color/HUONG_DAN_DOI_MAU.md`](src/color/HUONG_DAN_DOI_MAU.md)

## Ảnh đại diện

- Đặt file tại `public/avatar/`
- Cấu hình trong **`src/avatar/config.ts`**
- Hướng dẫn: [`src/avatar/HUONG_DAN_ANH_DAI_DIEN.md`](src/avatar/HUONG_DAN_ANH_DAI_DIEN.md)

## Dữ liệu

| File | Mục đích |
|------|----------|
| `src/data/cv.ts` | Nội dung CV (tiếng Việt) |
| `src/data/gallery.ts` | Danh sách ảnh carousel |
| `src/data/HUONG_DAN_NHAP_LIEU.md` | Hướng dẫn nhập liệu |

## Chạy local

```bash
npm install
npm run dev
```

## In PDF

**In / Xuất PDF** hoặc `Ctrl+P` → **A4** → bật **In nền** (background graphics).

## Deploy Vercel

Import repo GitHub → Next.js → Deploy. Sửa `cv.ts` và push để cập nhật.
