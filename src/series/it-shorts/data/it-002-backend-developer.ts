import { SubtitleData, VideoThumbnailProps } from "../../../core/types";
import subtitles from "../../../../public/audio/it-002-backend-developer.json";

export type ITShortEpisodeProps = {
  id: string;
  category: string;
  topicTitle: string;
  audioSrc: string;
  subtitles: SubtitleData;
  thumbnail: VideoThumbnailProps;
};

export const it002Episode: ITShortEpisodeProps = {
  id: "IT-002",
  category: "Backend Engineering",
  topicTitle: "BACKEND DEVELOPER LÀ GÌ? ĐIỀU GÌ XẢY RA KHI CLICK LOGIN",
  audioSrc: "audio/it-002-backend-developer.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  thumbnail: {
    badgeText: "BACKEND SYSTEM ARCHITECTURE",
    headlineMain: "BẠN CLICK NÚT LOGIN",
    headlineHighlight: "ĐIỀU GÌ XẢY RA PHÍA SAU? ⚡",
    highlightColor: "#38BDF8",
    subText: "Mổ xẻ toàn bộ cơ chế ngầm của Backend Developer",
    codeSnippet: {
      filename: "auth-pipeline.ts",
      language: "typescript",
      code: `// Cỗ máy Backend vận hành sau cú Click:
1. RateLimit  -> Chặn Brute-force Spam (429)
2. Database   -> Query User Record (SELECT)
3. Bcrypt     -> So khớp mật khẩu băm an toàn
4. JWT Sign   -> Ký Token & trả về 200 OK`,
    },
    channelName: "@laptrinhfullstack",
  },
};

