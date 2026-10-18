# Agent Workflow: Quy trình Tạo Video YouTube Shorts (@laptrinhfullstack)

> **MANDATORY DIRECTIVE**: Khi nhận bất kỳ yêu cầu nào liên quan đến việc tạo, sửa đổi hoặc cấu hình video Shorts, Agent **BẮT BUỘC PHẢI THAM CHIẾU** [PRD.md](file:///Users/thanhdo/Documents/Project/in-shorts/PRD.md) làm tài liệu căn cứ duy nhất (Single Source of Truth). Tuyệt đối không tự suy diễn cấu trúc thư mục, bảng màu, schema dữ liệu hay các quy chuẩn đã được định nghĩa trong PRD.

---

## WORKFLOW: 6 BƯỚC THỰC THI KHI NHẬN YÊU CẦU TẠO VIDEO MỚI

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

### Bước 4: Tính toán Frame & Tạo File Dữ liệu (Data Contract)
1. Đọc file `public/audio/<slug>.json` vừa tạo:
   * Tìm từ chuyển cảnh (ví dụ từ: *"Hãy"*, *"Cách"*, *"Giải"*) để lấy chính xác giá trị `startFrame` của từ đó.
   * Gán giá trị này vào trường `hookDurationFrames` của scene (để đảm bảo giao diện chuyển từ Bad Code sang Good Code chính xác từng frame khớp với giọng đọc).
   * Lấy tổng số frame từ `durationInFrames`.
2. Tạo file cấu hình tại `src/series/<series-id>/data/<slug>.ts` theo đúng interface trong PRD.

### Bước 5: Đăng ký Composition vào Root.tsx
1. Cập nhật [src/Root.tsx](file:///Users/thanhdo/Documents/Project/in-shorts/src/Root.tsx):
   * Thêm `<Composition>` mới với id định danh.
   * Cấu hình độ phân giải `width: 1080`, `height: 1920`, `fps: 30`.
   * Gán `durationInFrames` bằng đúng thời lượng từ file subtitle JSON.
   * Gán `defaultProps` từ file data vừa tạo ở Bước 4.

### Bước 6: Kiểm tra Chất lượng (Quality Gate) & Báo cáo
1. **Chạy Quality Check**:
   ```bash
   npm run lint
   ```
   *Bắt buộc phải Exit Code 0, không có lỗi TypeScript, không có cảnh báo `@remotion/non-pure-animation` (không dùng CSS transition).*
2. **Báo cáo Người dùng**:
   * Thông báo video đã sẵn sàng xem trước trên Remotion Studio:
     `http://localhost:3000/<CompositionId>`
   * Tóm tắt ngắn gọn: Thời lượng, câu Hook, dòng code so sánh.
   * **Quy tắc render**: Chỉ chạy lệnh xuất file MP4 (`npx remotion render <CompositionId> out/<slug>.mp4`) khi người dùng ra lệnh yêu cầu render hoặc xuất video.
