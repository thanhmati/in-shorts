# in-shorts: Tự động hóa sản xuất YouTube Shorts với Remotion & Antigravity

Dự án tự động hóa sản xuất video ngắn lập trình (YouTube Shorts 1080x1920) cho kênh **[@laptrinhfullstack](https://www.youtube.com/@laptrinhfullstack)**.

---

## 🚀 Các Series Nội dung

1. **Series A — Coding Tips (30–45s)**: Hook $\to$ Bad Code $\to$ Clean Code Refactoring $\to$ Takeaway.
2. **Series B — System Design Animation**: Sơ đồ luồng dữ liệu, Microservices, Redis, Kafka, Load Balancer.
3. **Series C — Developer Tools & Workflow**: Terminal commands, Docker container vs image, Git rebase vs merge.

---

## 🛠️ Quy trình Tạo Video Tự Động

### Bước 1: Yêu cầu Antigravity Agent
Chỉ cần chat với Antigravity trong IDE:
> *"Tạo short Series A về chủ đề: TypeScript satisfies dùng để làm gì?"*

Antigravity sẽ:
1. Soạn kịch bản tối ưu chuyển đổi và code demo.
2. Tự gọi `scripts/generate_tts.py` để sinh file âm thanh tiếng Việt và phụ đề từng từ (Word-level timestamps).
3. Đăng ký tập mới vào Remotion và tự động căn chỉnh frame chuyển đổi.

### Bước 2: Xem trước (Preview)
Khởi động Remotion Studio:
```bash
npm run dev
```
Mở trình duyệt: [http://localhost:3000](http://localhost:3000)

### Bước 3: Xuất video (Render)
Khi đã ưng ý:
```bash
npx remotion render ReactRerender out/react-rerender.mp4
```

---

## 📂 Cấu trúc Dự án

- `src/core/`: Bộ UI components dùng chung (SafeLayout 9:16, Branding, MacWindow, CodeBlock Prism, KineticCaptions).
- `src/series/series-a/`: Template và dữ liệu các tập Series A.
- `scripts/generate_tts.py`: Script Edge-TTS tiếng Việt tự động tạo audio và subtitle timestamp microsecond.
- `.agents/rules/shorts-generator.md`: Bộ quy tắc agent rules để Antigravity tự động hóa sản xuất.
