# CV Template — Business Creative



Mẫu CV **một trang A4** cho designer, content creator và visual brand.



## Cấu trúc cấu hình (`src/`)



| File | Mục đích |

|------|----------|

| **`resume-basic.ts`** | Nội dung CV (tiếng Việt) |
| **`resume-advanced.ts`** | SEO, gallery, meta |
| **`resume.ts`** | Re-export cho app |

| **`avatar.ts`** | Ảnh đại diện → `public/avatar/avatar.jpg` |

| **`color.ts`** | Màu website & CV |

| **`font.ts`** | Google Fonts |

| **`config.ts`** | Chế độ basic/advanced, bật/tắt tính năng |

| **`huongdan.md`** | Hướng dẫn nhập liệu đầy đủ |



## Chạy local



```bash

npm install

npm run dev

```



## In PDF



In / Xuất PDF → A4 → bật **In nền**.



## SEO



Mặc định **chặn Google** (`config.seo.blockSearchEngines: true`) — `robots.txt` + `noindex`.



## Deploy



Import repo lên Vercel → sửa `resume.ts` / `avatar.ts` → push.

