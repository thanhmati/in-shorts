# Project Requirement Document (PRD): in-shorts

> **Dự án**: in-shorts — Hệ thống tự động hóa sản xuất video YouTube Shorts bằng Remotion & Google Antigravity  
> **Kênh phát hành**: [@laptrinhfullstack](https://www.youtube.com/@laptrinhfullstack)  
> **Phiên bản tài liệu**: 1.0.0  
> **Mục tiêu**: Làm tài liệu tham chiếu chuẩn (Single Source of Truth) cho Antigravity Agent và lập trình viên để đảm bảo tính nhất quán, ngăn ngừa ảo giác (hallucination) khi sinh code và kịch bản.

---

## 1. Tổng quan Dự án & Mục tiêu

* **Kênh YouTube**: `@laptrinhfullstack` chuyên về Full Stack Web, Backend Engineering (Node.js, Go, Python), AI Engineering (AI Agents, Vibe Coding), Microservices và DevOps.
* **Định dạng video**: YouTube Shorts (Dọc `9:16`, độ phân giải `1080 x 1920`, `30 FPS`).
* **Thời lượng tối ưu**: 30 – 50 giây (tương đương 900 – 1500 frames @ 30fps).
* **Mô hình vận hành**:
  * **Remotion (Video-as-Code)**: Render hình ảnh, animation code highlight, cửa sổ MacOS, diagram kiến trúc và kinetic subtitles hoàn toàn bằng React & TypeScript.
  * **Google Antigravity**: Tự động hóa từ khâu nghiên cứu chủ đề, viết kịch bản, sinh giọng đọc TTS tiếng Việt, gắn phụ đề từng từ, cấu hình props và render MP4.

---

## 2. Đặc tả Các Series Nội dung

### 2.1. Series A — Coding tips trong 30–45 giây (Ưu tiên số 1)
* **Cấu trúc 4 cảnh**:
  1. **Scene 1 - The Hook (0s - 4s)**: Cảnh báo lỗi phổ biến, biểu tượng rung động, tiêu đề giật tút chỉ thẳng vấn đề.
  2. **Scene 2 - Bad Code (4s - 15s)**: Khung MacOS viền đỏ, tag `BAD CODE ❌`, highlight dòng code gây memory leak / re-render / bug logic.
  3. **Scene 3 - Clean Code Refactor (15s - 35s)**: Chuyển cảnh mượt mà sang khung MacOS viền xanh, tag `CLEAN CODE ✅`, giải thích giải pháp tối ưu (useMemo, useCallback, satisfies, Promise.allSettled,...).
  4. **Scene 4 - Takeaway & CTA (35s - 42s)**: Hộp kết luận cốt lõi + kêu gọi follow kênh `@laptrinhfullstack`.
* **Component Remotion**: `CodingTipShort` (`src/series/series-a/CodingTipShort.tsx`).

### 2.2. Series B — System design giải thích bằng animation
* **Mục tiêu**: Trực quan hóa kiến trúc hệ thống bằng sơ đồ node SVG chuyển động (Request flow, Redis Caching, Message Queue Kafka, Load Balancer, JWT Auth).
* **Component Remotion**: `SystemDesignShort` (`src/series/series-b/`).

### 2.3. Series C — Developer tools và workflow
* **Mục tiêu**: Giả lập gõ lệnh Terminal (MacOS zsh), so sánh Git (rebase vs merge), Docker (Image vs Container), công cụ AI Coding.
* **Component Remotion**: `ToolWorkflowShort` (`src/series/series-c/`).

---

## 3. Kiến trúc Hệ thống & Cấu trúc Thư mục

```text
in-shorts/
├── PRD.md                              # Single Source of Truth
├── README.md                           # Hướng dẫn khởi chạy & lệnh CLI
├── .agents/
│   └── rules/
│       └── shorts-generator.md         # Quy trình Workflow của Antigravity Agent
├── scripts/
│   └── generate_tts.py                 # Pipeline Edge-TTS + Smart Phonetic Engine
├── public/
│   ├── audio/                          # File mp3 + json subtitle theo id (vd: [slug].mp3, [slug].json)
│   ├── fonts/                          # JetBrains Mono, Inter
│   └── sfx/                            # Âm thanh hiệu ứng (click, whoosh, pop)
├── src/
│   ├── core/                           # Bộ UI Components cốt lõi dùng chung
│   │   ├── types.ts                    # TypeScript types chuẩn của toàn bộ dự án
│   │   ├── theme.ts                    # Bảng màu Dark Modern, fonts, shadows
│   │   ├── SafeLayout.tsx              # Khung 1080x1920 an toàn cho YouTube Shorts
│   │   ├── Branding.tsx                # Badge nhận diện @laptrinhfullstack + Tag Series
│   │   ├── MacWindow.tsx               # Cửa sổ giả lập MacOS (3 nút traffic lights)
│   │   ├── CodeBlock.tsx               # Prism Syntax Highlighter + Line Highlighting
│   │   └── KineticCaptions.tsx         # Phụ đề nhảy từng từ với spring bounce & neon glow
│   ├── series/
│   │   ├── series-a/                   # Coding Tips
│   │   │   ├── CodingTipShort.tsx      # Main Composition Series A
│   │   │   └── data/                   # Data cấu hình từng tập (.ts)
│   │   ├── series-b/                   # System Design
│   │   └── series-c/                   # Developer Tools
│   ├── Root.tsx                        # Đăng ký danh sách <Composition> Remotion
│   └── index.ts
└── out/                                # Thư mục chứa video MP4 xuất bản (đã ignore git)
```

---

## 4. Hợp đồng Dữ liệu (Data Contracts & Schemas)

Tất cả data cấu hình video bắt buộc phải tuân thủ schema trong [src/core/types.ts](file:///Users/thanhdo/Documents/Project/in-shorts/src/core/types.ts):

```typescript
export type WordCaption = {
  word: string;         // Chữ hiển thị trên phụ đề (luôn là tiếng Anh chuẩn: React, useCallback)
  spoken?: string;      // Từ phiên âm AI đọc (Ri-ét, diu-con-bách)
  startSec: number;     // Thời điểm bắt đầu (giây)
  endSec: number;       // Thời điểm kết thúc (giây)
  startFrame: number;   // Frame bắt đầu = round(startSec * fps)
  endFrame: number;     // Frame kết thúc = round(endSec * fps)
};

export type SubtitleData = {
  text: string;
  spokenText?: string;
  voice: string;
  rate: string;
  fps: number;
  durationInFrames: number;
  durationInSeconds: number;
  words: WordCaption[];
};

export type CodeHighlightLine = {
  line: number;
  type?: "bad" | "good" | "highlight";
};

export type CodingTipScene = {
  title: string;
  subtitle?: string;
  code: string;
  language: string;
  highlightLines?: CodeHighlightLine[];
  tag?: {
    text: string;
    variant: "bad" | "good" | "info" | "tip";
  };
};

export type SeriesAShortProps = {
  id: string;
  topicTitle: string;
  hookText: string;
  audioSrc: string;
  subtitles: SubtitleData;
  scenes: {
    hookDurationFrames: number; // Frame chuyển cảnh từ Bad Code sang Good Code
    badCode: CodingTipScene;
    goodCode: CodingTipScene;
    takeawayText: string;
  };
};
```

---

## 5. Quy chuẩn Thiết kế (Visual & Design Standards)

1. **Kích thước & Safe Zone**:
   * Canvas: $1080 \times 1920$ px.
   * `paddingTop`: $140px$ (tránh bị thanh tìm kiếm/tiêu đề YouTube che).
   * `paddingBottom`: $280px$ (tránh bị cụm nút Like/Comment/Share và tên âm thanh che).
   * `paddingHorizontal`: $52px$.
2. **Bảng màu chủ đạo (Dark Modern Developer)**:
   * Nền: `#0B0F19` kết hợp radial gradient cyan/purple nhẹ.
   * Cửa sổ MacOS: `#111827`, viền `#1F2937`, header bar `#182234`.
   * Màu Bad Code / Cảnh báo: Đỏ `#F43F5E` (Glow: `rgba(244, 63, 94, 0.25)`).
   * Màu Clean Code / Tối ưu: Xanh ngọc `#10B981` (Glow: `rgba(16, 185, 129, 0.25)`).
   * Màu Highlight Phụ đề: Vàng neon `#FBBF24` (Glow: `0 0 20px rgba(251, 191, 36, 0.6)`).
3. **Typography**:
   * Code: Font monospace (`JetBrains Mono`, `Fira Code`, `SFMono-Regular`), size 24px–26px, line-height 1.65.
   * Tiêu đề: Sans-serif đậm 900, size 40px–46px.
   * Phụ đề (Kinetic Captions): Sans-serif 800–900, size 34px–38px.
4. **Quy tắc Animation trong Remotion**:
   * **Bắt buộc**: Sử dụng `spring()` và `useCurrentFrame()`.
   * **Nghiêm cấm**: Tuyệt đối không dùng CSS `transition` (gây cảnh báo `@remotion/non-pure-animation` và làm video bị giật/nhấp nháy khi render).

---

## 6. Đặc tả Âm thanh & Smart Phonetic Engine

1. **Công nghệ TTS**:
   * Sử dụng Microsoft Edge-TTS qua script [scripts/generate_tts.py](file:///Users/thanhdo/Documents/Project/in-shorts/scripts/generate_tts.py).
   * Voice mặc định: `vi-VN-NamMinhNeural` (giọng nam miền Bắc dứt khoát, chuyên nghiệp).
   * Tốc độ: `+10%` (`rate="+10%"`) tạo nhịp điệu nhanh, cuốn hút cho Shorts.
2. **Dual-Layer Phonetic Mapping**:
   * **Lớp Audio**: Thay thế các từ tech tiếng Anh thành phiên âm dev Việt Nam (`TECH_PHONETICS`) để AI phát âm tự nhiên:
     * `React` $\to$ `Ri-ét`
     * `useMemo` $\to$ `diu-mê-mô`
     * `useCallback` $\to$ `diu-con-bách`
     * `inline` $\to$ `in-lai`
     * `component` $\to$ `com-pâu-nần`
     * `re-render` $\to$ `ri-ren-đơ`
     * `object` $\to$ `ọp-chếch`
     * `function` $\to$ `phăng-sừn`
   * **Lớp Subtitle & Visual**: Khôi phục 100% từ tiếng Anh gốc để trên video hiển thị code chuẩn xác.
3. **Outro Buffer**:
   * Script TTS tự động cộng thêm $1.5$ giây ($45$ frames) ở cuối audio để tránh kết thúc đột ngột và tạo khoảng đệm mượt mà.
