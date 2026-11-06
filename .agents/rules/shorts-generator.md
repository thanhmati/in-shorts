---
trigger: always_on
---

# ADDENDUM: PRODUCTION-GRADE REMOTION AGENT

## 1. PROJECT DISCOVERY — NEVER ASSUME

- Before editing, inspect the project instructions, PRD, package.json, current types, existing episodes, reusable components, and Remotion version.
- Verify all paths, scripts, component props, and schema requirements against the actual repository.
- Use project-relative paths instead of machine-specific absolute paths.
- Check the Git working tree and preserve unrelated user changes.
- Never overwrite an existing episode or asset without checking its ownership and intended update behavior.
- Reuse existing components and conventions whenever appropriate.

## 2. DIRECTOR DECISION ENGINE

- Plan visuals from the meaning and pacing of the narration, not from a fixed scene count.
- Each shot must have one clear visual focal point.
- A story beat does not automatically require a new Sequence.
- Choose between a cut, camera movement, highlight, reveal, or state transition based on the intended storytelling effect.
- Allow multiple visual elements when comparison or relationships are essential to understanding the concept.
- Do not add transitions, camera punches, or sound effects without a clear purpose.
- Every shot must communicate one primary idea and support the current narration.
- If a visual cannot be understood quickly on a mobile screen, simplify it.

## 2.1. VISUAL-FIRST & MOTION-DRIVEN PHILOSOPHY (NO TEXT OVERLOAD)

- **Tập trung Motion Graphics & Animation**: Màn hình phải sống động với chuyển động (sơ đồ node, luồng packet di chuyển, hiệu ứng ánh sáng, code spotlight, visual metaphors, state transitions).
- **Tuyệt đối KHÔNG nhồi nhét text**: Nghiêm cấm biến video thành slide thuyết trình hoặc hiển thị các câu văn giải thích dài dòng, các bullet points nhiều chữ.
- **Voiceover giải thích, Visual biểu diễn**: Giọng đọc (Voiceover / TTS) đảm nhận việc giải thích logic, cơ chế và chi tiết kỹ thuật. Visual chỉ hiển thị:
  - Tên thành phần hoặc từ khóa cốt lõi (1 - 3 từ: `MIDDLEWARE`, `GUARD`, `INTERCEPTOR`).
  - Badge trạng thái / method ngắn gọn (`canActivate()`, `RxJS tap()`, `200 OK`).
  - Animation trực quan hóa chính xác điều voiceover đang nói (gói tin bay, khiên bảo vệ quét laser, mũi tên vòng quay lại).
- **Quy tắc nhãn ngắn (Max 3-5 Words Rule)**: Mọi label/badge trên visual không vượt quá 3 - 5 từ. Những gì có thể nói bằng lời thì KHÔNG viết lên màn hình!

## 3. SCRIPT AND TECHNICAL ACCURACY

- Prioritize correctness, clarity, and audience comprehension over word count.
- Use hooks that create genuine curiosity without fabricated statistics or unsupported claims.
- Validate code examples and technical statements before generating final narration.
- Verify version-sensitive behavior against reliable documentation or executable tests when feasible.
- Clearly distinguish general rules from assumptions and exceptions.
- Do not generate audio from a script that has unresolved technical inaccuracies.

## 4. AUDIO AND TIMELINE CONTRACT

- Inspect the actual TTS output schema before consuming its fields.
- Treat total audio duration and per-segment timestamps as separate requirements.
- Use available sentence or word timestamps to align visual events and captions.
- If precise timestamps are unavailable, use an explicit segmentation strategy and validate synchronization.
- Ensure all scene, subtitle, animation, and audio frame ranges are valid.
- Detect unintended overlaps, gaps, negative frame positions, and content extending beyond the composition duration.
- Verify audio and subtitle assets exist before registration and rendering.

## 5. MOBILE VISUAL QUALITY

- Treat font sizes as minimum design targets, not proof of readability.
- Validate text width, line count, safe areas, contrast, wrapping, and clipping.
- Do not solve overflow by silently shrinking typography below the defined minimum.
- Simplify code or split content into additional shots when necessary.
- Keep captions visually separate from code and other critical content.
- Use platform-aware safe areas and avoid placing important information under interface overlays.
- Apply animation consistently and avoid unnecessary motion.

## 6. REUSABLE REMOTION ARCHITECTURE

- Separate episode content, timeline data, visual components, and social metadata.
- Reuse existing visual primitives before introducing new components.
- Give each scene a stable identifier and validated timing data.
- Validate composition IDs, component props, asset paths, and episode schema before registration.
- Avoid duplicate registrations and unintended changes to existing episodes.
- Use deterministic frame-based animation and respect the installed Remotion version.

## 7. QUALITY GATES

Before reporting an episode as ready:

1. Validate episode data against the actual schema.
2. Run the project's TypeScript and lint checks using verified commands.
3. Validate timeline ranges, audio duration, subtitle timing, and asset existence.
4. Render the thumbnail and representative frames or a short preview when feasible.
5. Inspect visual output for clipping, layout defects, unreadable code, and timing mismatches.
6. Run relevant regression checks for existing compositions.
7. Fix detected defects and rerun the affected checks.

A successful lint command alone is not proof of rendering or visual correctness.

Do not claim that an unexecuted check passed. If a check cannot run, report it as unverified.

## 8. FAILURE RECOVERY AND IDEMPOTENCY

- Make each production step's inputs, outputs, and success conditions explicit.
- Record failures with actionable diagnostic information.
- Retry recoverable failures a limited number of times.
- Resume from valid completed artifacts when safe.
- Prevent duplicate registrations, duplicate output generation, and accidental overwrites.
- Stop when a required gate fails and cannot be recovered safely.
- Preserve unrelated changes and report unresolved issues instead of hiding them.

## 9. HANDOFF CONTRACT

Report only artifacts that actually exist and have been verified.

Distinguish clearly between:

- Generated
- Validated
- Preview-rendered
- Final-rendered

Do not imply that a video has been rendered merely because its composition is registered.

Provide the verified paths for the thumbnail and SEO file, the preview instructions, the checks performed, and any remaining limitations.

Only render the final MP4 when explicitly requested, unless the user has authorized a different workflow.

## 10. MOTION GRAPHICS & VISUAL PRIMITIVES USAGE GUIDELINES

AI agents MUST reuse the standardized motion graphics library in `src/core/motion/` instead of implementing bespoke, one-off animations.

### Component Selection Decision Matrix

| Storytelling Need | Required Motion Primitive | Best Practice |
|---|---|---|
| **Hook / Title / Technical Terms** | `KineticTypography` | Use `type="phrase"` or `"words"` for dynamic pacing; use `accentKeywords` to highlight keywords. |
| **Progressive Code Walkthrough** | `CodeReveal` | Set `linesPerSecond` matching voice narration; keeps code panel height stable. |
| **Spotlighting Critical Logic** | `CodeFocus` | Dim nonessential lines with `dimOpacity: 0.25`; place badge/pill indicator on focal line. |
| **Old vs New / Bad vs Good** | `BeforeAfter` | Use `mode="step-transform"` for mobile screen clarity rather than two side-by-side full panels. |
| **Architecture / Microservices** | `NodeGraph` | Define typed `nodes` and `edges`; use `flowAnimation` to show active connection paths. |
| **Request / Event Flow** | `PacketFlow` | Animate packet along sequential stages; display status label chips per stage. |
| **CLI / DevOps / Build Logs** | `TerminalSequence` | Simulate character-by-character typing with prompt; status-code colored output lines. |
| **Benchmarks / Performance Gain** | `ProgressMetric` | Use `type="benchmark-bars"` to compare $O(N)$ vs $O(1)$ with `deltaBadge` ($40\times$ faster). |
| **State Machine / Lifecycle** | `StateTransition` | Render step pipeline chain + hero card; specify causality triggers (`EVENT: ...`). |
| **Cinematic Focus Shift** | `CameraMove` | **Wrap only the focal element** (e.g. `MacWindow`), NEVER wrap the root canvas or captions. |
| **Synchronized Audio Feedback** | `SoundCue` | Map to `whoosh`, `pop`, `ding`. Keep `volume <= 0.32` so voiceover remains intelligible. |
| **Multi-Scene Orchestration** | `SceneTransition` (`SceneSequence`) | Calculate total duration using $\sum D_i - \sum T_i$; auto-sync sound cues at transition points. |

### Motion Execution Invariants

1. **Pure Remotion Animations**: Always use `spring()` or `interpolate()`. Never use CSS `transition`.
2. **Safe Framing**: Keep camera zoom clamped between $1.00$ and $1.15$ for focus beats. Never crop captions or header badges.
3. **Typography Minimums**: Mobile safe target $\ge 56\text{px}$ for headlines, $\ge 24\text{px} - 26\text{px}$ for code, $\ge 34\text{px}$ for captions.
4. **Reference Validation**: When authoring `NodeGraph`, `PacketFlow`, or `StateTransition`, verify that all referenced target IDs exist in the defined list.

## 11. THUMBNAIL DESIGN SYSTEM & HIGH-CTR SPECIFICATION

Thumbnail quyết định 80% tỷ lệ click (CTR) trên mobile feed (YouTube Shorts, TikTok, Facebook Reels). Màn hình feed điện thoại hiển thị thumbnail rất nhỏ (~120px - 180px chiều rộng), do đó mọi thiết kế nhồi nhét chữ, nhiều hộp thông tin hoặc viền rối mắt đều gây giảm CTR nghiêm trọng.

### 11.1. Triết lý thiết kế cốt lõi (1-Glance / 1-Idea Rule)
- **1 Ý niệm - 1 Hình ảnh trọng tâm - Hiểu trong 1 giây**: Người xem lướt qua feed trong 0.5s - 1s, thumbnail phải ngay lập tức kích thích tò mò về mặt thị giác mà không bắt người xem phải đọc văn bản.
- **Không gian thở (Generous Negative Space)**: Tối thiểu 40% diện tích là nền âm bản sạch sẽ với ánh sáng ambient glow dịu nhẹ, tạo chiều sâu chuẩn Cyberpunk / Modern SaaS.

### 11.2. Quy tắc Typography & Giới hạn Text (Max 3-6 Words Total)
- **TỔNG LƯỢNG CHỮ TRÊN TOÀN BỘ THUMBNAIL KHÔNG QUÁ 3 - 6 TỪ**:
  - **1 Hero Hook Title duy nhất**: Chiếm vị trí đắc địa (nửa trên).
    - Font size cực đại: `84px - 104px`, font weight: `900 - 950` (Black/Extrabold).
    - Line height chặt chẽ: `1.15 - 1.20`.
    - Phối màu tương phản cao: Màu trắng tinh `#FFFFFF` kết hợp 1 - 2 từ khóa then chốt mang màu Neon Accent (Cyan `#38BDF8`, Emerald `#10B981`, Amber `#FBBF24`).
  - **Tối đa 1 Tag Pill nhỏ (Tùy chọn)**: 1 - 2 từ (ví dụ: `#WEB`, `#NESTJS`, `#BACKEND`), font size `20px - 22px`.
  - **Tuyệt đối KHÔNG có subtitle giải thích, KHÔNG có subText box, KHÔNG có bullet points**.

### 11.3. Hero Visual Graphic (Hình ảnh đại diện thay vì Code rác)
- Chiếm 45% - 55% diện tích trung tâm thumbnail.
- Ưu tiên hiển thị một **Hero Visual Graphic** trực quan, sắc nét:
  - **Architecture / Node Graphic**: Sơ đồ 2-3 khối tương tác tối giản (ví dụ: `CLIENT ⟷ SERVER`, hoặc `Request ➔ 200 OK`).
  - **Visual Metaphor**: Biểu tượng phát sáng trung tâm (Glowing World Hub, Security Shield, Database Pipeline).
  - **Nếu hiển thị Code Snippet**:
    - **Tối đa 2 - 3 dòng code ngắn gọn nhất**: Font size $\ge 32\text{px}$, chỉ giữ lại dòng code "ăn tiền" nhất.
    - **CẤM viết comment giải thích lê thê** (`// Cỗ máy backend vận hành...`, `1. RateLimit -> ...`). Code phải tự nói lên ý đồ.

### 11.4. Chính sách loại bỏ toàn bộ thành phần rác (Zero Clutter Policy)
- ❌ **CẤM viền Neon bao quanh màn hình** (như viền đỏ `inset: 24px` - tạo cảm giác chật chội, nghiệp dư).
- ❌ **CẤM badge nền tảng thừa thãi** (`SHORTS • REELS • TIKTOK` - người xem đã ở trên nền tảng đó, không cần nhắc lại).
- ❌ **CẤM nút bấm giả CTA** (`BẤM XEM ĐỂ FIX NGAY! 🚀` - người dùng mobile chạm toàn màn hình, không ai click vào nút vẽ trên ảnh).
- ❌ **CẤM các hộp sub-hook / warning box phụ** chen chúc dưới tiêu đề.
- ✅ **Branding tối giản**: Chỉ đặt 1 pill watermark `@laptrinhfullstack` nhỏ gọn, tinh tế ở mép trên.

### 11.5. Bảng màu & Tương phản chuẩn (Strict 2-Color Rule)
- **Background**: Nền tối sâu `THEME.colors.bgDarker` (`#0B0F19`) với các đốm sáng radial ambient mờ phía sau vật thể chính.
- **Chủ đạo**: Màu trắng `#FFFFFF` cho chữ chính.
- **1 Màu Accent duy nhất**: Nhất quán theo chủ đề:
  - Web & Protocol / Networking: Cyan `#38BDF8`
  - Performance / System / Database: Emerald `#10B981`
  - Warning / Bug Fix / Interview Trick: Amber `#FBBF24`
  - Architecture / Framework: Purple `#A855F7`
