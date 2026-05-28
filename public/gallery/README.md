# Gallery — Ảnh hoạt động / việc đã làm

Thư mục lưu ảnh minh họa công việc, dự án, sự kiện bạn đã tham gia.

## Cách thêm ảnh

1. Copy file vào đây (`jpg`, `png`, `webp`).
2. **Đặt tên file = chú thích** — tên sẽ hiện dưới ảnh trên web và khi in PDF.  
   Ví dụ: `Chiến dịch social Tết 2024.jpg`, `Poster CLB Mỹ thuật.png`
3. Mở **`src/resume-advanced.ts`** → `gallery.files` → thêm tên file:

```ts
files: [
  "Chiến dịch social Tết 2024.jpg",
  "Poster CLB Mỹ thuật.png",
],
```

4. Lưu và refresh trang.

Không cần nhập `alt` hay `caption` riêng — hệ thống lấy **đúng tên file**.

Hướng dẫn đầy đủ: [`src/huongdan.md`](../../src/huongdan.md)
