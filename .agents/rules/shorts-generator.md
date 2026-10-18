> **MANDATORY DIRECTIVE (TƯ DUY ĐẠO DIỄN THỰC THỤ - DIRECTOR MINDSET)**:  
> Khi tạo video Shorts, Agent **BẮT BUỘC PHẢI TƯ DUY NHƯ MỘT ĐẠO DIỄN ĐIỆN ẢNH**:
> 1. **Phân cảnh Động theo Kịch bản (Script-Driven Storyboarding)**:
>    * Tuyệt đối **KHÔNG CỐ ĐỊNH** số lượng scene (không dập khuôn mọi video phải có 3, 5 hay 6 scene).
>    * Số lượng scene, visual và thời lượng phụ thuộc 100% vào các **nhịp ý niệm (Story Beats)** của kịch bản cụ thể. Mỗi khi kịch bản chuyển ý, đạo diễn **CẮT CẢNH (Cut Scene)** ngay lập tức.
> 2. **Mỗi Phân Cảnh Chỉ Thể Hiện DUY NHẤT 1 Ý Niệm (One Idea at One Time)**:
>    * Giọng đọc nói tới đâu, hình ảnh cận cảnh minh họa đúng trọng tâm điều đó.
>    * Nghiêm cấm "Slide PowerPoint mindset": Tuyệt đối KHÔNG BAO GIỜ nhét tiêu đề, code lỗi, code đúng, sơ đồ bộ nhớ, bộ đếm render và phụ đề vào cùng 1 frame từ đầu đến cuối khiến chữ bị li ti và nghẹt thở!
> 3. **Chuẩn kích thước font chữ trên màn hình di động (1080x1920)**:
>    * Tiêu đề Hook / Chuyển ý: $\ge 56px - 66px$ (Font-weight 900+).
>    * Khối Code trong MacWindow: $\ge 30px - 34px$ (Line-height 1.6, padding rộng). Tuyệt đối cấm code font 20-24px li ti!
>    * Sơ đồ / Node / Box giải thích: $\ge 28px - 36px$.
>    * Phụ đề Kinetic Captions: $\ge 38px - 44px$ ở đáy màn hình.
> 4. **Mật độ không gian (Stage Breathing Room)**: Giữa thanh Branding (đỉnh) và Captions (đáy), không gian sân khấu trung tâm chỉ dành trọn cho DUY NHẤT 1 visual element lớn của phân cảnh đó.
> 5. **Chuyển cảnh điện ảnh**: Mỗi scene được bọc trong `<Sequence>` theo frame timeline của audio, kết hợp âm thanh SFX (`whoosh.wav`, `ding.wav`, `pop.wav`) và camera punch nhẹ.

---

## WORKFLOW: 7 BƯỚC THỰC THI KHI NHẬN YÊU CẦU TẠO VIDEO MỚI

Khi người dùng gửi yêu cầu (Ví dụ: *"Tạo short Series A về: JavaScript == vs ==="* hoặc *"Tạo video short về: Docker container vs image"*):

### Bước 1: Tiếp nhận & Đối chiếu PRD
1. Xác định series tương ứng theo **Mục 2 của PRD** (Series A: Coding Tips, Series B: System Design, Series C: Developer Tools).
2. Kiểm tra schema dữ liệu tại [src/core/types.ts](file:///Users/thanhdo/Documents/Project/in-shorts/src/core/types.ts) để chuẩn bị các trường dữ liệu bắt buộc.

### Bước 2: Soạn Kịch bản Chuẩn Tỷ lệ Giữ chân Cao (Retention)
Agent phải tự động soạn kịch bản tiếng Việt tuân thủ nghiêm ngặt các quy tắc sau:
* **Độ dài**: Từ 80 – 110 từ tiếng Việt (tương đương 30 – 45 giây phát âm ở tốc độ `+10%`).
* **The Hook (0s - 3s)**: Câu đầu tiên bắt buộc phải đánh thẳng vào lỗi sai phổ biến hoặc câu hỏi gây tò mò:
  * *Mẫu*: *"Dừng lại nếu bạn vẫn đang..."* / *"90% lập trình viên hiểu sai về..."* / *"Đừng bao giờ dùng... nếu không muốn dính bug!"*
* **The Transition (Câu chuyển cảnh)**: Bắt buộc phải có một cụm từ dứt khoát làm mốc chuyển đổi giao diện:
  * *Mẫu*: *"Hãy khắc phục ngay bằng cách..."* / *"Cách viết chuẩn hơn là..."* / *"Giải pháp tối ưu là..."*
* **The CTA (Câu kết)**: Luôn kết thúc bằng:
  * *"Lưu lại mẹo này và follow Lập trình Fullstack để lên trình mỗi ngày nhé!"*
* **Code Snippets**: Đoạn code minh họa ngắn gọn, tối đa 8 - 12 dòng, đặt tên file rõ ràng (ví dụ: `BadCode.tsx`, `CleanCode.tsx`).

### Bước 3: Sinh Âm thanh & Phụ đề qua Smart Phonetic Engine
1. Kiểm tra kịch bản có chứa thuật ngữ công nghệ tiếng Anh mới chưa có trong từ điển `TECH_PHONETICS` của [scripts/generate_tts.py](file:///Users/thanhdo/Documents/Project/in-shorts/scripts/generate_tts.py) hay không. Nếu có, bổ sung ngay vào script.
2. Thực thi script sinh audio và phụ đề:
   ```bash
   python3 scripts/generate_tts.py \
     --text "<Nội dung kịch bản đã soạn>" \
     --output-audio "public/audio/<slug>.mp3" \
     --output-json "public/audio/<slug>.json"
   ```
3. Script tự động phiên âm cho giọng đọc (vd: `diu-con-bách`, `Ri-ét`) nhưng bảo lưu chữ tiếng Anh gốc trên phụ đề (`useCallback`, `React`).

### Bước 4: Tính toán Frame & Tạo File Cấu hình (Data Contract)
1. Đọc file `public/audio/<slug>.json` vừa tạo:
   * Phân tích các nhịp ý niệm (Story Beats) để cắt cảnh theo thời lượng audio.
   * Lấy tổng số frame từ `durationInFrames`.
2. Tạo file cấu hình tại `src/series/<series-id>/data/<slug>.ts` theo đúng interface trong PRD.
   * *Lưu ý*: File `.ts` chỉ chứa dữ liệu cần thiết cho Remotion render (`scenes`, `subtitles`, `thumbnail`). **Tuyệt đối KHÔNG nhét nội dung copywriting SEO vào file `.ts`** để giữ cấu hình code tinh gọn.

### Bước 5: Đăng ký Composition & Thumbnail Still vào Root.tsx
1. Cập nhật [src/Root.tsx](file:///Users/thanhdo/Documents/Project/in-shorts/src/Root.tsx):
   * Thêm `<Composition>` mới với id định danh video (`width: 1080`, `height: 1920`, `fps: 30`).
   * Thêm `<Still>` cho ảnh bìa:
     ```tsx
     <Still
       id="<CompositionId>-Thumbnail"
       component={VideoThumbnail}
       width={1080}
       height={1920}
       defaultProps={episodeData.thumbnail}
     />
     ```

### Bước 6: Đóng gói Thumbnail & Xuất File Markdown SEO Đa Nền Tảng
1. **Render Thumbnail Tự động**:
   ```bash
   npx remotion still <CompositionId>-Thumbnail out/<slug>-thumbnail.png
   ```
2. **Xuất file Markdown SEO Đa Nền Tảng**:
   Tạo file Markdown tại `src/series/<series-id>/data/<slug>.seo.md` (đồng thời xuất ra `out/<slug>-seo.md`) chứa đầy đủ nội dung tối ưu sẵn sàng copy-paste:
   * **YouTube Shorts**: Tiêu đề giật gân < 70 ký tự (#shorts), mô tả đánh trúng pain-point, hashtags mô tả và **Video Tags chuẩn định dạng `tag1, tag2, tag3`** để copy paste thẳng vào mục Tags của YouTube Studio.
   * **TikTok**: Caption súc tích < 150 ký tự, bộ hashtag xu hướng + ngách.
   * **Facebook Reels**: Câu hỏi tương tác mở đầu, 3 gạch đầu dòng tóm tắt bài học, hashtag công nghệ.
   * **Đường dẫn Thumbnail**: Chỉ rõ file ảnh bìa `out/<slug>-thumbnail.png`.

### Bước 7: Kiểm tra Chất lượng (Quality Gate) & Báo cáo
1. **Chạy Quality Check**:
   ```bash
   npm run lint
   ```
   *Bắt buộc phải Exit Code 0, không có lỗi TypeScript, không có cảnh báo `@remotion/non-pure-animation` (không dùng CSS transition).*
2. **Báo cáo Người dùng**:
   * Thông báo video đã sẵn sàng xem trước trên Remotion Studio:
     `http://localhost:3000/<CompositionId>`
   * Bàn giao link file Thumbnail: `out/<slug>-thumbnail.png`.
   * Bàn giao file SEO: `out/<slug>-seo.md`.
   * **Quy tắc render video**: Chỉ chạy lệnh xuất file MP4 (`npx remotion render <CompositionId> out/<slug>.mp4`) khi người dùng ra lệnh yêu cầu render hoặc xuất video.
