# Voice Cloning Directory for @laptrinhfullstack

Thư mục chứa các file âm thanh giọng mẫu (.wav) phục vụ tính năng **Instant Voice Cloning** của VieNeu-TTS.

## Hướng dẫn sử dụng:
1. Chuẩn bị 1 file âm thanh giọng nói (3 – 10 giây), định dạng `.wav`, không có nhạc nền hay tạp âm.
2. Lưu file vào thư mục này, ví dụ: `public/audio/voices/host_voice.wav`.
3. Khi sinh audio cho video Shorts, truyền cờ `--clone-ref`:
   ```bash
   npm run tts -- --text "Nội dung kịch bản..." --clone-ref public/audio/voices/host_voice.wav --output-audio public/audio/my-episode.mp3 --output-json public/audio/my-episode.json
   ```
4. Hệ thống sẽ tự động nhân bản giọng nói từ file mẫu với chất lượng 48kHz và tự động gắn phụ đề từng từ cho Remotion Shorts.

