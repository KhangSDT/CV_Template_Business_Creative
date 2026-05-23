# Hướng dẫn ảnh đại diện

Ảnh chân dung trên CV cấu hình tại **[`config.ts`](./config.ts)** — file ảnh đặt trong **`public/avatar/`**.

## Cách thêm ảnh của bạn

1. Copy ảnh vào `public/avatar/` (vd: `anh-cua-toi.jpg`).
2. Mở `src/avatar/config.ts`:
   ```ts
   enabled: true,
   src: "/avatar/anh-cua-toi.jpg",
   alt: "Nguyễn Văn A — Content Creator",
   ```
3. Lưu → `npm run dev` hoặc deploy lại.

Không cần sửa `cv.ts` hay component React.

## Các tùy chọn trong `config.ts`

| Trường | Ý nghĩa |
|--------|---------|
| `enabled` | `false` để tắt ảnh (layout CV tự co lại) |
| `src` | Đường dẫn từ `public/`, bắt đầu bằng `/avatar/...` |
| `alt` | Mô tả cho screen reader |
| `aspect` | `"portrait"` (3:4) hoặc `"square"` (1:1) |
| `objectFit` | `"cover"` — lấp đầy khung, có thể cắt mép; `"contain"` — hiện trọn ảnh |
| `objectPosition` | Chỉnh vùng crop, vd `"center top"` nếu mặt bị cắt |
| `hideInPrint` | `true` nếu không muốn in ảnh ra PDF |

## Khuyến nghị kỹ thuật

- Định dạng: **JPG** hoặc **WebP** (nền studio), **PNG** nếu cần nền trong.
- Kích thước: **400×500 px** trở lên (tỷ lệ dọc), dưới **500 KB** để tải nhanh.
- Ánh sáng đều, nền trung tính — phù hợp sidebar tối của mẫu CV.
- Tránh ảnh ngang full-body — sidebar hẹp, dùng `aspect: "portrait"`.

## Ảnh demo

File `public/avatar/demo-portrait.svg` chỉ là placeholder — xóa hoặc giữ, và đổi `src` sang ảnh thật.

## Vị trí trên CV

Ảnh hiển thị **đầu cột trái** (sidebar), phía trên mục “Năng lực sáng tạo”.
