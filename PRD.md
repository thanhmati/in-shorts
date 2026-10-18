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

## 2. Tư duy Đạo diễn Điện ảnh (The Director Mindset)

> **QUY TẮC CỐT LÕI**: **Script-Driven Dynamic Storyboarding (Phân cảnh Động theo Kịch bản)**.  
> Tuyệt đối **KHÔNG CỐ ĐỊNH** số lượng phân cảnh (không dập khuôn mọi video phải có 3, 5 hay 6 scene).  
> **Số lượng scene, nội dung từng scene và thời lượng hoàn toàn do Kịch bản (Script) quyết định**.

### Nguyên tắc Đạo diễn:
1. **Phân tích nhịp kịch bản (Script Beat Analysis)**:
   * Khi người nói chuyển sang một ý niệm mới (Hook, Vấn đề, Minh họa lỗi sai, Mổ xẻ nguyên nhân sâu xa, So sánh, Giải pháp, Benchmark, Bài học rút ra, Call-to-action...), đạo diễn **CẮT CẢNH (Cut / Change Scene)** ngay lập tức.
   * Số lượng scene linh hoạt theo kịch bản: Có video chỉ cần 3 scenes (ngắn, súc tích), có video cần 4, 5 hoặc 6+ scenes (phức tạp, nhiều bước mổ xẻ).
2. **One Beat = One Visual Focus (Không nhồi nhét)**:
   * Mỗi scene chỉ thể hiện **DUY NHẤT một đối tượng thị giác trọng tâm** bổ trợ cho câu nói đó.
   * Nếu đang nói về Code lỗi $\to$ Chỉ hiển thị Cận cảnh Cửa sổ Code lỗi cực to và rõ.
   * Nếu đang nói về Bộ nhớ / Cơ chế ngầm $\to$ Cắt cảnh sang Sơ đồ Bộ nhớ / Đồ họa trực quan hóa, KHÔNG nhét chung với cửa sổ code!
   * Nếu đang nói về Giải pháp $\to$ Cận cảnh Code giải pháp hoặc so sánh Trước/Sau.
   * Tuyệt đối KHÔNG BAO GIỜ nhét toàn bộ thông tin vào 1 frame như slide thuyết trình PowerPoint!
3. **Cỡ chữ & Không gian sân khấu (Stage Typography)**:
   * Mọi text hiển thị trên mobile (1080x1920) phải có kích thước đủ lớn để đọc lướt trong 0.5s:
     * Tiêu đề / Headline: $\ge 56px - 66px$.
     * Code trong MacWindow: $\ge 30px - 34px$, line-height thoáng (1.6).
     * Node / Sơ đồ / Chú thích: $\ge 28px - 36px$.
     * Phụ đề Kinetic Captions: $\ge 38px - 44px$.
4. **Chuyển cảnh điện ảnh (Cinematic Pacing)**:
   * Chuyển cảnh dứt khoát khớp chính xác theo frame giọng nói trong subtitle JSON, kết hợp âm thanh SFX (whoosh, pop, ding) và camera punch nhẹ để giữ nhịp xem liên tục.

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
│   │   ├── Branding.tsx                # Badge nhận diện @laptrinhfullstack + Tag Series + AudioEqualizer
│   │   ├── MacWindow.tsx               # Cửa sổ giả lập MacOS (3 nút traffic lights)
│   │   ├── CodeBlock.tsx               # Prism Syntax Highlighter + Animated Breathing Line Pulse
│   │   ├── KineticCaptions.tsx         # Phụ đề nhảy từng từ với spring bounce & neon glow
│   │   ├── motion/                     # THƯ VIỆN ĐỒ HỌA CHUYỂN ĐỘNG CHUẨN HÓA (MOTION PRIMITIVES)
│   │   │   ├── KineticTypography.tsx   # Text động (Hook, Keywords, Phân cảnh)
│   │   │   ├── CodeReveal.tsx          # Xuất hiện code theo từng dòng mượt mà
│   │   │   ├── CodeFocus.tsx           # Spotlight dòng code trọng tâm, làm mờ xung quanh
│   │   │   ├── BeforeAfter.tsx         # So sánh code/kiến trúc Trước - Sau
│   │   │   ├── NodeGraph.tsx           # Sơ đồ topology mạng/hệ thống động
│   │   │   ├── PacketFlow.tsx          # Mô phỏng gói tin HTTP/Message queue di chuyển
│   │   │   ├── TerminalSequence.tsx    # Giả lập gõ lệnh CLI và xuất log
│   │   │   ├── ProgressMetric.tsx      # Bộ đếm hiệu năng, thanh đo benchmark O(N) vs O(1)
│   │   │   ├── StateTransition.tsx     # Chuỗi chuyển đổi trạng thái (State machine)
│   │   │   ├── CameraMove.tsx          # Cận cảnh camera (Punch-in, drift, focus shift)
│   │   │   ├── SoundCue.tsx            # Âm thanh hiệu ứng đồng bộ frame (Whoosh, pop, ding)
│   │   │   ├── SceneTransition.tsx     # Bộ phối hợp đa phân cảnh (Wipe, fade, slide, cut)
│   │   │   └── index.ts                # Entrypoint xuất khẩu motion components
│   │   └── graphics/                   # Bộ Animation & Motion Graphics cao cấp
│   │       ├── AmbientBackground.tsx   # Living canvas: 3 Glow Orbs trôi nổi, Dot Grid, Light Sweep
│   │       ├── FloatingBadge.tsx       # Huy hiệu nổi 3D dao động góc nhìn (Perspective tilt)
│   │       ├── AudioEqualizer.tsx      # Sóng âm thanh nhảy nhịp nhàng theo giọng nói
│   │       └── SuccessConfetti.tsx     # Pháo hoa tia lửa (@remotion/shapes) bùng nổ khi sang Clean Code
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

1. **RÀNG BUỘC TEXT COLOR TRONG DARK THEME (CRITICAL CONTRAST RULE)**:
   * **Nghiêm cấm tuyệt đối**: Không bao giờ để bất kỳ token code, object key, chữ thường hoặc phụ đề hiển thị màu đen (`#000000`) hay màu xám tối trên nền dark `#111827`.
   * **Bắt buộc**: Sử dụng `darkHighContrastTheme` (`src/core/syntaxTheme.ts`) cho CodeBlock:
     * Plain text & Object keys (`theme:`, `role:`): `#F8FAFC` (Slate 50) hoặc `#38BDF8` (Sky Cyan).
     * Strings (`"dark"`, `"admin"`): `#FDE047` (Yellow 300).
     * Keywords (`function`, `const`, `return`): `#C084FC` (Purple 400).
     * Hooks (`useMemo`, `useCallback`): `#38BDF8` / `#34D399` (Cyan / Emerald).
     * Comments: `#94A3B8` (Slate 400 italic, độ tương phản luôn $\ge 4.5:1$).

2. **Kích thước & Safe Zone**:
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

---

## 7. Quy chuẩn Đóng gói Đa nền tảng (Thumbnail & Multi-Platform SEO)

Mọi video được sinh ra bắt buộc phải đi kèm **Bộ Thumbnail đồ họa cao cấp** và **Nội dung SEO chuẩn tối ưu thuật toán** cho cả 3 nền tảng: YouTube Shorts, TikTok và Facebook Reels.

### 7.1. Video Thumbnail 9:16 (High CTR Cover)
* **Component Remotion**: [src/core/VideoThumbnail.tsx](file:///Users/thanhdo/Documents/Project/in-shorts/src/core/VideoThumbnail.tsx)
* **Đăng ký Remotion `<Still>`**: Tự động cấu hình trong [src/Root.tsx](file:///Users/thanhdo/Documents/Project/in-shorts/src/Root.tsx) với id: `<CompositionId>-Thumbnail`.
* **Kích thước**: $1080 \times 1920$ px (tỷ lệ 9:16 chuẩn Shorts / Reels / TikTok).
* **Quy chuẩn thị giác (Visual High CTR)**:
  * Khung viền Neon phát sáng quanh viền ngoài để làm nổi bật video trên Feed tối/sáng của người dùng.
  * Tiêu đề Hook khổng lồ (size 72px – 76px) kết hợp màu tương phản cực mạnh (Vàng neon `#FBBF24` hoặc Đỏ `#F43F5E` trên nền Trắng `#FFFFFF`).
  * Badge cảnh báo mức độ nghiêm trọng hoặc danh mục Series.
  * Cửa sổ MacWindow chứa code lỗi hoặc sơ đồ ấn tượng.
  * Nút Call-To-Action bắt mắt: *"BẤM XEM ĐỂ FIX NGAY! 🚀"*.
* **Lệnh render tự động**:
  ```bash
  npx remotion still <CompositionId>-Thumbnail out/<slug>-thumbnail.png
  ```

### 7.2. Tiêu chuẩn SEO Nội dung (Multi-Platform Copywriting)
* **YouTube Shorts**:
  * Tiêu đề: Dưới 70 ký tự, chứa từ khóa chính + hook tò mò, kết thúc bằng `#shorts`.
  * Mô tả: Tóm tắt 2-3 câu đánh trúng pain-point, giải thích giải pháp, lời kêu gọi đăng ký kênh `@laptrinhfullstack`.
  * Hashtags trong mô tả: 5–8 thẻ liên quan (vd: `#Shorts #ReactJS #LapTrinh #Frontend #JavaScript #WebDevelopment #LapTrinhFullstack`).
  * Video Tags (YouTube Studio): Dải từ khóa tìm kiếm phân cách bằng dấu phẩy theo đúng định dạng `tag1, tag2, tag3` (vd: `react re-render, tối ưu react, usememo, usecallback, laptrinhfullstack`) để dán trực tiếp vào trường Tags của YouTube Studio.
* **TikTok**:
  * Caption: Dưới 150 ký tự, ngắn gọn, giàu năng lượng.
  * Hashtags: Kết hợp hashtag ngách và hashtag xu hướng (vd: `#laptrinh #laptrinhvien #reactjs #coding #developer #learnontiktok #laptrinhfullstack`).
* **Facebook Reels**:
  * Caption: Bắt đầu bằng câu hỏi gợi mở thảo luận, tóm tắt 3 gạch đầu dòng ngắn gọn bài học rút ra, hashtag công nghệ.
* **File lưu trữ & bàn giao**: Toàn bộ nội dung SEO copywriting được quản lý độc lập dưới dạng file Markdown tại `src/series/<series-id>/data/<slug>.seo.md` và `out/<slug>-seo.md` (tuyệt đối không nhét vào file code `.ts` để tránh làm rối cấu hình Remotion), sẵn sàng cho người dùng copy-paste xuất bản ngay lập tức.

---

## 8. Thư viện Đồ họa Chuyển động Chuẩn hóa (Motion Graphics Design System)

Thư viện component tại `src/core/motion/` là bộ công cụ trực quan hóa cốt lõi, cung cấp 12 primitives chuyển động chuẩn hóa, có type-safe, tuân thủ nguyên tắc thuần Remotion và phục vụ toàn bộ 3 series nội dung.

### 8.1. Danh mục Motion Primitives & Ứng dụng

| Component | Vị trí file | Công dụng chính | Thuộc tính quan trọng (`props`) |
|---|---|---|---|
| **`KineticTypography`** | `src/core/motion/KineticTypography.tsx` | Text động cho Hook mở đầu, từ khóa kỹ thuật, chốt luận điểm | `text`, `type: "phrase" \| "words" \| "mask"`, `highlightWords`, `accentColor`, `fontSize` |
| **`CodeReveal`** | `src/core/motion/CodeReveal.tsx` | Xuất hiện code theo nhịp đọc, giữ layout code ổn định | `code`, `language`, `startFrame`, `linesPerSecond`, `title`, `highlightRange` |
| **`CodeFocus`** | `src/core/motion/CodeFocus.tsx` | Dẫn dắt sự chú ý vào đúng 1 dòng logic cốt lõi, làm mờ code râu ria | `code`, `targetLine`, `startFrame`, `focusFrame`, `dimOpacity: 0.25`, `markerType: "badge" \| "pill"` |
| **`BeforeAfter`** | `src/core/motion/BeforeAfter.tsx` | So sánh đối chiếu trực quan Code Sai vs Đúng, Cũ vs Mới | `mode: "step-transform" \| "split" \| "wipe"`, `before`, `after`, `transitionFrame`, `transitionDuration` |
| **`NodeGraph`** | `src/core/motion/NodeGraph.tsx` | Sơ đồ topology vi dịch vụ, database, gateway, client | `nodes: GraphNode[]`, `edges: GraphEdge[]`, `activeNodeId`, `startFrame`, `flowAnimation: boolean` |
| **`PacketFlow`** | `src/core/motion/PacketFlow.tsx` | Mô phỏng đường đi của Request/Response, Kafka Event, CI/CD pipeline | `stages: PacketStage[]`, `activeStageIndex`, `startFrame`, `durationPerStage`, `statusLabel` |
| **`TerminalSequence`** | `src/core/motion/TerminalSequence.tsx` | Giả lập Terminal macOS/Linux gõ lệnh CLI và xuất log | `command`, `prompt`, `typingDuration`, `executionDelay`, `outputs: TerminalLine[]`, `status` |
| **`ProgressMetric`** | `src/core/motion/ProgressMetric.tsx` | Bộ đếm số tăng dần, thanh so sánh Benchmark $O(N)$ vs $O(1)$ | `type: "counter" \| "progress-bar" \| "benchmark-bars"`, `value`, `unit`, `benchmarkItems` |
| **`StateTransition`** | `src/core/motion/StateTransition.tsx` | Biểu diễn vòng đời trạng thái (Auth, Request, Component) | `states: LifecycleState[]`, `transitions: StateChangeTransition[]`, `initialStateId`, `mode` |
| **`CameraMove`** | `src/core/motion/CameraMove.tsx` | Zoom cận cảnh vào chi tiết quan trọng mà không cắt mất phụ đề | `moves: CameraMoveSegment[]`, `initial`, `presets: subtleDrift, emphasisZoom, pullBack` |
| **`SoundCue`** | `src/core/motion/SoundCue.tsx` | Phát âm thanh hiệu ứng đúng frame visual xuất hiện | `type: "whoosh" \| "pop" \| "ding"`, `atFrame`, `volume: 0.28` (an toàn cho giọng đọc) |
| **`SceneTransition`** | `src/core/motion/SceneTransition.tsx` | Phối hợp chuỗi phân cảnh (`TransitionSeries`) và tự đồng bộ SFX | `scenes: SceneItem[]`, `transitionToNext: { type: "wipe" \| "fade" \| "slide" \| "iris" \| "cut" }` |

### 8.2. Bản đồ Phối hợp Primitives theo Từng Series

1. **Series A — Coding Tips (Mẹo & Tối ưu Code)**:
   * **Hook**: `KineticTypography` (dạng `mask` hoặc `words` nhấn mạnh nỗi đau bug).
   * **Phân cảnh Code Lỗi**: `CodeReveal` xuất hiện từng dòng $\to$ `CodeFocus` spotlight dòng sai $\to$ `CameraMove` emphasis zoom $1.10$.
   * **Chuyển cảnh Giải pháp**: `SceneTransition` (`wipe` hoặc `slide` + `SoundCue: "whoosh"`).
   * **Phân cảnh Code Chuẩn**: `BeforeAfter` so sánh trực diện $\to$ `ProgressMetric` đo tốc độ nhảy vọt ($40x$ nhanh hơn) $\to$ `SoundCue: "ding"`.

2. **Series B — System Design (Kiến trúc Hệ thống)**:
   * **Hook**: `KineticTypography` tạo tò mò về traffic nghìn user.
   * **Topology**: `NodeGraph` dựng các cụm service, database, cache, balancer.
   * **Dòng chảy dữ liệu**: `PacketFlow` bắn gói tin di chuyển giữa các node theo kịch bản.
   * **Trạng thái hệ thống**: `StateTransition` mô tả vòng đời (Pending $\to$ Processing $\to$ Cached).
   * **Góc quay**: `CameraMove` pan nhẹ theo hướng packet chuyển động.

3. **Series C — Developer Tools (Công cụ & Workflow)**:
   * **Giao diện dòng lệnh**: `TerminalSequence` gõ lệnh git, docker, bun, pnpm, xuất log màu.
   * **So sánh công cụ**: `BeforeAfter` (cách làm thủ công vs dùng tool tự động).
   * **Benchmark tốc độ build**: `ProgressMetric` thanh đo so sánh thời gian bundle.

### 8.3. Quy tắc Tính toán Timeline Overlap khi Chuyển Cảnh

Khi sử dụng `SceneSequence` (`src/core/motion/SceneTransition.tsx`), hai phân cảnh chuyển tiếp bằng hiệu ứng động (`fade`, `wipe`, `slide`, `iris`) có thời lượng chuyển cảnh $T$ sẽ **gối đầu (overlap)** lên nhau:

$$\text{Tổng thời lượng (Total Frames)} = \sum_{i=0}^{N-1} D_i - \sum_{i=0}^{N-2} T_i$$

* **Ràng buộc an toàn**: $T_i < \min(D_i, D_{i+1})$. Tuyệt đối không để thời gian chuyển cảnh dài hơn thời lượng của chính phân cảnh đó.
* **Đồng bộ Âm thanh**: Hàm `calculateSceneTimingBoundaries(scenes)` tự động kích hoạt `SoundCue` tại đúng frame bắt đầu chuyển cảnh: $t_{\text{start}} = \text{endFrame} - T$.

### 8.4. Tiêu chuẩn Âm thanh Hiệu ứng (Sound Cue Standards)

* **Kho âm thanh gốc**: Lưu trữ tại `public/sfx/`:
  * `whoosh.wav`: Dùng cho chuyển cảnh lướt (`wipe`, `slide`) hoặc camera push-in nhanh.
  * `pop.wav`: Dùng cho xuất hiện badge, card, node mới hoặc cắt cảnh nhanh (`cut`).
  * `ding.wav`: Dùng cho trạng thái thành công, bài học cốt lõi, code fix xong (`fade`).
* **Giới hạn âm lượng an toàn**: Luôn đặt `volume` trong khoảng `0.25 – 0.32` (mặc định `0.28`). Nghiêm cấm đặt `volume > 0.40` để tránh át tiếng thuyết minh giọng đọc của kịch bản.
